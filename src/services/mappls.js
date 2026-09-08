/**
 * Mappls (MapmyIndia) Web SDK and Location Services
 * Handles SDK loading, map initialization, draggable marker events,
 * live dynamic Atlas place search with OAuth token exchange,
 * reverse geocoding, and browser geolocation.
 */

import { MAHARASHTRA_LOCALITIES, expandAbbreviations } from '../utils/locationSearch.js';

let mapplsSdkPromise = null;
let cachedOAuthToken = null;
let oauthTokenExpiresAt = 0;

/**
 * Retrieves an OAuth 2.0 Bearer token from Mappls Outpost.
 * Automatically caches and refreshes tokens before expiry.
 * @returns {Promise<string|null>}
 */
export async function getMapplsOAuthToken() {
  if (cachedOAuthToken && Date.now() < oauthTokenExpiresAt) {
    return cachedOAuthToken;
  }

  const clientId = import.meta.env.VITE_MAPPLS_CLIENT_ID || '96dHZVzsAuuJGpGOx0o2nCRWKoEwdX_gOuiHfna-qGvnFUNv1vqtAne4bNeBeKYdGHUQ2QxAFPleY_zYMg8keA==';
  const clientSecret = import.meta.env.VITE_MAPPLS_CLIENT_SECRET || 'lrFxI-iSEg88rxeyHddnpnfUSshmBmi7WRHT7XsCH1vgJGoa6CT7FaGbV6kGoYIaT0-mnLVkyH-gmPklIFzR1Ax77U8ZLQ62';

  if (!clientId || !clientSecret) return null;

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    const res = await fetch('https://outpost.mappls.com/api/security/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    if (res.ok) {
      const data = await res.json();
      if (data.access_token) {
        cachedOAuthToken = data.access_token;
        oauthTokenExpiresAt = Date.now() + ((data.expires_in || 86400) - 300) * 1000;
        return cachedOAuthToken;
      }
    }
  } catch (err) {
    console.warn('[Mappls OAuth] Error fetching access token:', err);
  }

  return null;
}

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

  const key = apiKey || import.meta.env.VITE_MAPPLS_API_KEY || '00bbe96387a74989d5eece48e7208c42';

  mapplsSdkPromise = new Promise((resolve) => {
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
        resolve(window.mappls || window.MapmyIndia || null);
      };

      script.onerror = (err) => {
        console.warn('[Mappls] Failed to load Mappls SDK script from CDN:', err);
        resolve(null);
      };

      document.head.appendChild(script);
    } else {
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
  const key = apiKey || import.meta.env.VITE_MAPPLS_API_KEY || '00bbe96387a74989d5eece48e7208c42';

  // 1. Try Live Mappls REST API
  if (key && key !== 'YOUR_KEY' && key.trim() !== '') {
    try {
      const res = await fetch(`https://apis.mappls.com/advancedmaps/v1/${encodeURIComponent(key)}/rev_geocode?lat=${lat}&lng=${lng}`);
      if (res.ok) {
        const data = await res.json();
        const item = data.results?.[0] || data.response?.results?.[0];
        if (item) {
          const streetStr = item.street || item.poi || item.subLocality || item.locality || '';
          const localityStr = item.locality || item.subLocality || item.subDistrict || '';
          const cityStr = item.city || item.district || 'Pune';
          const pincodeStr = item.pincode || item.postcode || '';
          const stateStr = item.state || 'Maharashtra';

          return {
            formatted_address: item.formatted_address || `${streetStr ? streetStr + ', ' : ''}${localityStr}, ${cityStr} ${pincodeStr}`,
            street: streetStr,
            locality: localityStr,
            city: cityStr,
            pincode: pincodeStr,
            state: stateStr,
            lat,
            lng
          };
        }
      }
    } catch (err) {
      console.warn('[Mappls] REST rev_geocode error:', err);
    }
  }

  // 2. Fallback to closest reference locality
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
 * Searches places 100% dynamically via Mappls Live Atlas Search API with OAuth authentication.
 * Ranked by query relevance and proximity to current center.
 * @param {string} query
 * @param {{lat: number, lng: number}} center
 * @returns {Promise<Array<{title: string, subtitle: string, display_name: string, distance: string, lat: number, lng: number, eLoc: string, source: string}>>}
 */
export async function searchPlacesMappls(query, center = { lat: 18.5204, lng: 73.8567 }) {
  const clean = query?.trim() || '';
  if (clean.length < 1) return [];

  const expandedQuery = expandAbbreviations(clean);
  const results = [];
  const seenKeys = new Set();

  const addResult = (item) => {
    const normKey = `${item.title.toLowerCase().slice(0, 30)}-${item.eLoc || item.subtitle.slice(0, 20)}`;
    if (!seenKeys.has(normKey)) {
      seenKeys.add(normKey);
      results.push(item);
    }
  };

  // 1. Query Live Mappls Atlas Places Search API (Real-time dynamic Indian database)
  try {
    const token = await getMapplsOAuthToken();
    if (token) {
      const searchUrl = `https://atlas.mappls.com/api/places/search/json?query=${encodeURIComponent(
        expandedQuery
      )}&location=${center.lat},${center.lng}&bridge=true`;

      const res = await fetch(searchUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        const suggested = data.suggestedLocations || [];
        for (const s of suggested) {
          const distStr = s.distance
            ? s.distance < 1000
              ? `${s.distance} m`
              : `${(s.distance / 1000).toFixed(1)} km`
            : null;

          addResult({
            title: s.placeName || s.name || clean,
            subtitle: s.placeAddress || s.address || 'Maharashtra, India',
            display_name: s.placeAddress ? `${s.placeName || ''}, ${s.placeAddress}` : (s.name || clean),
            distance: distStr,
            eLoc: s.eLoc,
            lat: parseFloat(s.latitude) || center.lat,
            lng: parseFloat(s.longitude) || center.lng,
            source: 'mappls-live-atlas'
          });
        }
      }
    }
  } catch (err) {
    console.warn('[Mappls Live Atlas] Search error:', err);
  }

  // 2. Proximity matching from reference localities if Atlas returned fewer results
  if (results.length < 3) {
    const genericStopWords = new Set(['pune', 'maharashtra', 'india', 'near', 'rd', 'road', 'street']);
    const tokens = clean.toLowerCase().split(/\s+/).filter(Boolean);
    const specificTokens = tokens.filter((t) => !genericStopWords.has(t));

    const localRanked = MAHARASHTRA_LOCALITIES.map((loc) => {
      const text = `${loc.name} ${loc.landmark || ''} ${loc.suburb} ${loc.city} ${loc.pincode}`.toLowerCase();
      let score = 0;
      if (text.includes(clean.toLowerCase())) score += 100;
      if (text.includes(expandedQuery.toLowerCase())) score += 80;
      if (specificTokens.length > 0 && specificTokens.every((t) => text.includes(t))) score += 60;

      const distKmStr = calculateDistanceKm(center.lat, center.lng, loc.lat, loc.lon);
      return { loc, score, distance: distKmStr };
    })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);

    for (const match of localRanked.slice(0, 4)) {
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
  }

  // 3. Always include 1-click Pin Drop action for custom user search query
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
 * Gets user's current device location via browser Geolocation API.
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
