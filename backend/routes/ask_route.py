from fastapi import APIRouter, Query
from routes.upload_route import get_agent
import time

router = APIRouter()


@router.get("/ask")
async def ask_question(query: str = Query(...)):
    """Ask a question — the agent decides which tools to use."""
    agent = get_agent()
    if agent is None:
        return {"error": "Please upload a document first."}

    print(f"\n[QUESTION] '{query}'")

    start = time.time()
    try:
        result = agent.invoke({"input": query})
        answer = result.get("output", "")
        if not answer or answer == "Agent stopped due to iteration limit or time limit.":
            from core.retriever import search_faiss
            from langchain_ollama import OllamaLLM
            from utils.config import LLM_MODEL
            
            # Fetch document context chunks
            doc_chunks = search_faiss("summary overview main details content")
            context = "\n".join([d.page_content for d in doc_chunks]) if doc_chunks else ""
            
            fallback_llm = OllamaLLM(model=LLM_MODEL)
            if context:
                prompt = f"The user asked: '{query}'. Based on the following document context, provide a clear and direct answer:\n\nDOCUMENT CONTEXT:\n{context[:2000]}"
            else:
                prompt = f"The user asked: '{query}'. Answer their question clearly using general knowledge, while briefly noting that no uploaded document context was found."
            answer = fallback_llm.invoke(prompt)
    except Exception as e:
        answer = f"I couldn't find a direct match in the document for your question. ({str(e)})"
    
    elapsed = round(time.time() - start, 2)
    print(f"[ANSWER] Done in {elapsed}s")

    return {
        "query": query,
        "answer": answer,
        "time_taken": elapsed
    }
