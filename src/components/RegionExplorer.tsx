import React from 'react';
import { MapPin, Train, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { REGIONS, PLACES } from '../data/singaporeData';
import { RegionId, Place } from '../types/tourism';

interface RegionExplorerProps {
  selectedRegionId: RegionId;
  onSelectRegion: (id: RegionId) => void;
  onSelectPlace: (place: Place) => void;
  onViewOnMap: (regionId: RegionId) => void;
}

export const RegionExplorer: React.FC<RegionExplorerProps> = ({
  selectedRegionId,
  onSelectRegion,
  onSelectPlace,
  onViewOnMap,
}) => {
  const activeRegion = REGIONS.find((r) => r.id === selectedRegionId) || REGIONS[0];
  const regionPlaces = PLACES.filter((p) => p.regionId === selectedRegionId);

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
              Geographic & Cultural Districts
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              The 10 Key Regions of Singapore
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            From the futuristic waterfront of Marina Bay to historical ethnic heritage quarters and lush northern wildlife sanctuaries.
          </p>
        </div>

        {/* Region Selector Horizontal Scrollable Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
          {REGIONS.map((region) => {
            const isSelected = region.id === selectedRegionId;
            const placeCount = PLACES.filter((p) => p.regionId === region.id).length;

            return (
              <button
                key={region.id}
                onClick={() => onSelectRegion(region.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-red-400 dark:text-red-600' : 'text-slate-400'}`} />
                <span>{region.name}</span>
                <span className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded ${
                  isSelected
                    ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {placeCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Region Feature Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 mb-8 shadow-sm transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Region Context */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Featured Region
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
                  {activeRegion.name}
                </h3>
                <p className="text-sm font-medium text-red-600 dark:text-red-400 mt-1">
                  {activeRegion.tagline}
                </p>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeRegion.description}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-3">
                <div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
                    Neighborhood Vibe
                  </span>
                  <div className="text-xs text-slate-700 dark:text-slate-200">
                    {activeRegion.vibe}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
                    MRT Transit Connectivity
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeRegion.mrtLines.map((line, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/80 px-2 py-0.5 rounded"
                      >
                        <Train className="w-3 h-3 text-slate-400" />
                        <span>{line}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onViewOnMap(activeRegion.id)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>Locate {activeRegion.name} on Interactive Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Key Places in this Region */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                  Popular Places in {activeRegion.name}
                </h4>
                <span className="text-xs text-slate-500 font-mono tabular-nums">
                  {regionPlaces.length} destination{regionPlaces.length === 1 ? '' : 's'}
                </span>
              </div>

              {regionPlaces.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500">
                    More hidden gems in this district coming soon! Check other regions or map view.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {regionPlaces.map((place) => (
                    <div
                      key={place.id}
                      onClick={() => onSelectPlace(place)}
                      className="group cursor-pointer p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all hover:shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        {place.imageUrl && (
                          <div className="h-28 w-full rounded-lg overflow-hidden mb-3 relative bg-slate-100 dark:bg-slate-700">
                            <img
                              src={place.imageUrl}
                              alt={place.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono tabular-nums">
                              ★ {place.rating}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                          <span className="capitalize">{place.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{place.timeRequired}</span>
                        </div>

                        <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-1">
                          {place.name}
                        </h5>

                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1">
                          {place.tagline}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                          {place.mrtStation.split('(')[0]}
                        </span>
                        <span className="text-red-600 dark:text-red-400 font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                          Details & Tips →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
