from langchain_community.vectorstores import FAISS
from langchain.docstore.document import Document
from rank_bm25 import BM25Okapi
from utils.config import RETRIEVER_TOP_K, BM25_TOP_K

# Global stores (set during upload)
_faiss_retriever = None
_bm25_index = None
_bm25_docs = None


def build_vectorstore(docs, embeddings):
    """Build FAISS vector store and BM25 index from document chunks."""
    global _faiss_retriever, _bm25_index, _bm25_docs

    # FAISS (semantic search)
    vectorstore = FAISS.from_documents(docs, embeddings)
    _faiss_retriever = vectorstore.as_retriever(search_kwargs={"k": RETRIEVER_TOP_K})

    # BM25 (keyword search)
    _bm25_docs = docs
    tokenized = [doc.page_content.lower().split() for doc in docs]
    _bm25_index = BM25Okapi(tokenized)

    return _faiss_retriever


def search_faiss(query: str) -> list[Document]:
    """Retrieve documents using FAISS vector similarity."""
    if _faiss_retriever is None:
        return []
    results = _faiss_retriever.invoke(query)
    print(f"[FAISS] Retrieved {len(results)} docs")
    return results


def search_bm25(query: str) -> list[Document]:
    """Retrieve documents using BM25 keyword matching."""
    if _bm25_index is None or _bm25_docs is None:
        return []
    tokens = query.lower().split()
    scores = _bm25_index.get_scores(tokens)

    scored = sorted(zip(_bm25_docs, scores), key=lambda x: x[1], reverse=True)
    results = [doc for doc, s in scored[:BM25_TOP_K] if s > 0]
    print(f"[BM25] Retrieved {len(results)} docs")
    return results
