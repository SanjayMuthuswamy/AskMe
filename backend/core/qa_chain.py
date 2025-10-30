from langchain.chains import RetrievalQA
from langchain_community.llms import Ollama
from utils.config import LLM_MODEL

def create_qa_chain(retriever):
    """Build a RetrievalQA chain using local Ollama LLM."""
    llm = Ollama(model=LLM_MODEL)
    return RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
