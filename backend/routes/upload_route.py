from fastapi import APIRouter, UploadFile, File
import os
import time
from utils.config import UPLOAD_DIR
from core.text_extractor import extract_text_from_file
from core.splitter import split_text
from core.embeddings import get_embeddings
from core.retriever import build_vectorstore
from core.qa_chain import create_qa_chain

router = APIRouter()
qa_chain = None  # Global QA chain variable


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    """Upload document, process it, and prepare for Q&A."""
    global qa_chain
    total_start = time.time()  # start total timer

    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    print(f"📂 File saved: {file.filename}")

    # Step 1: Extract text
    t1 = time.time()
    text = extract_text_from_file(file_path)
    print(f"🧾 Text extraction completed in {time.time() - t1:.2f}s")

    # Step 2: Split text
    t2 = time.time()
    docs = split_text(text)
    print(f"✂️ Text split into {len(docs)} chunks in {time.time() - t2:.2f}s")

    # Step 3: Create embeddings
    t3 = time.time()
    embeddings = get_embeddings()
    print(f"🧠 Embeddings model loaded in {time.time() - t3:.2f}s")

    # Step 4: Build retriever (vector DB)
    t4 = time.time()
    retriever = build_vectorstore(docs, embeddings)
    print(f"📊 Vector store built in {time.time() - t4:.2f}s")

    # Step 5: Build QA chain
    t5 = time.time()
    qa_chain = create_qa_chain(retriever)
    print(f"🔗 QA chain initialized in {time.time() - t5:.2f}s")

    total_end = time.time()
    print(f"✅ Total processing time: {total_end - total_start:.2f}s\n")

    return {
        "message": f"'{file.filename}' processed successfully",
        "chunks": len(docs),
        "time_taken": round(total_end - total_start, 2)
    }


def get_qa_chain():
    """Return the global QA chain instance."""
    return qa_chain
