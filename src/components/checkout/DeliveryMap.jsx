import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { loadMapplsSDK } from '../../services/mappls';
import { useLanguageStore } from '../../store/languageStore';

export default function DeliveryMap({
  position = { lat: 18.5204, lng: 73.8567 },
  onPositionChange,
  onDragEnd,
  isDetectingAddress
}) {
  const { lang } = useLanguageStore();
  const isMr = lang === 'mr';

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerInstanceRef = useRef(null);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [sdkError, setSdkError] = useState(false);

  // Initialize Mappls Map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      try {
        const mappls = await loadMapplsSDK();

        if (!isMounted) return;

        if (mappls && mappls.Map && mapContainerRef.current) {
          // Initialize Mappls Map instance
          if (!mapInstanceRef.current) {
            const mapObj = new mappls.Map(mapContainerRef.current, {
              center: [position.lat, position.lng],
              zoom: 16,
              zoomControl: true,
              hybrid: false,
              location: false,
              search: false
            });

            mapInstanceRef.current = mapObj;

            // Add Draggable Marker if marker plugin supported
            if (mappls.Marker) {
              const markerObj = new mappls.Marker({
                map: mapObj,
                position: { lat: position.lat, lng: position.lng },
                draggable: true,
                fitbounds: false
              });

              markerObj.addListener('dragend', () => {
                const pos = markerObj.getPosition();
                const lat = typeof pos.lat === 'function' ? pos.lat() : pos.lat;
                const lng = typeof pos.lng === 'function' ? pos.lng() : (pos.lng || pos.lon);
                if (lat && lng && onDragEnd) {
                  onDragEnd({ lat, lng });
                }
              });

              markerInstanceRef.current = markerObj;
            }

            // Map pan/drag end listener
            if (mapObj.addListener) {
              mapObj.addListener('dragend', () => {
                if (mapObj.getCenter) {
                  const center = mapObj.getCenter();
                  const lat = typeof center.lat === 'function' ? center.lat() : (center.lat || center[0]);
                  const lng = typeof center.lng === 'function' ? center.lng() : (center.lng || center[1]);
                  if (lat && lng && onDragEnd) {
                    onDragEnd({ lat, lng });
                  }
                }
              });
            }
          }

          setIsSdkLoaded(true);
        } else {
          // Fallback map mode (clean interactive canvas)
          setIsSdkLoaded(true);
        }
      } catch (err) {
        console.warn('[DeliveryMap] Mappls map init notice:', err);
        if (isMounted) {
          setSdkError(true);
          setIsSdkLoaded(true);
        }
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current && mapInstanceRef.current.remove) {
        try {
          mapInstanceRef.current.remove();
        } catch {}
      }
      mapInstanceRef.current = null;
      markerInstanceRef.current = null;
    };
  }, []);

  // Synchronize map center and marker when position changes externally
  useEffect(() => {
    if (mapInstanceRef.current && position?.lat && position?.lng) {
      try {
        if (mapInstanceRef.current.setCenter) {
          mapInstanceRef.current.setCenter([position.lat, position.lng]);
        } else if (mapInstanceRef.current.panTo) {
          mapInstanceRef.current.panTo([position.lat, position.lng]);
        }

        if (markerInstanceRef.current && markerInstanceRef.current.setPosition) {
          markerInstanceRef.current.setPosition({ lat: position.lat, lng: position.lng });
        }
      } catch (err) {
        console.warn('[DeliveryMap] Position update error:', err);
      }
    }
  }, [position.lat, position.lng]);

  return (
    <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden relative z-0 mb-4 border border-gray-200 dark:border-gray-700 shadow-inner bg-gray-100 dark:bg-[#131E35]">
      {/* Map Canvas Mount Element */}
      <div ref={mapContainerRef} className="w-full h-full" id="mappls-map-canvas" />

      {/* Center Interactive Pin Indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-[1000] pointer-events-none flex flex-col items-center">
        <div className="bg-[#161915] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-lg mb-1 whitespace-nowrap border border-white/20 flex items-center gap-1">
          {isDetectingAddress ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin text-[#70BF4F]" />
              <span>{isMr ? 'पत्ता तपासत आहे...' : 'Detecting address...'}</span>
            </>
          ) : (
            <span>{isMr ? 'येथे डिलिव्हरी करा 📍' : 'Deliver Here 📍'}</span>
          )}
        </div>
        <MapPin className="w-9 h-9 text-[#EB001B] fill-[#EB001B] drop-shadow-lg animate-bounce-short" />
      </div>

      {/* Loading Skeleton */}
      {!isSdkLoaded && (
        <div className="absolute inset-0 bg-gray-100/90 dark:bg-[#131E35]/90 flex flex-col items-center justify-center z-10 gap-2">
          <Loader2 className="w-6 h-6 text-[#70BF4F] animate-spin" />
          <p className="text-xs font-bold text-gray-600 dark:text-gray-300">
            {isMr ? 'मॅप सुरू होत आहे...' : 'Loading Mappls Map...'}
          </p>
        </div>
      )}
    </div>
  );
}
