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
    result = agent.invoke({"input": query})
    elapsed = round(time.time() - start, 2)

    answer = result.get("output", "No answer generated.")
    print(f"[ANSWER] Done in {elapsed}s")

    return {
        "query": query,
        "answer": answer,
        "time_taken": elapsed
    }
