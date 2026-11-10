import React, { useState } from 'react';
import { Place, RegionId, CategoryId } from '../types/tourism';
import { REGIONS, PLACES } from '../data/singaporeData';
import { MapPin, Navigation, Eye, Star, Info, ZoomIn } from 'lucide-react';

interface InteractiveMapProps {
  onSelectPlace: (place: Place) => void;
  highlightRegionId?: RegionId;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onSelectPlace,
  highlightRegionId,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [hoveredPlace, setHoveredPlace] = useState<Place | null>(null);
  const [selectedPinPlace, setSelectedPinPlace] = useState<Place | null>(null);

  const filteredPlaces = PLACES.filter((place) => {
    if (activeCategory === 'all') return true;
    return place.category === activeCategory;
  });

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900/60 transition-colors border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
              Visual Island Geography
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              Interactive Singapore Explorer Map
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Click on any pin to view attraction highlights, nearest MRT stops, and regional placement across Singapore.
          </p>
        </div>

        {/* Map Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-400 px-2">Show:</span>
            {(['all', 'landmark', 'nature', 'culture', 'entertainment', 'shopping'] as CategoryId[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg capitalize transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat === 'all' ? 'All Attractions' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500 px-2 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
              <span>Places ({filteredPlaces.length})</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              <span>Nature Reserves</span>
            </span>
          </div>
        </div>

        {/* Map Canvas Card */}
        <div className="relative bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden p-4 sm:p-8">
          
          {/* SVG Map of Singapore */}
          <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[460px] bg-sky-50/60 dark:bg-slate-950/70 rounded-2xl overflow-hidden border border-sky-100 dark:border-slate-800">
            
