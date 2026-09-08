/**
 * Mappls (MapmyIndia) Web SDK and Location Services
 * Handles SDK loading, map initialization, draggable marker events,
 * place autocomplete with proximity ranking, reverse geocoding, and browser geolocation.
 */

import { MAHARASHTRA_LOCALITIES, expandAbbreviations } from '../utils/locationSearch';

let mapplsSdkPromise = null;

/**
 * Loads the Mappls Web Maps JavaScript SDK dynamically and idempotently.
 * @param {string} apiKey - Mappls API Key (from import.meta.env.VITE_MAPPLS_API_KEY)
 * @returns {Promise<any>} Resolves window.mappls when ready
 */
export function loadMapplsSDK(apiKey) {
  if (typeof window === 'undefined') return Promise.reject(new Error('Window not available'));

  if (window.mappls && window.mappls.Map) {
    return Promise.resolve(window.mappls);
  }

  if (mapplsSdkPromise) {
    return mapplsSdkPromise;
  }

  const key = apiKey || import.meta.env.VITE_MAPPLS_API_KEY;

  mapplsSdkPromise = new Promise((resolve, reject) => {
    // If no key is provided, resolve null gracefully to allow fallback map rendering
    if (!key || key === 'YOUR_KEY' || key.trim() === '') {
      console.warn('[Mappls] VITE_MAPPLS_API_KEY not configured. Running in fallback mode.');
      resolve(null);
      return;
    }

    const scriptId = 'mappls-web-sdk';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://apis.mappls.com/advancedmaps/api/${encodeURIComponent(key)}/map_sdk?layer=vector&v=3.0`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // Load plugins script if available
        const pluginScript = document.createElement('script');
        pluginScript.id = 'mappls-plugins-sdk';
        pluginScript.src = `https://apis.mappls.com/advancedmaps/api/${encodeURIComponent(key)}/map_sdk_plugins?v=3.0`;
        pluginScript.async = true;
        pluginScript.onload = () => {
          if (window.mappls) {
            resolve(window.mappls);
          } else {
            resolve(window.MapmyIndia || null);
          }
        };
        pluginScript.onerror = () => {
          // Plugins failed, but base SDK loaded
          resolve(window.mappls || window.MapmyIndia || null);
        };
        document.head.appendChild(pluginScript);
      };

      script.onerror = (err) => {
        console.warn('[Mappls] Failed to load Mappls SDK script from CDN:', err);
        resolve(null); // Resolve null to allow graceful fallback
      };

      document.head.appendChild(script);
    } else {
      // Script already in DOM, poll for window.mappls
      const interval = setInterval(() => {
        if (window.mappls && window.mappls.Map) {
          clearInterval(interval);
          resolve(window.mappls);
        }
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        resolve(window.mappls || null);
      }, 4000);
    }
  });

  return mapplsSdkPromise;
}

/**
 * Calculates straight line distance in km between two coordinates (Haversine formula).
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const dist = R * c;
  return dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`;
}

/**
 * Reverse geocodes coordinates into a formatted Indian street address using Mappls.
 * @param {number} lat
 * @param {number} lng
 * @param {string} [apiKey]
 * @returns {Promise<{formatted_address: string, street: string, locality: string, city: string, pincode: string, state: string}>}
 */
export async function reverseGeocodeMappls(lat, lng, apiKey) {
  const key = apiKey || import.meta.env.VITE_MAPPLS_API_KEY;

  // 1. Try Mappls SDK rev_geocode plugin if available
  if (typeof window !== 'undefined' && window.mappls && window.mappls.rev_geocode) {
    try {
      const sdkResult = await new Promise((resolve, reject) => {
        window.mappls.rev_geocode({ lat, lng }, (res) => {
          if (res && (res.formatted_address || res.results)) {
            resolve(res);
          } else {
            resolve(null);
          }
        });
        setTimeout(() => resolve(null), 2500);
      });

      if (sdkResult) {
        const item = Array.isArray(sdkResult.results) ? sdkResult.results[0] : sdkResult;
        return {
          formatted_address: item.formatted_address || item.address || '',
          street: item.street || item.poi || item.locality || '',
          locality: item.locality || item.subLocality || item.suburb || '',
          city: item.city || item.district || 'Pune',
          pincode: item.pincode || item.postcode || '',
          state: item.state || 'Maharashtra',
          lat,
          lng
        };
      }
    } catch (err) {
      console.warn('[Mappls] SDK rev_geocode error:', err);
    }
  }

  // 2. Try Mappls REST API if key exists
  if (key && key !== 'YOUR_KEY' && key.trim() !== '') {
    try {
      const res = await fetch(`https://apis.mappls.com/advancedmaps/v1/${encodeURIComponent(key)}/rev_geocode?lat=${lat}&lng=${lng}`);
      if (res.ok) {
        const data = await res.json();
        const item = data.results?.[0] || data.response?.results?.[0];
        if (item) {
          return {
            formatted_address: item.formatted_address || '',
            street: item.street || item.locality || '',
            locality: item.locality || item.subLocality || '',
            city: item.city || item.district || 'Pune',
            pincode: item.pincode || '',
            state: item.state || 'Maharashtra',
            lat,
            lng
          };
        }
      }
    } catch (err) {
      console.warn('[Mappls] REST rev_geocode error:', err);
    }
  }

  // 3. Fallback to closest local landmark and proximity descriptor
  const closest = MAHARASHTRA_LOCALITIES.reduce(
    (best, loc) => {
      const d = Math.hypot(loc.lat - lat, loc.lon - lng);
      return d < best.dist ? { loc, dist: d } : best;
    },
    { loc: MAHARASHTRA_LOCALITIES[0], dist: Infinity }
  );

  const matched = closest.loc;
  return {
    formatted_address: `${matched.name}, ${matched.landmark ? matched.landmark + ', ' : ''}${matched.suburb}, ${matched.city}, ${matched.pincode}`,
    street: matched.name,
    locality: matched.suburb,
    city: matched.city,
    pincode: matched.pincode,
    state: matched.state,
    lat,
    lng
  };
}

