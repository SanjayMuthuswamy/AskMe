from fastapi import APIRouter, UploadFile, File
import os
import time
from utils.config import UPLOAD_DIR
from core.text_extractor import extract_text_from_file
from core.splitter import split_text
from core.embeddings import get_embeddings
from core.retriever import build_vectorstore
from core.agent import create_agent
from core.reranker import get_cross_encoder

router = APIRouter()
_agent = None  # global agent instance


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    """Upload document, build indexes, and initialize the agent."""
    global _agent
    total_start = time.time()

    # Save file
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())
    print(f"[UPLOAD] Saved: {file.filename}")

    # Extract text
    t = time.time()
    text = extract_text_from_file(file_path)
    print(f"[EXTRACT] Done in {time.time() - t:.2f}s")

    # Split into chunks
    t = time.time()
    docs = split_text(text)
    print(f"[SPLIT] {len(docs)} chunks in {time.time() - t:.2f}s")

    # Create embeddings
    t = time.time()
    embeddings = get_embeddings()
    print(f"[EMBED] Ready in {time.time() - t:.2f}s")

    # Build FAISS + BM25 indexes
    t = time.time()
    retriever = build_vectorstore(docs, embeddings)
    print(f"[INDEX] FAISS + BM25 built in {time.time() - t:.2f}s")

    # Create agent with tools
    t = time.time()
    _agent = create_agent(retriever)
    print(f"[AGENT] Initialized in {time.time() - t:.2f}s")

    # Pre-load cross-encoder
    t = time.time()
    get_cross_encoder()
    print(f"[RERANK] Pre-loaded in {time.time() - t:.2f}s")

    total = time.time() - total_start
    print(f"[DONE] Total: {total:.2f}s\n")

    return {
        "message": f"'{file.filename}' processed successfully",
        "chunks": len(docs),
        "time_taken": round(total, 2)
    }


def get_agent():
    """Return the global agent instance."""
    return _agent
