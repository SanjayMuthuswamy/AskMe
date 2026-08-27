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

AGENT_PROMPT = PromptTemplate.from_template("""You are AskMe, an expert document Q&A assistant.
Answer the user's question using the provided tools.

Tools available:
{tools}

Tool names: {tool_names}

Use the following strict ReAct format:

Question: {input}
Thought: Reasoning about what action to take next.
Action: MUST be one of [{tool_names}]
Action Input: The plain search query text (NO parentheses, NO quotes around tool call).
Observation: Result of the action.
... (this Thought/Action/Action Input/Observation can repeat at most twice)
Thought: I know the final answer or have searched the document.
Final Answer: Provide the answer based on retrieved context. If no relevant info was found in the document, politely state that and provide a helpful response.

Begin!

Question: {input}
Thought: {agent_scratchpad}""")


def create_agent(retriever):
    """Create a ReAct agent with search and rerank tools."""
    llm = OllamaLLM(model=LLM_MODEL, temperature=0.1)
    agent = create_react_agent(llm=llm, tools=tools, prompt=AGENT_PROMPT)
    return AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=True,
        handle_parsing_errors="Check your output format! Ensure you write Action: <tool_name> on one line and Action Input: <query> on the next line.",
        max_iterations=4,
    )
