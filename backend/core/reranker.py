from sentence_transformers import CrossEncoder
from utils.config import CROSS_ENCODER_MODEL, RERANK_TOP_K
import time

# Singleton cross-encoder
_cross_encoder = None


def get_cross_encoder():
    """Load cross-encoder model (once)."""
    global _cross_encoder
    if _cross_encoder is None:
        print(f"[RERANK] Loading model: {CROSS_ENCODER_MODEL}")
        t = time.time()
        _cross_encoder = CrossEncoder(CROSS_ENCODER_MODEL)
        print(f"[RERANK] Loaded in {time.time() - t:.2f}s")
    return _cross_encoder


def rerank_documents(query: str, documents: list, top_k: int = None):
    """Rerank documents using cross-encoder relevance scoring."""
    if top_k is None:
        top_k = RERANK_TOP_K
    if not documents:
        return documents

    ce = get_cross_encoder()
    pairs = [(query, doc.page_content) for doc in documents]
    scores = ce.predict(pairs)

    scored = sorted(zip(documents, scores), key=lambda x: x[1], reverse=True)

    print(f"[RERANK] {len(documents)} docs → top {top_k}")
    for i, (doc, score) in enumerate(scored[:top_k]):
        print(f"  #{i+1} ({score:.4f}): {doc.page_content[:60]}...")

    return [doc for doc, _ in scored[:top_k]]
