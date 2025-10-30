from PyPDF2 import PdfReader

def extract_text_from_file(file_path: str):
    """Extract text from .pdf or .txt fle."""
    if file_path.endswith(".pdf"):
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text

    elif file_path.endswith(".txt"):
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()

    else:
        raise ValueError("Unsupported file type (only .pdf and .txt are supported)")
