
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-transparent bg-clip-text">About AskMe</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
        <p>
          AskMe is a modern, AI-powered platform designed to make your documents interactive. It leverages the power of Large Language Models (LLMs) to provide intelligent, context-aware answers to your questions based on the content you upload.
        </p>
        <p>
          Our mission is to bridge the gap between static documents and dynamic knowledge. Instead of manually searching through pages of text, you can simply ask a question and receive a concise, accurate answer instantly.
        </p>
        <h2 className="text-2xl font-semibold">Technology Stack</h2>
        <p>
          This application is built with a focus on performance, user experience, and modern development practices.
        </p>
        <ul>
          <li><strong>React:</strong> For a robust and type-safe frontend application.</li>
          <li><strong>Tailwind CSS:</strong> For a utility-first, highly customizable, and responsive design.</li>
          <li><strong>Ollama Model:</strong> The core AI engine that powers our intelligent question-answering capabilities.</li>
          <li><strong>React Router:</strong> For client-side routing and navigation between pages.</li>
        </ul>
        <p>
          The design philosophy emphasizes minimalism, clarity, and accessibility, with both dark and light themes to suit your preference. We hope you find AskMe to be a powerful tool for unlocking the knowledge within your documents.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
