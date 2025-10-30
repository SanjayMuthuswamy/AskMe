from fastapi import APIRouter, Query
from routes.upload_route import get_qa_chain
import time

router = APIRouter()

@router.get("/ask")
async def ask_question(query: str = Query(...)):
    """Ask a question about the uploaded document."""
    qa_chain = get_qa_chain()
    if qa_chain is None:
        return {"error": "Please upload a document first."}

    print(f"\n🔍 New question received: '{query}'")

    # Measure time for response
    start_time = time.time()
    answer = qa_chain.run(query)
    end_time = time.time()

    elapsed = round(end_time - start_time, 2)
    print(f"💬 Answer generated in {elapsed}s")

    return {
        "query": query,
        "answer": answer,
        "time_taken": elapsed
    }
