import os

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

EMBED_MODEL = "nomic-embed-text"

LLM_MODEL = "llama3"

CHUNK_SIZE = 1500
CHUNK_OVERLAP = 100
