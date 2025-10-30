import os

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

EMBED_MODEL = "nomic-embed-text"
# EMBED_MODEL = "all-MiniLM-L6-v2"
# EMBED_MODEL = "sentence-transformers/paraphrase-MiniLM-L3-v2"
LLM_MODEL = "llama3"
# LLM_MODEL = "llama3.2:1b"

CHUNK_SIZE = 1500
CHUNK_OVERLAP = 100
