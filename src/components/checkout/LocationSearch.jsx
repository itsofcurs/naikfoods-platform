import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, MapPin, X, Navigation } from 'lucide-react';
import { searchPlacesMappls } from '../../services/mappls';
import { useLanguageStore } from '../../store/languageStore';

export default function LocationSearch({
  searchQuery,
  onSearchQueryChange,
  onSelectPlace,
  center = { lat: 18.5204, lng: 73.8567 },
  isSearching,
  setIsSearching
}) {
  const { lang } = useLanguageStore();
  const isMr = lang === 'mr';

  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Perform search on query change with debouncing (300ms)
  useEffect(() => {
    const clean = (searchQuery || '').trim();

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (clean.length >= 1) {
      if (setIsSearching) setIsSearching(true);
      setShowDropdown(true);

      // Instant local search result
      searchPlacesMappls(clean, center).then((immediate) => {
        if (immediate && immediate.length > 0) {
          setSuggestions(immediate);
        }
      });

      // Debounced network / API call
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const results = await searchPlacesMappls(clean, center);
          setSuggestions(results || []);
        } catch (err) {
          console.warn('[LocationSearch] Error querying places:', err);
        } finally {
          if (setIsSearching) setIsSearching(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
      if (setIsSearching) setIsSearching(false);
    }

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [searchQuery, center.lat, center.lng]);

  // Click outside listener to dismiss dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    onSearchQueryChange('');
    setSuggestions([]);
    setShowDropdown(false);
  };

  const handleSelect = (place) => {
    onSelectPlace(place);
    setShowDropdown(false);
  };

  return (
    <div ref={searchContainerRef} className="relative mb-4">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          placeholder={
            isMr
              ? 'इमारत, सोसायटी, कॉलनी, रस्ता किंवा परिसर शोधा...'
              : 'Search building, society, apartment, area anywhere in India...'
          }
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
          className="w-full bg-gray-50 dark:bg-[#131E35] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl py-3 pl-10 pr-16 text-sm focus:outline-none focus:border-[#70BF4F] focus:bg-white dark:focus:bg-[#18263E] transition-all shadow-inner"
        />
        <div className="absolute right-3 flex items-center gap-1.5">
          {isSearching && (
            <Loader2 className="w-4 h-4 text-[#70BF4F] dark:text-[#86EFAC] animate-spin" />
          )}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Zomato-style Suggestion Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 animate-in fade-in slide-in-from-top-2 duration-150">
          {suggestions.map((place, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(place)}
              className="w-full text-left p-3.5 hover:bg-gray-50 dark:hover:bg-[#18263E] flex items-start gap-3 transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#70BF4F]/10 dark:bg-[#70BF4F]/20 text-[#70BF4F] dark:text-[#86EFAC] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform border border-[#70BF4F]/20">
                {place.isCustomPin ? (
                  <Navigation className="w-4 h-4" />
                ) : (
                  <MapPin className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {place.title}
                  </p>
                  {place.distance && (
                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#1E293B] px-2 py-0.5 rounded-full flex-shrink-0 border border-transparent dark:border-gray-700">
                      {place.distance}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  {place.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