/**
 * Searches places with Mappls autosuggest and merges with local Maharashtra POI index.
 * Ranked by query relevance and proximity to current center.
 * @param {string} query
 * @param {{lat: number, lng: number}} center
 * @param {string} [apiKey]
 * @returns {Promise<Array<{title: string, subtitle: string, display_name: string, distance: string, lat: number, lng: number, source: string}>>}
 */
export async function searchPlacesMappls(query, center = { lat: 18.5204, lng: 73.8567 }, apiKey) {
  const clean = query?.trim() || '';
  if (clean.length < 1) return [];

  const key = apiKey || import.meta.env.VITE_MAPPLS_API_KEY;
  const expandedQuery = expandAbbreviations(clean);
  const results = [];
  const seenKeys = new Set();

  const addResult = (item) => {
    const normKey = `${item.title.toLowerCase().slice(0, 25)}-${Math.round(item.lat * 100)}-${Math.round(item.lng * 100)}`;
    if (!seenKeys.has(normKey)) {
      seenKeys.add(normKey);
      results.push(item);
    }
  };

  // 1. Instant match from comprehensive Maharashtra & Pune POI / Society database (Zomato-level precision)
  const tokens = clean.toLowerCase().split(/\s+/).filter(Boolean);
  const expandedTokens = expandedQuery.toLowerCase().split(/\s+/).filter(Boolean);

  const localRanked = MAHARASHTRA_LOCALITIES.map((loc) => {
    const text = `${loc.name} ${loc.landmark || ''} ${loc.suburb} ${loc.city} ${loc.pincode}`.toLowerCase();
    let score = 0;

    if (text.includes(clean.toLowerCase())) score += 50;
    if (text.includes(expandedQuery.toLowerCase())) score += 40;
    if (tokens.every((t) => text.includes(t))) score += 30;
    if (expandedTokens.every((t) => text.includes(t))) score += 25;
    if (tokens.some((t) => t.length >= 3 && text.includes(t))) score += 10;

    const distKmStr = calculateDistanceKm(center.lat, center.lng, loc.lat, loc.lon);
    return {
      loc,
      score,
      distance: distKmStr
    };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  for (const match of localRanked.slice(0, 6)) {
    const loc = match.loc;
    addResult({
      title: loc.name,
      subtitle: `${loc.landmark ? loc.landmark + ', ' : ''}${loc.suburb}, ${loc.city} ${loc.pincode ? '• ' + loc.pincode : ''}`,
      display_name: `${loc.name}, ${loc.suburb}, ${loc.city}`,
      distance: match.distance,
      lat: loc.lat,
      lng: loc.lon,
      pincode: loc.pincode,
      landmark: loc.landmark,
      source: 'mappls-poi'
    });
  }

  // 2. Query Mappls Autosuggest SDK or REST API if key is configured
  if (key && key !== 'YOUR_KEY' && key.trim() !== '') {
    try {
      const mapplsUrl = `https://apis.mappls.com/advancedmaps/v1/${encodeURIComponent(key)}/autosuggest?query=${encodeURIComponent(
        expandedQuery
      )}&location=${center.lat},${center.lng}&bridge=true`;

      const res = await fetch(mapplsUrl);
      if (res.ok) {
        const data = await res.json();
        const suggested = data.suggestedLocations || data.results || [];
        for (const s of suggested) {
          const sLat = parseFloat(s.latitude || s.lat);
          const sLng = parseFloat(s.longitude || s.lng || s.lon);
          if (sLat && sLng) {
            const dist = calculateDistanceKm(center.lat, center.lng, sLat, sLng);
            addResult({
              title: s.placeName || s.name || clean,
              subtitle: s.placeAddress || s.address || s.locality || 'Maharashtra, India',
              display_name: s.placeAddress ? `${s.placeName || ''}, ${s.placeAddress}` : (s.name || clean),
              distance: dist,
              lat: sLat,
              lng: sLng,
              pincode: s.pincode || '',
              source: 'mappls-api'
            });
          }
        }
      }
    } catch (err) {
      console.warn('[Mappls] Autosuggest fetch error:', err);
    }
  }

  // 3. Always include a top 1-click Pin Position action if user typed custom query
  if (!results.some((r) => r.title.toLowerCase() === clean.toLowerCase())) {
    addResult({
      title: clean,
      subtitle: `📍 Drop delivery pin for "${clean}" at map center`,
      display_name: `${clean}, Pune, Maharashtra`,
      distance: '0 m',
      lat: center.lat,
      lng: center.lng,
      isCustomPin: true,
      source: 'custom-pin'
    });
  }

  return results.slice(0, 8);
}

/**
 * Gets user's current device location via browser Geolocation API with comprehensive error handling.
 * @returns {Promise<{lat: number, lng: number}>}
 */
export function getCurrentBrowserLocation() {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        });
      },
      (err) => {
        let message = 'Unable to fetch your location.';
        if (err.code === 1) message = 'Location access permission was denied. Please enable location permissions in browser settings.';
        else if (err.code === 2) message = 'Location information is currently unavailable.';
        else if (err.code === 3) message = 'Location request timed out. Please try again.';
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      }
    );
  });
}
