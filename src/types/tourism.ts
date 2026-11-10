export type RegionId =
  | 'marina-bay'
  | 'civic-district'
  | 'chinatown'
  | 'kampong-gelam'
  | 'little-india'
  | 'orchard'
  | 'sentosa'
  | 'katong'
  | 'nature-north'
  | 'changi';

export type CategoryId =
  | 'all'
  | 'landmark'
  | 'culture'
  | 'nature'
  | 'culinary'
  | 'entertainment'
  | 'shopping';

export interface Region {
  id: RegionId;
  name: string;
  tagline: string;
  description: string;
  vibe: string;
  topHighlights: string[];
  mrtLines: string[];
  colorTheme: string; // Tailwind color token
  mapCoordinates: { x: number; y: number }; // percentage on Singapore map
}

export interface Place {
  id: string;
  name: string;
  chineseName?: string;
  malayName?: string;
  tamilName?: string;
  regionId: RegionId;
  category: CategoryId;
  tagline: string;
  description: string;
  imageUrl?: string;
  fallbackGradient: string;
  mrtStation: string;
  mrtCodes: string[];
  timeRequired: string;
  bestTime: string;
  cost: 'Free' | '$' | '$$' | '$$$';
  costNote?: string;
  rating: number;
  reviewsCount: number;
  address: string;
  openingHours: string;
  insiderTip: string;
  mustSee: string[];
  latitude: number;
  longitude: number;
  mapX: number; // percentage on custom SVG map (0-100)
  mapY: number; // percentage on custom SVG map (0-100)
  familyFriendly: boolean;
  nightAttraction?: boolean;
}

export interface HawkerCenter {
  id: string;
  name: string;
  region: string;
  mrtStation: string;
  vibe: string;
  signatureStalls: {
    stallName: string;
    dish: string;
    priceEst: string;
    insiderNote: string;
  }[];
  address: string;
  proTip: string;
}

export interface CuratedItinerary {
  id: string;
  title: string;
  duration: string;
  idealFor: string;
  summary: string;
  stops: {
    time: string;
    placeId: string;
    placeName: string;
    regionName: string;
    activity: string;
    transitTip: string;
  }[];
}

export interface LocalTravelTip {
  title: string;
  category: 'transit' | 'etiquette' | 'weather' | 'slang' | 'money';
  icon: string;
  summary: string;
  details: string;
}
