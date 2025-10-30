
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { MenuIcon, XIcon } from './icons';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClasses = 'px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary';
  const activeLinkClasses = 'bg-primary/10 text-primary dark:text-accent-light';
  const inactiveLinkClasses = 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200';

  const getLinkClass = ({ isActive }: { isActive: boolean }) => 
    `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  const MobileNavLinks = () => (
    <>
      <NavLink to="/" className={getLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
      <NavLink to="/upload" className={getLinkClass} onClick={() => setIsOpen(false)}>Upload</NavLink>
      <NavLink to="/ask" className={getLinkClass} onClick={() => setIsOpen(false)}>Ask</NavLink>
      <NavLink to="/about" className={getLinkClass} onClick={() => setIsOpen(false)}>About</NavLink>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-light/80 dark:bg-dark/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-violet-500 text-transparent bg-clip-text">
                AskMe
              </span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <MobileNavLinks />
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <MobileNavLinks />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
