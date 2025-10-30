export const API_BASE_URL = "http://127.0.0.1:8000/api";

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "File upload failed");
  }

  return await response.json();
};

export const askQuestion = async (query) => {
  const response = await fetch(`${API_BASE_URL}/ask?query=${encodeURIComponent(query)}`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Query failed");
  }

  return await response.json();
};
