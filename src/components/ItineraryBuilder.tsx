import React, { useState } from 'react';
import { Place, CuratedItinerary } from '../types/tourism';
import { CURATED_ITINERARIES, PLACES, REGIONS } from '../data/singaporeData';
import { Calendar, Clock, MapPin, Trash2, ArrowUp, ArrowDown, Share2, Printer, CheckCircle, Navigation, Plus, Bookmark } from 'lucide-react';

interface ItineraryBuilderProps {
  savedPlaceIds: string[];
  onRemovePlace: (placeId: string) => void;
  onReorderPlaces: (newOrder: string[]) => void;
  onClearAll: () => void;
  onSelectPlace: (place: Place) => void;
  onExploreMorePlaces: () => void;
}

export const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({
  savedPlaceIds,
  onRemovePlace,
  onReorderPlaces,
  onClearAll,
  onSelectPlace,
  onExploreMorePlaces,
}) => {
  const [activeTab, setActiveTab] = useState<'custom' | 'curated'>('custom');
  const [selectedCuratedId, setSelectedCuratedId] = useState<string>(CURATED_ITINERARIES[0].id);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const savedPlaces = savedPlaceIds
    .map((id) => PLACES.find((p) => p.id === id))
    .filter((p): p is Place => Boolean(p));

  const activeCurated = CURATED_ITINERARIES.find((c) => c.id === selectedCuratedId) || CURATED_ITINERARIES[0];

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= savedPlaceIds.length) return;
    const newOrder = [...savedPlaceIds];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    onReorderPlaces(newOrder);
  };

  const copyTripPlan = () => {
    const lines = savedPlaces.map((p, idx) => `${idx + 1}. ${p.name} (${p.mrtStation}) - Est: ${p.timeRequired}`);
    const text = `My Singapore Journey:\n${lines.join('\n')}\n\nPlanned via SingaScape`;
    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900/40 transition-colors border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
              Personalized Trip Planning
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              Singapore Itinerary & Routes
            </h2>
          </div>

          {/* Segmented Control (§1.A Allowed) */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'custom'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              My Custom Journey ({savedPlaces.length})
            </button>
            <button
              onClick={() => setActiveTab('curated')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'curated'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Curated Day Plans
            </button>
          </div>
        </div>

        {/* Tab 1: Custom User Itinerary */}
        {activeTab === 'custom' && (
          <div>
            {savedPlaces.length === 0 ? (
              <div className="py-16 text-center bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 p-8 max-w-2xl mx-auto">
                <Bookmark className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
                  Your custom journey is empty
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                  Click the bookmark icon on any attraction or landmark across the guide to build your personalized travel itinerary with transit times and MRT connections.
                </p>
                <button
                  onClick={onExploreMorePlaces}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm"
                >
                  Explore Popular Places to Add
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
                
                {/* Itinerary Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                      Your Singapore Route ({savedPlaces.length} Destinations)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Drag or use arrows to organize your stops into a smooth MRT route.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyTripPlan}
                      className="px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5"
                    >
                      {copiedNotice ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                      <span>{copiedNotice ? 'Copied to Clipboard!' : 'Share / Copy'}</span>
                    </button>

                    <button
                      onClick={handlePrint}
                      className="px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Plan</span>
                    </button>

                    <button
                      onClick={onClearAll}
                      className="px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Ordered Timeline Stops */}
                <div className="mt-6 space-y-4">
                  {savedPlaces.map((place, index) => {
                    const region = REGIONS.find((r) => r.id === place.regionId);

                    return (
                      <div
                        key={place.id}
                        className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/80 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          {/* Stop Number Badge */}
                          <div className="w-9 h-9 rounded-xl bg-red-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                            {index + 1}
                          </div>

                          {place.imageUrl && (
                            <img
                              src={place.imageUrl}
                              alt={place.name}
                              className="w-16 h-16 rounded-xl object-cover shrink-0 hidden sm:block"
                            />
                          )}

                          <div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                              <span className="font-semibold text-red-600 dark:text-red-400 capitalize">
                                {place.category}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{region?.name}</span>
                            </div>
                            
                            <h4
                              onClick={() => onSelectPlace(place)}
                              className="text-base font-bold font-display text-slate-900 dark:text-white cursor-pointer hover:text-red-600 transition-colors"
                            >
                              {place.name}
                            </h4>

                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                <span>{place.mrtStation}</span>
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span>{place.timeRequired}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Order Controls & Remove */}
                        <div className="flex items-center gap-1 self-end sm:self-center">
                          <button
                            onClick={() => moveItem(index, 'up')}
                            disabled={index === 0}
                            aria-label="Move stop up"
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => moveItem(index, 'down')}
                            disabled={index === savedPlaces.length - 1}
                            aria-label="Move stop down"
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onRemovePlace(place.id)}
                            aria-label="Remove from journey"
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors ml-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    Pro tip: Plan 3–4 major attractions per day to avoid tropical exhaustion.
                  </div>
                  <button
                    onClick={onExploreMorePlaces}
                    className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add more places to your itinerary</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Pre-Made Curated Itineraries */}
        {activeTab === 'curated' && (
          <div>
            {/* Itinerary Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {CURATED_ITINERARIES.map((plan) => {
                const isSelected = plan.id === selectedCuratedId;
                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedCuratedId(plan.id)}
                    className={`p-5 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        isSelected
                          ? 'bg-red-600 text-white'
                          : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                      }`}>
                        {plan.duration}
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-display leading-snug mb-1">
                      {plan.title}
                    </h4>

                    <p className={`text-xs line-clamp-2 ${isSelected ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
                      {plan.idealFor}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Curated Plan Details */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
              <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="text-xs font-mono text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
                  Curated Master Route · {activeCurated.duration}
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  {activeCurated.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {activeCurated.summary}
                </p>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                {activeCurated.stops.map((stop, idx) => (
                  <div key={idx} className="relative flex items-start gap-5">
                    {/* Timeline bullet */}
                    <div className="w-7 h-7 rounded-full bg-red-600 text-white text-xs font-mono font-bold flex items-center justify-center shrink-0 z-10 ring-4 ring-white dark:ring-slate-800">
                      {idx + 1}
                    </div>

                    <div className="flex-1 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span className="font-semibold text-red-600 dark:text-red-400 font-mono">
                          {stop.time}
                        </span>
                        <span>{stop.regionName}</span>
                      </div>

                      <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                        {stop.placeName}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                        {stop.activity}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-600/60 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Navigation className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>Transit connection: {stop.transitTip}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
