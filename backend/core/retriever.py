from langchain_community.vectorstores import FAISS

def build_vectorstore(docs, embeddings):
    vectorstore = FAISS.from_documents(docs, embeddings)
    return vectorstore.as_retriever()
