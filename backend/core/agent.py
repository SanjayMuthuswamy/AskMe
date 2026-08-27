from langchain.agents import Tool, AgentExecutor, create_react_agent
from langchain_ollama import OllamaLLM
from langchain.prompts import PromptTemplate
from core.retriever import search_faiss, search_bm25
from core.reranker import rerank_documents
from utils.config import LLM_MODEL

# Temp storage for reranking across tool calls
_last_retrieved_docs = []


def _tool_search_faiss(query: str) -> str:
    """Search documents using FAISS semantic similarity."""
    global _last_retrieved_docs
    docs = search_faiss(query)
    _last_retrieved_docs = docs
    if not docs:
        return "No results found."
    return "\n---\n".join([d.page_content[:300] for d in docs])


def _tool_search_bm25(query: str) -> str:
    """Search documents using BM25 keyword matching."""
    global _last_retrieved_docs
    docs = search_bm25(query)
    _last_retrieved_docs = docs
    if not docs:
        return "No results found."
    return "\n---\n".join([d.page_content[:300] for d in docs])


def _tool_rerank(query: str) -> str:
    """Rerank the last retrieved documents using cross-encoder."""
    global _last_retrieved_docs
    if not _last_retrieved_docs:
        return "No documents to rerank. Use search_faiss or search_bm25 first."
    reranked = rerank_documents(query, _last_retrieved_docs)
    _last_retrieved_docs = reranked
    return "\n---\n".join([d.page_content[:300] for d in reranked])


# Define tools for the agent
tools = [
    Tool(name="search_faiss", func=_tool_search_faiss,
         description="Semantic vector search. Use for meaning-based queries."),
    Tool(name="search_bm25", func=_tool_search_bm25,
         description="Keyword search. Use when the query has specific terms or names."),
    Tool(name="rerank_results", func=_tool_rerank,
         description="Rerank previously retrieved docs for better accuracy. Always use after searching."),
]

AGENT_PROMPT = PromptTemplate.from_template("""You are AskMe, a document Q&A agent. Answer the user's question using ONLY the provided tools.

Strategy:
1. First, search using search_faiss OR search_bm25 (pick based on query type)
2. Then, rerank the results using rerank_results
3. Finally, answer from the reranked context

You have access to these tools:
{tools}

Tool names: {tool_names}

Use this format:

Question: the input question
Thought: what to do next
Action: tool name
Action Input: input for the tool
Observation: tool result
... (repeat Thought/Action/Observation as needed)
Thought: I have enough info to answer
Final Answer: the answer

Begin!

Question: {input}
Thought: {agent_scratchpad}""")


def create_agent(retriever):
    """Create a ReAct agent with search and rerank tools."""
    llm = OllamaLLM(model=LLM_MODEL)
    agent = create_react_agent(llm=llm, tools=tools, prompt=AGENT_PROMPT)
    return AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=True,
        handle_parsing_errors=True,
        max_iterations=5,
    )
