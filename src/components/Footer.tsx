import React from 'react';
import { Compass, Phone, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold font-display tracking-tight">
                Singa<span className="text-red-500">Scape</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              An interactive curated guide to Singapore’s 10 distinctive regions, iconic architectural sights, UNESCO-recognized hawker centers, and effortless public transit.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Explore Guide
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    onNavClick('regions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Key Regions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavClick('places');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Popular Places
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavClick('map');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Interactive Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavClick('hawker');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Hawker Culture
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavClick('itineraries');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Day Itineraries
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Tourism Helplines */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Visitor Helplines
            </div>
            <div className="space-y-1.5 text-xs text-slate-400 font-mono">
              <div>Police Emergency: <span className="text-white font-bold">999</span></div>
              <div>Ambulance & Fire: <span className="text-white font-bold">995</span></div>
              <div>Singapore Tourism Hotline: <span className="text-white">1800-736-2000</span></div>
              <div>Non-Emergency Police: <span className="text-white">1800-255-0000</span></div>
            </div>
          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} SingaScape · Handcrafted Singapore Tourism Guide.
          </div>
          <div className="flex items-center gap-1">
            <span>Made for travelers discovering the Lion City</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
