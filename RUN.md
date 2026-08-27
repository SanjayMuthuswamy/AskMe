# How to Run AskMe Application

Follow these steps to run the complete AskMe application locally.

---

## 1. Prepare Ollama Models (Prerequisites)

Open your terminal and ensure Ollama is installed and running, then pull the required models:

```bash
# Start Ollama service (if not running in background)
ollama serve

# Download required embedding model
ollama pull nomic-embed-text

# Download required LLM model
ollama pull llama3.2
```

---

## 2. Start Backend Server

Open a terminal window and run:

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
> **Backend URL:** `http://127.0.0.1:8000`  
> **API Docs:** `http://127.0.0.1:8000/docs`

---

## 3. Start Frontend App

Open a second terminal window and run:

```bash
cd frontend
npm install
npm run dev
```
> **Frontend URL:** `http://localhost:3000`

---

## 4. Usage

1. Open `http://localhost:3000` in your web browser.
2. Upload any document (`.pdf`, `.txt`, or `.docx`).
3. Navigate to the Chat view to ask questions grounded in your document.
