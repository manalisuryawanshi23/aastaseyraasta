import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Landmark,
  Compass,
  Navigation,
  Search,
  ExternalLink,
  Clock,
  Car,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Footprints,
  Flame,
  Waves,
  Train,
  SlidersHorizontal,
  ChevronRight,
  Route,
} from 'lucide-react';
import { destinationMapConfigs, MapPOI } from '../data/destinationMapData';

interface DestinationMapVisualizerProps {
  destinationSlug: string;
  destinationName: string;
  onOpenBooking?: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

export const DestinationMapVisualizer: React.FC<DestinationMapVisualizerProps> = ({
  destinationSlug,
  destinationName,
  onOpenBooking,
}) => {
  // Get map config for this destination (fallback to ujjain if slug not explicitly mapped)
  const mapConfig = useMemo(() => {
    const slugKey = destinationSlug.toLowerCase();
    return destinationMapConfigs[slugKey] || destinationMapConfigs['ujjain'];
  }, [destinationSlug]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePoiId, setActivePoiId] = useState<string | null>(
    mapConfig.pois[0]?.id || null
  );
  const [mapStyle, setMapStyle] = useState<'terrain' | 'satellite' | 'street'>('terrain');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedRoutePoiId, setSelectedRoutePoiId] = useState<string | null>(null);

