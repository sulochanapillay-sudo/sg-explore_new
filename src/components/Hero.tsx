import React from 'react';
import { Search, MapPin, Sparkles, Navigation, X } from 'lucide-react';
import { HERO_IMAGE } from '../data/singaporeData';
import { CategoryId } from '../types/tourism';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (c: CategoryId) => void;
  onExploreRegions: () => void;
  totalPlacesCount: number;
  totalRegionsCount: number;
}

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All Highlights' },
  { id: 'landmark', label: 'Landmarks' },
  { id: 'nature', label: 'Gardens & Nature' },
  { id: 'culture', label: 'Heritage & Temples' },
  { id: 'culinary', label: 'Hawker & Food' },
  { id: 'entertainment', label: 'Attractions & Fun' },
  { id: 'shopping', label: 'Shopping & Murals' },
];

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onExploreRegions,
  totalPlacesCount,
  totalRegionsCount,
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={HERO_IMAGE}
          alt="Singapore Marina Bay illuminated skyline and waterfront at twilight"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="max-w-3xl">
          {/* Subtle editorial kicker */}
          <div className="flex items-center gap-2 text-xs font-medium text-red-400 mb-4 tracking-wider uppercase">
            <span>Official Traveler Explorer</span>
            <span aria-hidden="true">·</span>
            <span>The Garden City of Southeast Asia</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-display text-white text-balance leading-[1.1] mb-6">
            Discover Singapore Beyond the Ordinary
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
            Explore 10 distinctive island regions, UNESCO-inscribed hawker trails, world-class architectural wonders, and tranquil tropical rainforests connected seamlessly by the MRT.
          </p>

          {/* Interactive Search Bar */}
          <div className="relative max-w-2xl mb-6">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search places, MRT stations (e.g. Bayfront), or neighborhoods..."
                className="w-full pl-12 pr-10 py-3.5 bg-white/10 dark:bg-slate-900/60 backdrop-blur-md text-white placeholder-slate-400 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/20 transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 p-1 text-slate-400 hover:text-white rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick CTA to Regions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onExploreRegions}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900/80 hover:bg-slate-900 border border-white/20 rounded-lg backdrop-blur-sm transition-colors whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Browse by 10 Key Regions</span>
            </button>
          </div>
        </div>

        {/* 4-Column Proof & Metric Strip */}
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">
              {totalRegionsCount}
            </div>
            <div className="text-xs text-slate-400 mt-1">Distinct Island Regions</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">
              {totalPlacesCount}+
            </div>
            <div className="text-xs text-slate-400 mt-1">Curated Top Places</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-white">
              100%
            </div>
            <div className="text-xs text-slate-400 mt-1">MRT & SimplyGo Accessible</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-white">
              UNESCO
            </div>
            <div className="text-xs text-slate-400 mt-1">World Hawker Heritage</div>
          </div>
        </div>
      </div>
    </section>
  );
};
