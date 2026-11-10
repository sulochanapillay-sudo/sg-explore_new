import React from 'react';
import { LOCAL_TRAVEL_TIPS, SINGLISH_GLOSSARY } from '../data/singaporeData';
import { Train, Utensils, Coffee, ShieldAlert, Sun, CreditCard, MessageSquare, CheckCircle2 } from 'lucide-react';

export const LocalTips: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'train':
        return <Train className="w-5 h-5 text-red-500" />;
      case 'utensils':
        return <Utensils className="w-5 h-5 text-amber-500" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-amber-600" />;
      case 'shield':
        return <ShieldAlert className="w-5 h-5 text-emerald-500" />;
      case 'sun':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'credit-card':
        return <CreditCard className="w-5 h-5 text-blue-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section className="py-12 bg-white dark:bg-slate-900 transition-colors border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
              Practical Traveler Essentials
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              Insider Tips & Travel Etiquette
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Everything you need to know about tapping into the MRT, tropical heat preparation, local laws, and Singlish conversation.
          </p>
        </div>

        {/* 6 Essential Advice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {LOCAL_TRAVEL_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center shadow-xs border border-slate-200 dark:border-slate-600 mb-4">
                  {getIcon(tip.icon)}
                </div>

                <div className="text-[11px] font-mono text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
                  {tip.category}
                </div>

                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-2">
                  {tip.title}
                </h3>

                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-3">
                  {tip.summary}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {tip.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Singlish Mini-Lexicon Feature Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>Colloquial Language</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Singlish Crash Course for Tourists
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Singapore’s colorful creole English blends Malay, Hokkien, Cantonese, and Tamil into expressive, efficient phrases.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SINGLISH_GLOSSARY.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-red-400 font-display">
                    "{item.word}"
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  {item.meaning}
                </div>
                <div className="text-[11px] text-slate-400 italic pt-1">
                  {item.example}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
