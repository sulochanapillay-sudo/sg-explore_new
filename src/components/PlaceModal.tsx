import React, { useEffect } from 'react';
import { Place } from '../types/tourism';
import { REGIONS } from '../data/singaporeData';
import { X, Bookmark, MapPin, Clock, DollarSign, Lightbulb, CheckCircle2, Star, ExternalLink, Train } from 'lucide-react';

interface PlaceModalProps {
  place: Place | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const PlaceModal: React.FC<PlaceModalProps> = ({
  place,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (place) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [place, onClose]);

  if (!place) return null;

  const region = REGIONS.find((r) => r.id === place.regionId);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place.name} Singapore`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden z-10 my-8 transition-colors flex flex-col max-h-[90vh]">
        
        {/* Sticky Close & Action Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleSave(place.id)}
            aria-label={isSaved ? 'Saved in My Journey' : 'Add to My Journey'}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-black/50 hover:bg-black/70 text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto">
          {/* Hero Banner inside Modal */}
          <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
            {place.imageUrl ? (
              <img
                src={place.imageUrl}
                alt={place.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${place.fallbackGradient} flex items-center justify-center text-white p-6`}>
                <div className="text-center">
                  <div className="text-2xl font-bold font-display">{place.name}</div>
                  <div className="text-xs text-white/80 mt-1">{region?.name}</div>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="text-xs font-mono tracking-wider uppercase text-red-400 mb-1">
                {region?.name}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
                {place.name}
              </h2>
              {(place.chineseName || place.malayName || place.tamilName) && (
                <div className="text-xs text-slate-300 mt-0.5">
                  {place.chineseName || place.malayName || place.tamilName}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Meta Row without Pill Boxes (§1.A Zero-Pill) */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-700/60">
              <span className="font-semibold text-red-600 dark:text-red-400 capitalize">
                {place.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{place.timeRequired}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{place.cost === 'Free' ? 'Free Entry' : place.cost}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono text-slate-800 dark:text-slate-200 tabular-nums">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{place.rating}</span>
                <span className="text-slate-400">({(place.reviewsCount / 1000).toFixed(0)}k reviews)</span>
              </span>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                {place.description}
              </p>
            </div>

            {/* Local Insider Tip (Subtle card without thick left accent border, §1.C) */}
            <div className="bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Local Insider Secret</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {place.insiderTip}
              </p>
            </div>

            {/* Must See Highlights */}
            {place.mustSee && place.mustSee.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  Key Highlights & Photo Spots
                </h4>
                <ul className="space-y-2">
                  {place.mustSee.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practical Visitor Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs">
              <div className="space-y-1">
                <span className="font-medium text-slate-400 uppercase tracking-wider block">
                  MRT Subway Access
                </span>
                <div className="flex items-start gap-1.5 text-slate-800 dark:text-slate-200">
                  <Train className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{place.mrtStation}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-medium text-slate-400 uppercase tracking-wider block">
                  Best Time to Visit
                </span>
                <div className="flex items-start gap-1.5 text-slate-800 dark:text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{place.bestTime}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-medium text-slate-400 uppercase tracking-wider block">
                  Opening Hours
                </span>
                <div className="text-slate-800 dark:text-slate-200">
                  {place.openingHours}
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-medium text-slate-400 uppercase tracking-wider block">
                  Admission Fee
                </span>
                <div className="text-slate-800 dark:text-slate-200">
                  {place.costNote || (place.cost === 'Free' ? 'Free Public Entry' : `Ticketed (${place.cost})`)}
                </div>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <span className="font-medium text-slate-400 uppercase tracking-wider block">
                  Address
                </span>
                <div className="text-slate-800 dark:text-slate-200">
                  {place.address}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => onToggleSave(place.id)}
                className={`w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  isSaved
                    ? 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-800'
                    : 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Saved in My Journey' : 'Add to My Journey'}</span>
              </button>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
