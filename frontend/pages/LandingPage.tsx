
import React from 'react';
import { Link } from 'react-router-dom';
import { BotIcon, FileIcon } from '../components/icons';

const LandingPage: React.FC = () => {
  return (
    <div className="relative text-center py-16 md:py-24 lg:py-32 overflow-hidden">
        <div 
            className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100 via-white to-sky-100 dark:from-indigo-900/20 dark:via-dark dark:to-sky-900/20"
            style={{
                backgroundSize: '200% 200%',
                animation: 'gradient 15s ease infinite',
            }}
        ></div>
         <style>{`
            @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `}</style>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
        <span className="bg-gradient-to-r from-indigo-500 to-violet-500 text-transparent bg-clip-text">
          Ask Smarter.
        </span> Search Deeper.
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
        Upload your documents and let our AI provide instant, intelligent answers. Transform your data into a conversation.
      </p>
      <div className="flex justify-center">
        <Link
          to="/upload"
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
        >
          Get Started
        </Link>
      </div>

      <div className="mt-20 max-w-3xl mx-auto">
        <div className="flex items-center justify-center space-x-2 md:space-x-4 text-slate-500 dark:text-slate-400">
            <div className="flex flex-col items-center p-4 bg-white/50 dark:bg-white/5 rounded-2xl shadow-sm">
                <FileIcon className="w-12 h-12 text-indigo-500"/>
                <span className="mt-2 text-sm font-medium">Your Document</span>
            </div>
            <div className="flex-grow h-px bg-slate-300 dark:bg-slate-700"></div>
            <div className="font-mono text-indigo-500">AI</div>
            <div className="flex-grow h-px bg-slate-300 dark:bg-slate-700"></div>
             <div className="flex flex-col items-center p-4 bg-white/50 dark:bg-white/5 rounded-2xl shadow-sm">
                <BotIcon className="w-12 h-12 text-violet-500"/>
                <span className="mt-2 text-sm font-medium">Intelligent Answer</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