  // Filtered POIs
  const filteredPois = useMemo(() => {
    return mapConfig.pois.filter((poi) => {
      const matchesCategory =
        selectedCategory === 'All' || poi.category === selectedCategory;
      const matchesSearch =
        poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (poi.hindiName && poi.hindiName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        poi.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [mapConfig, selectedCategory, searchQuery]);

  const activePoi = useMemo(() => {
    return mapConfig.pois.find((p) => p.id === activePoiId) || mapConfig.pois[0];
  }, [mapConfig, activePoiId]);

  // Categories list
  const categories = [
    { id: 'All', label: 'All Sites', icon: Compass },
    { id: 'Temple', label: 'Temples & Shrines', icon: Flame },
    { id: 'Shaktipeeth', label: 'Shaktipeeths', icon: Sparkles },
    { id: 'Ghat', label: 'River Ghats', icon: Waves },
    { id: 'Ashram', label: 'Ashrams & Heritage', icon: Landmark },
    { id: 'Transit', label: 'Transit Hubs', icon: Train },
  ];

  // Helper function to calculate pixel position for custom map canvas
  const getMarkerPosition = (lat: number, lng: number) => {
    // Relative positioning bounding box centered around mapConfig center
    const centerLat = mapConfig.centerLat;
    const centerLng = mapConfig.centerLng;

    const latDiff = (lat - centerLat) * 1200 * zoomLevel;
    const lngDiff = (lng - centerLng) * 1400 * zoomLevel;

    // Convert to percentage coordinates inside the map box (center is 50%, 50%)
    const leftPct = 50 + lngDiff;
    const topPct = 50 - latDiff;

    // Clamp between 8% and 92% so markers stay inside map boundaries
    const clampedLeft = Math.max(8, Math.min(92, leftPct));
    const clampedTop = Math.max(8, Math.min(92, topPct));

    return { left: `${clampedLeft}%`, top: `${clampedTop}%` };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Temple':
        return 'bg-amber-600 text-white border-amber-300 shadow-amber-500/40';
      case 'Shaktipeeth':
        return 'bg-rose-600 text-white border-rose-300 shadow-rose-500/40';
      case 'Ghat':
        return 'bg-sky-600 text-white border-sky-300 shadow-sky-500/40';
      case 'Ashram':
        return 'bg-emerald-600 text-white border-emerald-300 shadow-emerald-500/40';
      case 'Transit':
        return 'bg-slate-700 text-white border-slate-300 shadow-slate-500/40';
      default:
        return 'bg-amber-700 text-white border-amber-300 shadow-amber-500/40';
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Temple':
        return 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200';
      case 'Shaktipeeth':
        return 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200';
      case 'Ghat':
        return 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/80 dark:text-sky-200';
      case 'Ashram':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200';
      default:
        return 'bg-stone-100 text-stone-900 border-stone-300 dark:bg-stone-800 dark:text-stone-200';
    }
  };

  const openGoogleMapsDirections = (poi: MapPOI) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${poi.latitude},${poi.longitude}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white dark:bg-[#1C1917] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden space-y-0">
      
      {/* Map Header & Search Bar */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-950 text-white border-b border-amber-900/40 space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-semibold uppercase tracking-wider border border-amber-500/30">
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>Sacred Navigation Visualizer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              Holy Sites & Points of Interest in {destinationName}
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm">
              Explore key temples, rivers, ghats, and transport nodes on our interactive pilgrim map.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search temple, ghat, ashram..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-900/90 border border-stone-700 text-stone-100 placeholder-stone-500 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
        </div>

        {/* Category Filters Toolbar */}
        <div className="w-full flex items-center gap-2 overflow-x-auto flex-nowrap pt-2 pb-1 scrollbar-none touch-pan-x">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 border border-stone-700/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Map Body: Interactive Visual Canvas + Detail Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* Visual Map Canvas Container (8 Cols on Desktop) */}
        <div className="lg:col-span-8 relative bg-stone-900 overflow-hidden flex flex-col justify-between p-4 sm:p-6 min-h-[420px] sm:min-h-[500px]">
          
          {/* Map Style Background Canvas */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
              mapStyle === 'terrain'
                ? 'bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] bg-stone-950 opacity-90'
                : mapStyle === 'satellite'
                ? 'bg-stone-950 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-95'
                : 'bg-stone-900 bg-[radial-gradient(#a8a29e_1px,transparent_1px)] [background-size:20px_20px]'
            }`}
          />

          {/* Decorative River Curve Overlay (Simulated Kshipra/Narmada river ribbon) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M -50 120 C 150 20, 250 380, 550 200 C 750 80, 850 400, 1100 250"
              fill="none"
              stroke="#0284c7"
              strokeWidth="28"
              strokeLinecap="round"
            />
            <path
              d="M -50 120 C 150 20, 250 380, 550 200 C 750 80, 850 400, 1100 250"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="8"
              strokeDasharray="12 8"
            />
          </svg>

          {/* Map Controls Top Bar */}
          <div className="relative z-20 flex items-center justify-between gap-2">
            
            {/* Map Style Switcher */}
            <div className="flex items-center gap-1 bg-stone-950/80 backdrop-blur-md p-1 rounded-xl border border-stone-800 shadow-md">
              <button
                onClick={() => setMapStyle('terrain')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  mapStyle === 'terrain'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Terrain Map
              </button>
              <button
                onClick={() => setMapStyle('satellite')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  mapStyle === 'satellite'
                    ? 'bg-sky-500 text-stone-950'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => setMapStyle('street')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  mapStyle === 'street'
                    ? 'bg-stone-200 text-stone-950'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Grid View
              </button>
            </div>

            {/* Zoom & Reset Buttons */}
            <div className="flex items-center gap-1 bg-stone-950/80 backdrop-blur-md p-1 rounded-xl border border-stone-800 shadow-md">
              <button
                onClick={() => setZoomLevel((prev) => Math.min(1.6, prev + 0.2))}
                className="p-1.5 rounded-lg text-stone-300 hover:text-amber-400 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((prev) => Math.max(0.8, prev - 0.2))}
                className="p-1.5 rounded-lg text-stone-300 hover:text-amber-400 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 rounded-lg text-stone-300 hover:text-amber-400 transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Interactive Marker Pins on Map Surface */}
          <div className="relative z-10 w-full flex-1 my-6 min-h-[320px]">
            {filteredPois.map((poi) => {
              const isSelected = activePoiId === poi.id;
              const pos = getMarkerPosition(poi.latitude, poi.longitude);

              return (
                <div
                  key={poi.id}
                  onClick={() => setActivePoiId(poi.id)}
                  style={{ left: pos.left, top: pos.top }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-300 z-20"
                >
                  {/* Glowing Aura for Selected / Must Visit */}
                  {(isSelected || poi.isMustVisit) && (
                    <span
                      className={`absolute -inset-2 rounded-full animate-ping opacity-75 ${
                        isSelected ? 'bg-amber-400/60' : 'bg-amber-500/30'
                      }`}
                    />
                  )}

                  {/* Marker Pin Icon */}
                  <div
                    className={`relative p-2 rounded-2xl border-2 transition-all transform ${
                      isSelected
                        ? 'scale-125 z-30 ring-4 ring-amber-400/50 ' + getCategoryColor(poi.category)
                        : 'hover:scale-110 z-10 ' + getCategoryColor(poi.category)
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Pin Label Badge */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-md transition-all pointer-events-none ${
                      isSelected
                        ? 'bg-amber-400 text-stone-950 scale-100 opacity-100 z-30'
                        : 'bg-stone-900/90 text-stone-200 scale-90 opacity-80 group-hover:opacity-100 group-hover:scale-100'
                    }`}
                  >
                    {poi.name.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Footer Info Overlay */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 text-stone-400 text-[11px] bg-stone-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Center: {mapConfig.centerLat.toFixed(4)}°N, {mapConfig.centerLng.toFixed(4)}°E</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Temples
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Shaktipeeths
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> Ghats
              </span>
            </div>
          </div>

        </div>

        {/* Selected POI Detail Sidebar (4 Cols on Desktop) */}
        <div className="lg:col-span-4 p-6 bg-stone-50 dark:bg-[#181513] border-t lg:border-t-0 lg:border-l border-stone-200 dark:border-stone-800 space-y-6 flex flex-col justify-between">
          
          {activePoi ? (
            <div className="space-y-4">
              
              {/* Image Header if available */}
              {activePoi.image && (
                <div className="relative rounded-2xl overflow-hidden h-36 border border-stone-200 dark:border-stone-800 shadow-sm">
                  <img
                    src={activePoi.image}
                    alt={activePoi.name}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent flex items-end p-3">
                    <span className="text-white text-xs font-bold font-serif">
                      {activePoi.name}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                
                {/* Category & Must Visit Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getCategoryBadgeClass(
                      activePoi.category
                    )}`}
                  >
                    {activePoi.category}
                  </span>

                  {activePoi.isMustVisit && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 flex items-center gap-1 shadow-2xs">
                      <Sparkles className="w-3 h-3" />
                      <span>Must Visit</span>
                    </span>
                  )}
                </div>

                {/* Name & Hindi Name */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-amber-100">
                    {activePoi.name}
                  </h3>
                  {activePoi.hindiName && (
                    <p className="text-xs font-serif text-amber-700 dark:text-amber-400 font-medium">
                      {activePoi.hindiName}
                    </p>
                  )}
                </div>

              </div>

              {/* Distance & Travel Time Cards */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white dark:bg-stone-900 p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 space-y-0.5">
                  <div className="text-stone-400 text-[10px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    <span>Distance</span>
                  </div>
                  <div className="font-bold text-stone-800 dark:text-stone-200 text-xs">
                    {activePoi.distanceFromCenter}
                  </div>
                </div>

                <div className="bg-white dark:bg-stone-900 p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 space-y-0.5">
                  <div className="text-stone-400 text-[10px] flex items-center gap-1">
                    <Car className="w-3 h-3 text-amber-600" />
                    <span>Travel Time</span>
                  </div>
                  <div className="font-bold text-stone-800 dark:text-stone-200 text-xs">
                    {activePoi.travelTime}
                  </div>
                </div>
              </div>

              {/* Timing */}
              {activePoi.timing && (
                <div className="flex items-center gap-2 bg-amber-50 dark:bg-stone-900/80 p-2.5 rounded-xl border border-amber-200 dark:border-stone-800 text-xs text-amber-900 dark:text-amber-200 font-medium">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Timings: {activePoi.timing}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                {activePoi.description}
              </p>

              {/* Highlight Tag */}
              {activePoi.highlight && (
                <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Key Highlight</span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-200 font-medium">
                    {activePoi.highlight}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => openGoogleMapsDirections(activePoi)}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </button>

                {onOpenBooking && (
                  <button
                    onClick={() => onOpenBooking('Pooja', activePoi.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 border border-stone-700"
                  >
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Book Pooja / Tour Nearby</span>
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="text-center py-10 text-stone-500 text-xs">
              Select a marker on the map to view details.
            </div>
          )}

          {/* Quick List Selector at bottom of sidebar */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
            <div className="text-[11px] font-bold text-stone-500 dark:text-stone-400 flex items-center justify-between">
              <span>All Holy Sites ({filteredPois.length})</span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400">Click to focus</span>
            </div>

            <div className="max-h-40 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
              {filteredPois.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePoiId(p.id)}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    activePoiId === p.id
                      ? 'bg-amber-100 dark:bg-stone-800 font-bold text-amber-950 dark:text-amber-200'
                      : 'hover:bg-stone-200/60 dark:hover:bg-stone-800/50 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="truncate pr-2">{p.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Suggested Circuit Route Section below the Map */}
      <div className="p-6 bg-amber-50/50 dark:bg-[#151312] border-t border-stone-200 dark:border-stone-800 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-serif font-bold text-sm sm:text-base">
          <Route className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <span>Recommended 1-Day Pilgrim Circuit Route for {destinationName}</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {mapConfig.pois.slice(0, 5).map((poi, idx) => (
            <React.Fragment key={poi.id}>
              <button
                onClick={() => setActivePoiId(poi.id)}
                className={`p-3 rounded-xl border text-xs text-left shrink-0 max-w-[200px] transition-all ${
                  activePoiId === poi.id
                    ? 'bg-amber-500 text-stone-950 border-amber-600 font-bold shadow-md'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-amber-400'
                }`}
              >
                <div className="text-[10px] text-amber-900/80 dark:text-amber-400/80 font-bold mb-0.5">
                  Stop {idx + 1}
                </div>
                <div className="font-semibold text-xs truncate">{poi.name}</div>
                <div className="text-[10px] opacity-80 mt-0.5">{poi.travelTime}</div>
              </button>

              {idx < 4 && (
                <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
};