            {/* Watermark grid & sea lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-sky-300 dark:text-slate-700" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Geographical Vector Paths */}
            <svg
              viewBox="0 0 1000 600"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Surrounding Straits Water Labels */}
              <text x="500" y="45" fill="currentColor" className="text-slate-400 dark:text-slate-600 text-[12px] font-mono tracking-widest text-anchor-middle" textAnchor="middle">
                MALAYSIA · STRAITS OF JOHOR
              </text>
              <text x="500" y="575" fill="currentColor" className="text-slate-400 dark:text-slate-600 text-[12px] font-mono tracking-widest text-anchor-middle" textAnchor="middle">
                SINGAPORE STRAIT
              </text>

              {/* Pulau Ubin Island in Northeast */}
              <path
                d="M 720 160 C 760 150, 810 160, 820 180 C 810 200, 770 210, 720 190 Z"
                className="fill-emerald-100/70 dark:fill-emerald-950/40 stroke-emerald-300 dark:stroke-emerald-800"
                strokeWidth="1.5"
              />
              <text x="765" y="185" fill="currentColor" className="text-[10px] font-mono fill-emerald-800 dark:fill-emerald-400 opacity-70">
                Pulau Ubin
              </text>

              {/* Sentosa Island in South */}
              <path
                d="M 400 475 C 440 460, 480 470, 500 495 C 470 515, 420 520, 395 495 Z"
                className="fill-amber-100/80 dark:fill-amber-950/40 stroke-amber-300 dark:stroke-amber-700"
                strokeWidth="1.5"
              />
              <text x="445" y="492" fill="currentColor" className="text-[10px] font-bold font-mono fill-amber-800 dark:fill-amber-300">
                Sentosa Island
              </text>

              {/* Singapore Main Island Outline */}
              <path
                d="M 170 300 
                   C 190 230, 240 180, 310 160 
                   C 380 140, 460 130, 540 140 
                   C 620 135, 710 160, 780 210 
                   C 860 270, 930 300, 935 340 
                   C 930 380, 880 400, 820 420 
                   C 760 440, 680 435, 610 440 
                   C 570 445, 520 465, 480 455 
                   C 440 445, 400 450, 350 440 
                   C 280 430, 210 440, 160 410 
                   C 120 380, 110 330, 170 300 Z"
                className="fill-slate-100 dark:fill-slate-800/90 stroke-slate-300 dark:stroke-slate-600 transition-colors"
                strokeWidth="2"
              />

              {/* Central Catchment Nature Reserve (Lush Green Zone) */}
              <path
                d="M 410 200 
                   C 450 190, 490 210, 500 260 
                   C 505 300, 460 330, 420 320 
                   C 390 300, 385 240, 410 200 Z"
                className="fill-emerald-200/50 dark:fill-emerald-900/40 stroke-emerald-300 dark:stroke-emerald-700"
                strokeWidth="1"
              />
              <text x="445" y="260" fill="currentColor" className="text-[11px] font-mono fill-emerald-800 dark:fill-emerald-400 font-semibold" textAnchor="middle">
                Central Catchment Reserve
              </text>

              {/* Jurong Lake & West zone */}
              <circle cx="270" cy="350" r="18" className="fill-sky-200/70 dark:fill-sky-900/40" />

              {/* Marina Bay Basin (Water Body) */}
              <path
                d="M 510 430 C 530 425, 545 435, 540 450 C 530 458, 515 455, 510 430 Z"
                className="fill-sky-400/80 dark:fill-sky-700"
              />

              {/* Geographic Region Highlight Labels */}
              <g className="text-slate-400 dark:text-slate-500 font-mono text-[10px] select-none pointer-events-none">
                <text x="860" y="340">CHANGI AIRPORT</text>
                <text x="490" y="415">DOWNTOWN / MARINA BAY</text>
                <text x="410" y="380">ORCHARD</text>
                <text x="640" y="390">KATONG & EAST COAST</text>
                <text x="410" y="170">MANDAI WILDLIFE</text>
                <text x="220" y="330">JURONG</text>
              </g>
            </svg>

            {/* Interactive Region Coordinate Pins */}
            {filteredPlaces.map((place) => {
              const isHovered = hoveredPlace?.id === place.id;
              const isSelected = selectedPinPlace?.id === place.id;

              return (
                <div
                  key={place.id}
                  style={{
                    left: `${place.mapX}%`,
                    top: `${place.mapY}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  onMouseEnter={() => setHoveredPlace(place)}
                  onMouseLeave={() => setHoveredPlace(null)}
                >
                  {/* Pin button */}
                  <button
                    onClick={() => {
                      setSelectedPinPlace(place);
                      onSelectPlace(place);
                    }}
                    aria-label={`View ${place.name}`}
                    className={`relative p-1.5 sm:p-2 rounded-full shadow-md transition-all duration-200 ${
                      isSelected || isHovered
                        ? 'bg-red-600 text-white scale-125 ring-4 ring-red-400/30 z-30'
                        : 'bg-slate-900 text-white hover:bg-red-600 hover:scale-110'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  </button>

                  {/* Desktop Hover Tooltip */}
                  {isHovered && (
                    <div className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 bg-slate-900 text-white rounded-xl shadow-xl z-40 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                      <div className="text-[10px] text-red-400 font-mono uppercase tracking-wider mb-0.5">
                        {place.category}
                      </div>
                      <div className="text-xs font-bold font-display leading-tight">
                        {place.name}
                      </div>
                      <div className="text-[11px] text-slate-300 mt-1 line-clamp-1">
                        {place.mrtStation.split('(')[0]}
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-slate-700 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>★ {place.rating}</span>
                        <span>{place.timeRequired}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          </div>

          {/* Quick Place Detail Card Bar (When Pin is clicked) */}
          {selectedPinPlace && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700/60 rounded-2xl border border-slate-200 dark:border-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in slide-in-from-top-2">
              <div className="flex items-center gap-3">
                {selectedPinPlace.imageUrl && (
                  <img
                    src={selectedPinPlace.imageUrl}
                    alt={selectedPinPlace.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-red-600 dark:text-red-400 capitalize">
                      {selectedPinPlace.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedPinPlace.mrtStation}</span>
                  </div>
                  <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                    {selectedPinPlace.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                    {selectedPinPlace.tagline}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectPlace(selectedPinPlace)}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors whitespace-nowrap self-end sm:self-center"
              >
                Open Full Details & Tips
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
