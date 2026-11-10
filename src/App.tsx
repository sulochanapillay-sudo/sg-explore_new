import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RegionExplorer } from './components/RegionExplorer';
import { PlacesGrid } from './components/PlacesGrid';
import { PlaceModal } from './components/PlaceModal';
import { InteractiveMap } from './components/InteractiveMap';
import { HawkerGuide } from './components/HawkerGuide';
import { ItineraryBuilder } from './components/ItineraryBuilder';
import { LocalTips } from './components/LocalTips';
import { Footer } from './components/Footer';
import { PLACES, REGIONS } from './data/singaporeData';
import { Place, RegionId, CategoryId } from './types/tourism';

const SAVED_STORAGE_KEY = 'singascape_saved_places_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('places');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<RegionId | 'all'>('all');
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>('marina-bay');
  const [selectedPlaceModal, setSelectedPlaceModal] = useState<Place | null>(null);

  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('singascape_theme') === 'dark' ||
        (!localStorage.getItem('singascape_theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('singascape_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('singascape_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Saved bookmarked places (Local Storage)
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SAVED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['gardens-by-the-bay', 'jewel-changi-airport', 'chinatown-heritage-trail'];
    } catch {
      return ['gardens-by-the-bay', 'jewel-changi-airport', 'chinatown-heritage-trail'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedPlaceIds));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedPlaceIds]);

  const toggleSavePlace = (placeId: string) => {
    setSavedPlaceIds((prev) =>
      prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId]
    );
  };

  const handleRemovePlace = (placeId: string) => {
    setSavedPlaceIds((prev) => prev.filter((id) => id !== placeId));
  };

  const handleClearAllSaved = () => {
    setSavedPlaceIds([]);
  };

  // Filtered places calculation
  const filteredPlaces = useMemo(() => {
    return PLACES.filter((place) => {
      // Category filter
      if (selectedCategory !== 'all' && place.category !== selectedCategory) {
        return false;
      }
      // Region filter
      if (selectedRegionFilter !== 'all' && place.regionId !== selectedRegionFilter) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = place.name.toLowerCase().includes(q);
        const matchesTagline = place.tagline.toLowerCase().includes(q);
        const matchesDesc = place.description.toLowerCase().includes(q);
        const matchesMrt = place.mrtStation.toLowerCase().includes(q);
        const region = REGIONS.find((r) => r.id === place.regionId);
        const matchesRegion = region?.name.toLowerCase().includes(q);
        const matchesChinese = place.chineseName?.toLowerCase().includes(q);
        return matchesName || matchesTagline || matchesDesc || matchesMrt || matchesRegion || matchesChinese;
      }
      return true;
    });
  }, [selectedCategory, selectedRegionFilter, searchQuery]);

  // Handlers for switching views
  const handleViewRegionOnMap = (regionId: RegionId) => {
    setSelectedRegionFilter(regionId);
    setActiveTab('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreRegions = () => {
    setActiveTab('regions');
    const regionSection = document.getElementById('regions-section');
    if (regionSection) {
      regionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-red-500 selection:text-white">
      
      {/* Universal Top Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedPlacesCount={savedPlaceIds.length}
        onOpenSavedModal={() => {
          setActiveTab('itineraries');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (activeTab !== 'places') setActiveTab('places');
        }}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          if (activeTab !== 'places') setActiveTab('places');
        }}
        onExploreRegions={handleExploreRegions}
        totalPlacesCount={PLACES.length}
        totalRegionsCount={REGIONS.length}
      />

      {/* Main Content Area based on Active Tab */}
      <main className="flex-1">
        {/* Tab: Popular Places (Default explorer) */}
        {activeTab === 'places' && (
          <>
            <div id="regions-section">
              <RegionExplorer
                selectedRegionId={selectedRegionId}
                onSelectRegion={(id) => {
                  setSelectedRegionId(id);
                  setSelectedRegionFilter(id);
                }}
                onSelectPlace={(place) => setSelectedPlaceModal(place)}
                onViewOnMap={handleViewRegionOnMap}
              />
            </div>

            <PlacesGrid
              places={filteredPlaces}
              savedPlaceIds={savedPlaceIds}
              onToggleSave={toggleSavePlace}
              onSelectPlace={(place) => setSelectedPlaceModal(place)}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedRegionFilter={selectedRegionFilter}
              onSelectRegionFilter={setSelectedRegionFilter}
            />
          </>
        )}

        {/* Tab: Key Regions */}
        {activeTab === 'regions' && (
          <div className="py-6">
            <RegionExplorer
              selectedRegionId={selectedRegionId}
              onSelectRegion={(id) => {
                setSelectedRegionId(id);
                setSelectedRegionFilter(id);
              }}
              onSelectPlace={(place) => setSelectedPlaceModal(place)}
              onViewOnMap={handleViewRegionOnMap}
            />

            {/* Also show the places for this selected region */}
            <PlacesGrid
              places={PLACES.filter((p) => p.regionId === selectedRegionId)}
              savedPlaceIds={savedPlaceIds}
              onToggleSave={toggleSavePlace}
              onSelectPlace={(place) => setSelectedPlaceModal(place)}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedRegionFilter={selectedRegionId}
              onSelectRegionFilter={setSelectedRegionFilter}
            />
          </div>
        )}

        {/* Tab: Interactive Map */}
        {activeTab === 'map' && (
          <div className="py-6">
            <InteractiveMap
              onSelectPlace={(place) => setSelectedPlaceModal(place)}
              highlightRegionId={selectedRegionFilter !== 'all' ? selectedRegionFilter : undefined}
            />
          </div>
        )}

        {/* Tab: Hawker & Food */}
        {activeTab === 'hawker' && (
          <div className="py-6">
            <HawkerGuide />
          </div>
        )}

        {/* Tab: Day Itineraries & Custom Route */}
        {activeTab === 'itineraries' && (
          <div className="py-6">
            <ItineraryBuilder
              savedPlaceIds={savedPlaceIds}
              onRemovePlace={handleRemovePlace}
              onReorderPlaces={setSavedPlaceIds}
              onClearAll={handleClearAllSaved}
              onSelectPlace={(place) => setSelectedPlaceModal(place)}
              onExploreMorePlaces={() => {
                setActiveTab('places');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Tab: Traveler Tips */}
        {activeTab === 'tips' && (
          <div className="py-6">
            <LocalTips />
          </div>
        )}
      </main>

      {/* Place Details Modal */}
      <PlaceModal
        place={selectedPlaceModal}
        onClose={() => setSelectedPlaceModal(null)}
        isSaved={selectedPlaceModal ? savedPlaceIds.includes(selectedPlaceModal.id) : false}
        onToggleSave={toggleSavePlace}
      />

      {/* Universal Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
        }}
      />
    </div>
  );
}
