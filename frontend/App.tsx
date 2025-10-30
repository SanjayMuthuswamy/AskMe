
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import AskPage from './pages/AskPage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-light dark:bg-dark font-sans">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/ask" element={<AskPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </HashRouter>
  );
};

export default App;
