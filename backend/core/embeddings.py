from langchain_community.embeddings import OllamaEmbeddings
from utils.config import EMBED_MODEL

def get_embeddings():
    """Return the Ollama embedding model instance."""
    return OllamaEmbeddings(model=EMBED_MODEL)
