import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Message } from '../types';
import { useDocument } from '../contexts/DocumentContext';
import { SendIcon, MicIcon, BotIcon, UserIcon } from '../components/icons';
import { askQuestion } from '../services/api';


const AskPage: React.FC = () => {
  const { documentName, knowledgeBaseGenerated } = useDocument();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (documentName) {
      setMessages([
        {
          id: 'initial',
          sender: 'ai',
          text: `I'm ready to answer questions about your document: **${documentName}**. What would you like to know?`,
        },
      ]);
    }
  }, [documentName]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askQuestion(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.answer || 'No answer found.',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'ai', text: `Sorry, I ran into an issue: ${errorMessage}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!knowledgeBaseGenerated) {
    return <Navigate to="/upload" replace />;
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-6 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <BotIcon className="w-5 h-5 text-primary " />
              </div>
            )}
            <div className={`max-w-lg p-4 rounded-xl shadow-sm ${msg.sender === 'ai' ? 'bg-slate-100 dark:bg-slate-800 rounded-tl-none' : 'bg-primary text-white rounded-br-none'}`}>
              <p className="prose dark:prose-invert text-base" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-xs font-semibold mb-1">Sources:</h4>
                  <ul className="text-xs space-y-1">
                    {msg.sources.map((source, i) => (
                      <li key={i} className="opacity-80">{source}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
             {msg.sender === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-slate-500" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-4">
                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <BotIcon className="w-5 h-5 text-primary" />
                 </div>
                 <div className="max-w-lg p-4 rounded-xl rounded-tl-none bg-slate-100 dark:bg-slate-800">
                     <div className="flex items-center space-x-2">
                         <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                         <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                         <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                     </div>
                 </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="pt-6">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-transparent focus-within:border-primary/50 transition-colors">
          <button type="button" className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 ring-primary">
            <MicIcon className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your document..."
            className="w-full bg-transparent focus:outline-none text-base px-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2.5 rounded-lg bg-primary text-white disabled:bg-slate-300 disabled:dark:bg-slate-600 transition-all duration-200 transform enabled:hover:scale-110 focus:outline-none focus-visible:ring-2 ring-primary ring-offset-2 ring-offset-light dark:ring-offset-dark"
          >
            <SendIcon className="w-5 h-5 m-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskPage;
