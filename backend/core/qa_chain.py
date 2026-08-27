from langchain_ollama import OllamaLLM
from utils.config import LLM_MODEL
from core.reranker import rerank_documents
import time


class RerankedRetrievalQA:
    """QA chain: retrieve → rerank → generate."""

    def __init__(self, retriever, llm):
        self.retriever = retriever
        self.llm = llm

    def run(self, query: str) -> str:
        """Execute retrieve → rerank → generate pipeline."""
        t1 = time.time()
        candidates = self.retriever.invoke(query)
        print(f"[PIPELINE] Retrieved {len(candidates)} candidates in {time.time() - t1:.2f}s")

        t2 = time.time()
        reranked = rerank_documents(query, candidates)
        print(f"[PIPELINE] Reranked in {time.time() - t2:.2f}s")

        t3 = time.time()
        context = "\n\n".join([doc.page_content for doc in reranked])
        prompt = (
            f"Use the following context to answer the question.\n\n"
            f"Context:\n{context}\n\n"
            f"Question: {query}\n\nAnswer:"
        )
        answer = self.llm.invoke(prompt)
        print(f"[PIPELINE] Generated in {time.time() - t3:.2f}s")
        return answer


def create_qa_chain(retriever):
    """Build a RerankedRetrievalQA chain (fallback pipeline)."""
    llm = OllamaLLM(model=LLM_MODEL)
    return RerankedRetrievalQA(retriever=retriever, llm=llm)
