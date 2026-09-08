import React, { useState, useCallback } from 'react';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import LocationSearch from './LocationSearch';
import DeliveryMap from './DeliveryMap';
import { reverseGeocodeMappls, getCurrentBrowserLocation } from '../../services/mappls';
import { useLanguageStore } from '../../store/languageStore';
import toast from 'react-hot-toast';

export default function DeliveryLocationPicker({
  position = { lat: 18.5204, lng: 73.8567 },
  setPosition,
  address,
  setAddress,
  onAddressDetailsChange
}) {
  const { lang } = useLanguageStore();
  const isMr = lang === 'mr';

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isDetectingAddress, setIsDetectingAddress] = useState(false);
  const [isLocatingUser, setIsLocatingUser] = useState(false);

  // Reverse geocoding on drag end or location resolution
  const handlePerformReverseGeocode = useCallback(
    async (lat, lng) => {
      setIsDetectingAddress(true);
      try {
        const geoResult = await reverseGeocodeMappls(lat, lng);
        if (geoResult && geoResult.formatted_address) {
          setAddress(geoResult.formatted_address);

          if (onAddressDetailsChange) {
            onAddressDetailsChange((prev) => ({
              ...prev,
              pincode: geoResult.pincode || prev.pincode,
              landmark: geoResult.locality || geoResult.street || prev.landmark
            }));
          }
        }
      } catch (err) {
        console.warn('[DeliveryLocationPicker] Reverse geocode error:', err);
      } finally {
        setIsDetectingAddress(false);
      }
    },
    [setAddress, onAddressDetailsChange]
  );

  // Marker drag end callback
  const handleMarkerDragEnd = useCallback(
    (newPos) => {
      setPosition(newPos);
      handlePerformReverseGeocode(newPos.lat, newPos.lng);
    },
    [setPosition, handlePerformReverseGeocode]
  );

  // Suggestion selected callback
  const handleSelectPlace = useCallback(
    (place) => {
      const lat = parseFloat(place.lat);
      const lng = parseFloat(place.lng || place.lon);
      const newPos = { lat, lng };

      setPosition(newPos);
      setSearchQuery(place.title || place.display_name.split(',')[0]);

      if (place.display_name) {
        setAddress(place.display_name.replace('📍 ', '').replace(' (Deliver to this pin location)', ''));
      }

      if (onAddressDetailsChange) {
        onAddressDetailsChange((prev) => ({
          ...prev,
          pincode: place.pincode || prev.pincode,
          landmark: place.landmark || place.subtitle?.split(',')[0] || prev.landmark
        }));
      }

      // If needed, verify exact reverse geocode
      if (place.isCustomPin) {
        handlePerformReverseGeocode(lat, lng);
      }
    },
    [setPosition, setAddress, onAddressDetailsChange, handlePerformReverseGeocode]
  );

  // Use Current Location
  const handleUseCurrentLocation = async () => {
    setIsLocatingUser(true);
    try {
      const userPos = await getCurrentBrowserLocation();
      setPosition({ lat: userPos.lat, lng: userPos.lng });
      setSearchQuery('');
      await handlePerformReverseGeocode(userPos.lat, userPos.lng);
      toast.success(isMr ? 'आपले सध्याचे ठिकाण निश्चित झाले!' : 'Current location detected successfully!');
    } catch (err) {
      toast.error(err.message || (isMr ? 'ठिकाण मिळवता आले नाही.' : 'Could not fetch current location.'));
    } finally {
      setIsLocatingUser(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0F172A] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
      {/* Header with Title and Current Location Button */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2 font-serif">
            <MapPin className="text-[#70BF4F] dark:text-[#86EFAC] w-5 h-5" />
            {isMr ? 'नकाशावर पत्ता निश्चित करा' : 'Pin Your Delivery Location'}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isMr
              ? 'मॅपल्स (MapmyIndia) द्वारे अचूक पिनपॉइंट ट्रॅकिंग'
              : 'Interactive Mappls (MapmyIndia) live geocoding & draggable pin'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isLocatingUser}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#70BF4F] dark:text-[#86EFAC] bg-[#70BF4F]/10 dark:bg-[#70BF4F]/20 hover:bg-[#70BF4F]/20 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer border border-[#70BF4F]/20 disabled:opacity-50"
        >
          {isLocatingUser ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Navigation className="w-3.5 h-3.5" />
          )}
          {isMr ? 'सध्याचे ठिकाण वापरा' : 'Use Current Location'}
        </button>
      </div>

      {/* Autocomplete Search Bar */}
      <LocationSearch
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSelectPlace={handleSelectPlace}
        center={position}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />

      {/* Interactive Map with Draggable Pin */}
      <DeliveryMap
        position={position}
        onPositionChange={setPosition}
        onDragEnd={handleMarkerDragEnd}
        isDetectingAddress={isDetectingAddress}
      />

      {/* Detected Street Address Banner */}
      <div className="bg-[#F2F7F5] dark:bg-[#131E35] p-3.5 rounded-2xl text-xs text-gray-800 dark:text-gray-200 border border-green-200/60 dark:border-gray-700 flex items-start gap-2.5 transition-colors">
        <MapPin className="w-4 h-4 text-[#70BF4F] dark:text-[#86EFAC] flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-black text-gray-900 dark:text-white block mb-0.5">
            {isMr ? 'शोधलेला पत्ता:' : 'Detected Street:'}
          </span>
          {isDetectingAddress ? (
            <p className="text-gray-500 dark:text-gray-400 italic flex items-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin text-[#70BF4F]" />
              {isMr ? 'पत्ता लोड होत आहे...' : 'Detecting address...'}
            </p>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              {address || (isMr ? 'पत्ता निवडलेला नाही' : 'No address selected')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
