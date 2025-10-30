from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from utils.config import CHUNK_SIZE, CHUNK_OVERLAP

def split_text(text: str):
    """Split large text into smaller chunks for embeddings."""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP
    )
    return splitter.split_documents([Document(page_content=text)])
