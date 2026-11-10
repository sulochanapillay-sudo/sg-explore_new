import React, { useState } from 'react';
import { HAWKER_CENTRES } from '../data/singaporeData';
import { Utensils, Coffee, MapPin, Sparkles, Award, HelpCircle, Check } from 'lucide-react';

export const HawkerGuide: React.FC = () => {
  const [selectedCentreId, setSelectedCentreId] = useState<string>(HAWKER_CENTRES[0].id);
  const activeCentre = HAWKER_CENTRES.find((h) => h.id === selectedCentreId) || HAWKER_CENTRES[0];

  // Interactive Kopi order state
  const [kopiMilk, setKopiMilk] = useState<'condensed' | 'evaporated' | 'none'>('condensed');
  const [kopiSugar, setKopiSugar] = useState<'normal' | 'less' | 'none'>('normal');
  const [kopiIce, setKopiIce] = useState<'hot' | 'iced'>('hot');

  // Compute what the local order phrase is
  const getKopiName = () => {
    let name = 'Kopi';
    if (kopiMilk === 'none') {
      name = 'Kopi-O';
    } else if (kopiMilk === 'evaporated') {
      name = 'Kopi-C';
    }

    if (kopiSugar === 'none') {
      name += (name === 'Kopi' ? '-Kosong' : '-Kosong');
    } else if (kopiSugar === 'less') {
      name += '-Siew Dai';
    }

    if (kopiIce === 'iced') {
      name += '-Peng';
    }
    return name;
  };

  return (
    <section className="py-12 bg-white dark:bg-slate-900 transition-colors border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span>UNESCO Intangible Cultural Heritage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              Hawker Culture & Street Feasts
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Singapore hawker centers are world-famous culinary melting pots where Michelin-acclaimed street food costs under S$8.
          </p>
        </div>

        {/* Hawker Center Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {HAWKER_CENTRES.map((centre) => {
            const isSelected = centre.id === selectedCentreId;
            return (
              <button
                key={centre.id}
                onClick={() => setSelectedCentreId(centre.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <Utensils className={`w-3.5 h-3.5 ${isSelected ? 'text-red-400 dark:text-red-600' : 'text-slate-400'}`} />
                <span>{centre.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Hawker Center Spotlight */}
        <div className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-700">
            <div>
              <div className="text-xs font-mono text-red-600 dark:text-red-400 uppercase tracking-wider">
                {activeCentre.region}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                {activeCentre.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {activeCentre.vibe}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-600">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>{activeCentre.mrtStation}</span>
            </div>
          </div>

          {/* Signature Stalls */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Signature Stalls & Dishes You Must Try
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCentre.signatureStalls.map((stall, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-red-600 dark:text-red-400">
                        {stall.stallName}
                      </span>
                      <span className="text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 tabular-nums">
                        {stall.priceEst}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-2">
                      {stall.dish}
                    </h5>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {stall.insiderNote}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pro Tip Callout */}
            <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Local Foodie Pro Tip: </span>
                {activeCentre.proTip}
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Educational Experience: The "Chope" Rule & Kopitiam Order Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: The Chope Etiquette Guide */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-7">
            <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2">
              <span>Local Etiquette</span>
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
              The Sacred Art of "Chope-ing"
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              In busy hawker centers, Singaporeans reserve empty tables before buying food by placing a pocket tissue packet, umbrella, or lanyard on the seat.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Find your seat first</div>
                  <div className="text-slate-500 dark:text-slate-400">Place a pack of pocket tissues on the table to claim it.</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Memorize your table number</div>
                  <div className="text-slate-500 dark:text-slate-400">Many stalls deliver piping hot bowls directly to your numbered table.</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Return your tray when finished</div>
                  <div className="text-slate-500 dark:text-slate-400">Clear your plates and bowls at designated Halal / Non-Halal tray return racks.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive Kopi (Coffee) Dialect Decoder */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-7">
            <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2">
              <Coffee className="w-4 h-4 text-amber-500" />
              <span>Interactive Kopitiam Decoder</span>
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
              Order Coffee Like a True Local
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Select your preferences below to see the exact Singlish phrase you should say to the coffee uncle:
            </p>

            {/* Milk choice */}
            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">Milk Option:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'condensed', label: 'Condensed (Sweet)' },
                    { id: 'evaporated', label: 'Evaporated (-C)' },
                    { id: 'none', label: 'No Milk (-O)' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setKopiMilk(opt.id as any)}
                      className={`py-1.5 px-2 text-xs rounded-lg font-medium border transition-colors ${
                        kopiMilk === opt.id
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white'
                          : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sugar choice */}
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">Sugar Level:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'normal', label: 'Normal Sugar' },
                    { id: 'less', label: 'Less Sugar (-Siew Dai)' },
                    { id: 'none', label: 'Zero Sugar (-Kosong)' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setKopiSugar(opt.id as any)}
                      className={`py-1.5 px-2 text-xs rounded-lg font-medium border transition-colors ${
                        kopiSugar === opt.id
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white'
                          : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature */}
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">Temperature:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'hot', label: 'Hot Cup' },
                    { id: 'iced', label: 'Iced Glass (-Peng)' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setKopiIce(opt.id as any)}
                      className={`py-1.5 px-2 text-xs rounded-lg font-medium border transition-colors ${
                        kopiIce === opt.id
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white'
                          : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Phrase Result Box */}
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono text-red-600 dark:text-red-400 uppercase tracking-wider">
                  Say this to the coffee stall:
                </div>
                <div className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                  "Uncle, satu {getKopiName()}!"
                </div>
              </div>
              <div className="text-2xl">☕</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
