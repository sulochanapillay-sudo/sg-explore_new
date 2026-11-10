import React from 'react';
import { Bookmark, Compass, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedPlacesCount: number;
  onOpenSavedModal: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedPlacesCount,
  onOpenSavedModal,
  isDark,
  toggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            setActiveTab('places');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-left group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display whitespace-nowrap">
            Singa<span className="text-red-600">Scape</span>
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveTab('regions')}
            className={`whitespace-nowrap transition-colors hover:text-red-600 dark:hover:text-red-400 py-1 ${
              activeTab === 'regions'
                ? 'text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400'
                : ''
            }`}
          >
            Key Regions
          </button>
          <button
            onClick={() => setActiveTab('places')}
            className={`whitespace-nowrap transition-colors hover:text-red-600 dark:hover:text-red-400 py-1 ${
              activeTab === 'places'
                ? 'text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400'
                : ''
            }`}
          >
            Popular Places
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`whitespace-nowrap transition-colors hover:text-red-600 dark:hover:text-red-400 py-1 ${
              activeTab === 'map'
                ? 'text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400'
                : ''
            }`}
          >
            Island Map
          </button>
          <button
            onClick={() => setActiveTab('hawker')}
            className={`whitespace-nowrap transition-colors hover:text-red-600 dark:hover:text-red-400 py-1 ${
              activeTab === 'hawker'
                ? 'text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400'
                : ''
            }`}
          >
            Hawker & Food
          </button>
          <button
            onClick={() => setActiveTab('itineraries')}
            className={`whitespace-nowrap transition-colors hover:text-red-600 dark:hover:text-red-400 py-1 ${
              activeTab === 'itineraries'
                ? 'text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400'
                : ''
            }`}
          >
            Trip Itineraries
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`whitespace-nowrap transition-colors hover:text-red-600 dark:hover:text-red-400 py-1 ${
              activeTab === 'tips'
                ? 'text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400'
                : ''
            }`}
          >
            Traveler Tips
          </button>
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          <button
            onClick={onOpenSavedModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            <Bookmark className="w-4 h-4 fill-current" />
            <span>My Journey</span>
            {savedPlacesCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-white/20 text-white rounded text-[11px] font-mono tabular-nums">
                {savedPlacesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
