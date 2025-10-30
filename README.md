# 🧠 AskMe – AI-Powered Document Chat Assistant

AskMe is an intelligent document-based chatbot that allows users to upload files (PDF, DOCX, TXT, etc.) and instantly ask questions about their contents.  
It combines **RAG (Retrieval-Augmented Generation)** with **Ollama LLMs** for accurate, context-aware answers — running completely **locally** for privacy and speed.

---

## 🚀 Features

- ⚡ **RAG-based QA** – Retrieve contextually relevant answers  
- 🧠 **Local LLM Integration** – Uses Ollama (e.g., Llama 3) for inference  
- 🔍 **Efficient Vector Search** – Powered by FAISS  
- 💬 **Interactive Chat UI** – Conversational interface for real-time queries  
- 🪶 **Lightweight & Fast** – Optimized chunking and embeddings  

---

## 🧰 Prerequisites

Before running **AskMe**, ensure the following are installed:

- **Python 3.10+**
- **pip** (latest version)
- **Ollama** → [https://ollama.ai](https://ollama.ai)
- **Git**

Then, pull the required models:

```bash
ollama pull llama3
ollama pull all-MiniLM-L6-v2
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/AskMe.git
cd AskMe

# Install dependencies
pip install -r requirements.txt
```

---

## ▶️ Run the Backend

```bash
uvicorn main:app --reload
```

Then open your browser and go to:

```
http://127.0.0.1:8000/docs
```

---

## 💻 Frontend (Optional)

If your project includes a frontend UI:

```bash
npm install
npm run dev
```

---

## ⚡ Tech Stack

| Component | Technology |
|------------|-------------|
| **Backend** | FastAPI |
| **LLM Engine** | Ollama (Llama 3) |
| **Embeddings** | all-MiniLM-L6-v2 |
| **Vector Store** | FAISS |
| **Framework** | LangChain |
| **Frontend (optional)** | React + Tailwind |

---

## 🧩 How It Works

1. User uploads documents  
2. Text is **split into chunks** and **embedded**  
3. Chunks are stored in a **FAISS vector database**  
4. When a user asks a question:  
   - Relevant chunks are retrieved  
   - Query + context are sent to **Llama 3**  
   - The model generates an accurate answer  

---

## 💡 Author

**Sanjay Muthuswamy** – AI Enthusiast & Innovator  

---
