import React from 'react';
import { Place, CategoryId, RegionId } from '../types/tourism';
import { REGIONS } from '../data/singaporeData';
import { Bookmark, Clock, MapPin, Sparkles, ExternalLink, Star } from 'lucide-react';

interface PlacesGridProps {
  places: Place[];
  savedPlaceIds: string[];
  onToggleSave: (placeId: string) => void;
  onSelectPlace: (place: Place) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (c: CategoryId) => void;
  selectedRegionFilter: RegionId | 'all';
  onSelectRegionFilter: (r: RegionId | 'all') => void;
}

export const PlacesGrid: React.FC<PlacesGridProps> = ({
  places,
  savedPlaceIds,
  onToggleSave,
  onSelectPlace,
  selectedCategory,
  onSelectCategory,
  selectedRegionFilter,
  onSelectRegionFilter,
}) => {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
              Curated Destination Highlights
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              Popular Places & Landmarks
            </h2>
          </div>

          {/* Region filter dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="region-select" className="text-xs text-slate-500 whitespace-nowrap">
              Filter by Region:
            </label>
            <select
              id="region-select"
              value={selectedRegionFilter}
              onChange={(e) => onSelectRegionFilter(e.target.value as RegionId | 'all')}
              className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Regions ({places.length})</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Empty Search / Filter State */}
        {places.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
              No matching destinations found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Try broadening your search term or reset the category and region filters to view all attractions.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                onSelectRegionFilter('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => {
              const isSaved = savedPlaceIds.includes(place.id);
              const region = REGIONS.find((r) => r.id === place.regionId);

              return (
                <article
                  key={place.id}
                  className="group bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-600 transition-all hover:shadow-md"
                >
                  <div>
                    {/* Visual Card Image / Fallback Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                      {place.imageUrl ? (
                        <img
                          src={place.imageUrl}
                          alt={place.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${place.fallbackGradient} flex flex-col justify-between p-4 text-white`}>
                          <div className="text-[11px] font-mono opacity-80 uppercase tracking-wider">
                            {region?.name}
                          </div>
                          <div>
                            <div className="text-lg font-bold font-display leading-tight">
                              {place.name}
                            </div>
                            {place.chineseName && (
                              <div className="text-xs opacity-75 font-sans mt-0.5">
                                {place.chineseName}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Top Action Bookmark Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(place.id);
                        }}
                        aria-label={isSaved ? 'Remove from My Journey' : 'Save to My Journey'}
                        className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
                          isSaved
                            ? 'bg-red-600 text-white shadow-sm'
                            : 'bg-black/40 hover:bg-black/60 text-white'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>

                      {/* Cost / Family indicator on image */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium backdrop-blur-md bg-black/50 text-white tabular-nums">
                          {place.cost === 'Free' ? 'Free Entry' : place.cost}
                        </span>
                        {place.familyFriendly && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-medium backdrop-blur-md bg-black/50 text-emerald-300">
                            Family Favorite
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      {/* Zero-Pill Unboxed Clean Metadata */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <span className="font-medium text-red-600 dark:text-red-400 capitalize">
                          {place.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{region?.name.split('&')[0].trim()}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-0.5 font-mono tabular-nums text-slate-700 dark:text-slate-300">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                          <span>{place.rating.toFixed(1)}</span>
                          <span className="text-slate-400 text-[10px]">({(place.reviewsCount / 1000).toFixed(0)}k)</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {place.name}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
                        {place.tagline}
                      </p>

                      {/* Transit Line & Duration Info */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 space-y-1.5 text-xs">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{place.mrtStation}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Visit time: {place.timeRequired}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectPlace(place)}
                      className="w-full py-2.5 px-3 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-colors text-center"
                    >
                      View Details & Insider Tips
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
