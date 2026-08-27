<div align="center">

# 🤖 AskMe

### AI-Powered Document Chat Assistant

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![LangChain](https://img.shields.io/badge/🦜_LangChain-0.3-1C3C3C?style=for-the-badge)](https://www.langchain.com/)
[![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)](https://ollama.ai/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

> 📄 Upload documents. ❓ Ask questions. 💡 Get instant, context-aware answers — all running **locally** on your machine.

</div>

---

## ✨ Features

| | Feature | Description |
|---|---------|-------------|
| ⚡ | **RAG-based QA** | Retrieve contextually relevant answers using Retrieval-Augmented Generation |
| 🧠 | **Local LLM Integration** | Uses Ollama (Llama 3) for private, on-device inference |
| 🔍 | **Hybrid Search** | Combines FAISS vector search with BM25 keyword ranking |
| 🔀 | **Cross-Encoder Reranking** | sentence-transformers reranker for precision results |
| 💬 | **Interactive Chat UI** | Beautiful React + TypeScript conversational interface |
| 🪶 | **Lightweight & Fast** | Optimized chunking, embeddings, and local-first architecture |

---

## 🖼️ Application Screenshots

<div align="center">

### 1. Document Upload & Processing
![Document Upload](docs/images/upload_page.png)

<br/>

### 2. Context-Aware Q&A Chat Interface
![Chat Interface](docs/images/chat_interface.png)

<br/>

### 3. General Knowledge Fallback Integration
![General Knowledge Fallback](docs/images/general_knowledge_fallback.png)

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (React + TS)             │
│               Vite · React Router · Axios           │
└──────────────────────┬──────────────────────────────┘
                       │  REST API
┌──────────────────────▼──────────────────────────────┐
│                   Backend (FastAPI)                  │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │ Upload   │  │  Ask      │  │  Core Engine     │  │
│  │ Route    │  │  Route    │  │  ┌────────────┐  │  │
│  └──────────┘  └───────────┘  │  │ Chunker    │  │  │
│                               │  │ Embedder   │  │  │
│                               │  │ Retriever  │  │  │
│                               │  │ Reranker   │  │  │
│                               │  └────────────┘  │  │
│                               └──────────────────┘  │
└──────────┬──────────────┬───────────────────────────┘
           │              │
   ┌───────▼───────┐  ┌──▼──────────────┐
   │  FAISS Index  │  │  Ollama (Local)  │
   │  Vector Store │  │  Llama 3 · Nomic │
   └───────────────┘  └─────────────────┘
```

---

## 🧰 Prerequisites

Before running **AskMe**, ensure the following are installed:

| Requirement | Link |
|-------------|------|
| ![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white) | [python.org](https://www.python.org/) |
| ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white) | [nodejs.org](https://nodejs.org/) |
| ![Ollama](https://img.shields.io/badge/Ollama-Latest-000000?style=flat-square&logo=ollama&logoColor=white) | [ollama.ai](https://ollama.ai/) |
| ![Git](https://img.shields.io/badge/Git-Latest-F05032?style=flat-square&logo=git&logoColor=white) | [git-scm.com](https://git-scm.com/) |

Then, pull the required Ollama models:

```bash
ollama pull llama3
ollama pull nomic-embed-text
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/SanjayMuthuswamy/AskMe.git
cd AskMe
```

### 2️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

---

## ▶️ Running the App

### 🖥️ Start the Backend

```bash
cd backend
uvicorn main:app --reload
```

### 🌐 Start the Frontend

```bash
cd frontend
npm run dev
```

---

## 🛠️ Tech Stack

<table>
  <tr>
    <th>Layer</th>
    <th>Technology</th>
  </tr>
  <tr>
    <td><strong>⚙️ Backend</strong></td>
    <td>
      <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI"/>
      <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"/>
      <img src="https://img.shields.io/badge/Uvicorn-2C2C2C?style=flat-square&logo=uvicorn&logoColor=white" alt="Uvicorn"/>
    </td>
  </tr>
  <tr>
    <td><strong>🧠 LLM Engine</strong></td>
    <td>
      <img src="https://img.shields.io/badge/Ollama-000000?style=flat-square&logo=ollama&logoColor=white" alt="Ollama"/>
      <img src="https://img.shields.io/badge/Llama_3-0467DF?style=flat-square&logo=meta&logoColor=white" alt="Llama 3"/>
    </td>
  </tr>
  <tr>
    <td><strong>🔗 Orchestration</strong></td>
    <td>
      <img src="https://img.shields.io/badge/🦜_LangChain-1C3C3C?style=flat-square" alt="LangChain"/>
    </td>
  </tr>
  <tr>
    <td><strong>📊 Embeddings</strong></td>
    <td>
      <img src="https://img.shields.io/badge/Nomic_Embed-4A154B?style=flat-square" alt="Nomic"/>
      <img src="https://img.shields.io/badge/Sentence_Transformers-FF6F00?style=flat-square" alt="Sentence Transformers"/>
    </td>
  </tr>
  <tr>
    <td><strong>🗄️ Vector Store</strong></td>
    <td>
      <img src="https://img.shields.io/badge/FAISS-0078D4?style=flat-square&logo=meta&logoColor=white" alt="FAISS"/>
      <img src="https://img.shields.io/badge/BM25-FF6347?style=flat-square" alt="BM25"/>
    </td>
  </tr>
  <tr>
    <td><strong>🎨 Frontend</strong></td>
    <td>
      <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/>
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
      <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
    </td>
  </tr>
</table>

---

## 🧩 How It Works

```mermaid
graph LR
    A[📄 Upload Document] --> B[✂️ Chunk Text]
    B --> C[🔢 Generate Embeddings]
    C --> D[🗄️ Store in FAISS]
    E[❓ User Question] --> F[🔍 Hybrid Retrieval]
    D --> F
    F --> G[🎯 Rerank with Cross-Encoder]
    G --> H[🧠 Llama 3 Generates Answer]
    H --> I[💬 Display Response]
```

1. 📄 User uploads documents (PDF, TXT)
2. ✂️ Text is **split into chunks** and **embedded** using `nomic-embed-text`
3. 🗄️ Chunks are stored in a **FAISS vector database**
4. ❓ When a user asks a question:
   - 🔍 Relevant chunks are retrieved via **hybrid search** (FAISS + BM25)
   - 🎯 Results are **reranked** with a cross-encoder for precision
   - 🧠 Query + context are sent to **Llama 3**
   - 💬 The model generates an accurate, context-aware answer

---

## 📂 Project Structure

```
AskMe/
├── 📁 backend/
│   ├── 📁 core/           # Core RAG engine (chunker, embedder, retriever, reranker)
│   ├── 📁 routes/          # FastAPI route handlers (upload, ask)
│   ├── 📁 utils/           # Utility functions
│   ├── 📁 uploads/         # Uploaded document storage
│   ├── 📄 main.py          # FastAPI app entry point
│   └── 📄 requirements.txt # Python dependencies
├── 📁 frontend/
│   ├── 📁 components/      # React UI components
│   ├── 📁 pages/           # Page-level components
│   ├── 📁 services/        # API service layer
│   ├── 📁 hooks/           # Custom React hooks
│   ├── 📁 contexts/        # React context providers
│   ├── 📄 App.tsx          # Root application component
│   └── 📄 package.json     # Node.js dependencies
└── 📄 README.md
```

---

## 💡 Author

**Sanjay Muthuswamy** – AI Enthusiast & Innovator

[![GitHub](https://img.shields.io/badge/GitHub-SanjayMuthuswamy-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SanjayMuthuswamy)

---

<div align="center">

⭐ **Star this repo if you found it useful!** ⭐

</div>
