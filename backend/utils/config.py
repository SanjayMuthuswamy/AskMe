import os

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

EMBED_MODEL = "nomic-embed-text"
LLM_MODEL = "llama3"

CHUNK_SIZE = 1500
CHUNK_OVERLAP = 100

CROSS_ENCODER_MODEL = "cross-encoder/ms-marco-MiniLM-L-6-v2"

# Retrieval config
RETRIEVER_TOP_K = 10   # candidates fetched per search tool
RERANK_TOP_K = 3        # kept after cross-encoder reranking
BM25_TOP_K = 10         # candidates from keyword search
