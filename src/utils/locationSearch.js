// High-performance location search engine with instant autocomplete (Zomato/Swiggy-style)

export const MAHARASHTRA_LOCALITIES = [
  // Pune Peths & Central
  { name: 'Sujata Apartment, Kasat Nagar, Pune', landmark: 'Near Shri Krishna Colony, 4th Floor', suburb: 'Kasat Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4721, lon: 73.8614 },
  { name: 'Sujata Apartment, Shri Krishna Colony Lane No 3, Pune', landmark: 'Near Ganesh Niwas', suburb: 'Kasat Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4735, lon: 73.8598 },
  { name: 'Sujata Mastani, Sadashiv Peth', landmark: 'Near Khunya Murlidhar', suburb: 'Sadashiv Peth', city: 'Pune', state: 'Maharashtra', pincode: '411030', lat: 18.5126, lon: 73.8519 },
  { name: 'Sujata Mastani, Aranyeshwar Padmavati Road', landmark: 'Aranyeshwar Park Society', suburb: 'Sahakar Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411009', lat: 18.4872, lon: 73.8546 },
  { name: 'Sujata Society, Bund Garden Road', landmark: 'Opposite Bund Garden', suburb: 'Bund Garden', city: 'Pune', state: 'Maharashtra', pincode: '411001', lat: 18.5362, lon: 73.8785 },
  { name: 'Sujata Mastani, Baner Gaon', landmark: 'Gopal Hari Deshmukh Marg', suburb: 'Baner', city: 'Pune', state: 'Maharashtra', pincode: '411045', lat: 18.5590, lon: 73.7868 },
  { name: 'Sujata Mastani, Kothrud', landmark: 'Near Karve Statue', suburb: 'Kothrud', city: 'Pune', state: 'Maharashtra', pincode: '411038', lat: 18.5074, lon: 73.8077 },
  { name: 'Sujata Mastani, Sinhagad Road', landmark: 'Manik Baug', suburb: 'Sinhagad Road', city: 'Pune', state: 'Maharashtra', pincode: '411051', lat: 18.4812, lon: 73.8298 },
  { name: 'Sujata Mastani, Shukrawar Peth', landmark: 'Ravjimama Kondhakar Path', suburb: 'Shukrawar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411002', lat: 18.5101, lon: 73.8562 },
  { name: 'Sujata Mastani, Vasant Vihar Bibvewadi', landmark: 'Prabodhankar Thakare Path', suburb: 'Bibvewadi', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4795, lon: 73.8612 },
  { name: 'SUJATA COACH PVT LTD', landmark: 'Near Swargate / Bibvewadi', suburb: 'Pune', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4750, lon: 73.8600 },

  // Pune Core Localities & Landmarks
  { name: 'Deccan Gymkhana, Pune', landmark: 'FC Road / Sambhaji Park', suburb: 'Deccan Gymkhana', city: 'Pune', state: 'Maharashtra', pincode: '411004', lat: 18.5173, lon: 73.8415 },
  { name: 'Fergusson College Road (FC Road)', landmark: 'Goodluck Chowk', suburb: 'Shivajinagar', city: 'Pune', state: 'Maharashtra', pincode: '411004', lat: 18.5236, lon: 73.8417 },
  { name: 'Jangali Maharaj Road (JM Road)', landmark: 'Sambhaji Park', suburb: 'Shivajinagar', city: 'Pune', state: 'Maharashtra', pincode: '411005', lat: 18.5284, lon: 73.8475 },
  { name: 'Shaniwar Wada, Shaniwar Peth', landmark: 'Historical Fort', suburb: 'Shaniwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411030', lat: 18.5196, lon: 73.8553 },
  { name: 'Shanipar Chowk, Sadashiv Peth', landmark: 'Mandai Link Road', suburb: 'Sadashiv Peth', city: 'Pune', state: 'Maharashtra', pincode: '411030', lat: 18.5134, lon: 73.8532 },
  { name: 'Appa Balwant Chowk (ABC)', landmark: 'Book Market', suburb: 'Budhwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411002', lat: 18.5167, lon: 73.8547 },
  { name: 'Mahatma Phule Mandai, Shukrawar Peth', landmark: 'Central Market', suburb: 'Shukrawar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411002', lat: 18.5127, lon: 73.8576 },
  { name: 'Tulshibaug, Budhwar Peth', landmark: 'Ganpati Temple', suburb: 'Budhwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411002', lat: 18.5144, lon: 73.8569 },
  { name: 'Kasba Peth, Pune', landmark: 'Kasba Ganpati', suburb: 'Kasba Peth', city: 'Pune', state: 'Maharashtra', pincode: '411011', lat: 18.5204, lon: 73.8588 },
  { name: 'Narayan Peth, Pune', landmark: 'Kesari Wada', suburb: 'Narayan Peth', city: 'Pune', state: 'Maharashtra', pincode: '411030', lat: 18.5165, lon: 73.8489 },
  { name: 'Raviwar Peth, Pune', landmark: 'Saraf Bazaar', suburb: 'Raviwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411002', lat: 18.5160, lon: 73.8610 },
  { name: 'Somwar Peth, Pune', landmark: 'Nageshwar Temple', suburb: 'Somwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411011', lat: 18.5225, lon: 73.8682 },
  { name: 'Mangalwar Peth, Pune', landmark: 'Juna Bazaar', suburb: 'Mangalwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411011', lat: 18.5255, lon: 73.8640 },
  { name: 'Guruwar Peth, Pune', landmark: 'Panchmukhi Maruti', suburb: 'Guruwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411042', lat: 18.5080, lon: 73.8605 },
  { name: 'Ganj Peth, Pune', landmark: 'Phule Wada', suburb: 'Ganj Peth', city: 'Pune', state: 'Maharashtra', pincode: '411042', lat: 18.5065, lon: 73.8660 },
  { name: 'Bhavani Peth, Pune', landmark: 'Timber Market', suburb: 'Bhavani Peth', city: 'Pune', state: 'Maharashtra', pincode: '411042', lat: 18.5085, lon: 73.8710 },
  { name: 'Nana Peth, Pune', landmark: 'Quarter Gate', suburb: 'Nana Peth', city: 'Pune', state: 'Maharashtra', pincode: '411002', lat: 18.5135, lon: 73.8695 },
  { name: 'Rasta Peth, Pune', landmark: 'Power House', suburb: 'Rasta Peth', city: 'Pune', state: 'Maharashtra', pincode: '411011', lat: 18.5185, lon: 73.8715 },

  // Pune Suburbs & IT Hubs
  { name: 'Kothrud, Karve Road, Pune', landmark: 'Near Karve Statue / Vanaz', suburb: 'Kothrud', city: 'Pune', state: 'Maharashtra', pincode: '411038', lat: 18.5074, lon: 73.8077 },
  { name: 'Kothrud, Paud Road, Pune', landmark: 'Near MIT College', suburb: 'Kothrud', city: 'Pune', state: 'Maharashtra', pincode: '411038', lat: 18.5120, lon: 73.8050 },
  { name: 'Karve Nagar, Pune', landmark: 'Cummins College Road', suburb: 'Karve Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411052', lat: 18.4912, lon: 73.8198 },
  { name: 'Warje, Mumbai-Bangalore Highway', landmark: 'Warje Flyover', suburb: 'Warje', city: 'Pune', state: 'Maharashtra', pincode: '411058', lat: 18.4785, lon: 73.7990 },
  { name: 'Baner High Street, Pune', landmark: 'Near Balewadi Phata', suburb: 'Baner', city: 'Pune', state: 'Maharashtra', pincode: '411045', lat: 18.5590, lon: 73.7868 },
  { name: 'Balewadi, Pune', landmark: 'Balewadi Sports Complex / High Street', suburb: 'Balewadi', city: 'Pune', state: 'Maharashtra', pincode: '411045', lat: 18.5750, lon: 73.7745 },
  { name: 'Aundh, Parihar Chowk, Pune', landmark: 'Westend Mall', suburb: 'Aundh', city: 'Pune', state: 'Maharashtra', pincode: '411007', lat: 18.5602, lon: 73.8077 },
  { name: 'Pashan, Pune', landmark: 'Pashan Lake / Circle', suburb: 'Pashan', city: 'Pune', state: 'Maharashtra', pincode: '411021', lat: 18.5420, lon: 73.7950 },
  { name: 'Bavdhan, Pune', landmark: 'Chandani Chowk', suburb: 'Bavdhan', city: 'Pune', state: 'Maharashtra', pincode: '411021', lat: 18.5150, lon: 73.7750 },
  { name: 'Viman Nagar, Phoenix Marketcity, Pune', landmark: 'Near Symbiosis College', suburb: 'Viman Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411014', lat: 18.5679, lon: 73.9143 },
  { name: 'Kalyani Nagar, Pune', landmark: 'Bishop School / Jogger Park', suburb: 'Kalyani Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411006', lat: 18.5480, lon: 73.9025 },
  { name: 'Koregaon Park, North Main Road, Pune', landmark: 'Osho Ashram / German Bakery', suburb: 'Koregaon Park', city: 'Pune', state: 'Maharashtra', pincode: '411001', lat: 18.5362, lon: 73.8940 },
  { name: 'Magarpatta City, Hadapsar, Pune', landmark: 'Cybercity / Destination Centre', suburb: 'Hadapsar', city: 'Pune', state: 'Maharashtra', pincode: '411028', lat: 18.5144, lon: 73.9298 },
  { name: 'Amanora Park Town, Hadapsar, Pune', landmark: 'Amanora Mall', suburb: 'Hadapsar', city: 'Pune', state: 'Maharashtra', pincode: '411028', lat: 18.5180, lon: 73.9350 },
  { name: 'Kharadi, EON Free Zone, Pune', landmark: 'World Trade Center', suburb: 'Kharadi', city: 'Pune', state: 'Maharashtra', pincode: '411014', lat: 18.5520, lon: 73.9520 },
  { name: 'Hinjawadi Phase 1, Rajiv Gandhi Infotech Park', landmark: 'Shivaji Chowk', suburb: 'Hinjawadi', city: 'Pune', state: 'Maharashtra', pincode: '411057', lat: 18.5913, lon: 73.7389 },
  { name: 'Hinjawadi Phase 2, Pune', landmark: 'Wipro Circle', suburb: 'Hinjawadi', city: 'Pune', state: 'Maharashtra', pincode: '411057', lat: 18.5980, lon: 73.7250 },
  { name: 'Hinjawadi Phase 3, Pune', landmark: 'Megapolis / Tech Mahindra', suburb: 'Hinjawadi', city: 'Pune', state: 'Maharashtra', pincode: '411057', lat: 18.5870, lon: 73.7020 },
  { name: 'Wakad, Dutta Mandir Road, Pune', landmark: 'Near Ginger Hotel', suburb: 'Wakad', city: 'Pune', state: 'Maharashtra', pincode: '411057', lat: 18.5987, lon: 73.7686 },
  { name: 'Pimple Saudagar, Kunal Icon Road, Pune', landmark: 'Near Govind Garden', suburb: 'Pimple Saudagar', city: 'Pune', state: 'Maharashtra', pincode: '411027', lat: 18.5987, lon: 73.7998 },
  { name: 'Pimple Nilakh, Pune', landmark: 'DP Road', suburb: 'Pimple Nilakh', city: 'Pune', state: 'Maharashtra', pincode: '411027', lat: 18.5800, lon: 73.7900 },
  { name: 'Pimpri Chinchwad, Pune', landmark: 'Finolex Chowk / Dr. D.Y. Patil', suburb: 'Pimpri', city: 'Pune', state: 'Maharashtra', pincode: '411018', lat: 18.6270, lon: 73.8000 },
  { name: 'Nigdi, Pradhikaran, Pune', landmark: 'Bhakti Shakti Chowk', suburb: 'Nigdi', city: 'Pune', state: 'Maharashtra', pincode: '411044', lat: 18.6550, lon: 73.7750 },
  { name: 'Swargate, Pune', landmark: 'Jedhe Chowk / ST Stand', suburb: 'Swargate', city: 'Pune', state: 'Maharashtra', pincode: '411042', lat: 18.5018, lon: 73.8636 },
  { name: 'Bibvewadi, Pune', landmark: 'Vasant Vihar / Chintamani Ganpati', suburb: 'Bibvewadi', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4795, lon: 73.8612 },
  { name: 'Katraj, Pune', landmark: 'Katraj Snake Park & Zoo', suburb: 'Katraj', city: 'Pune', state: 'Maharashtra', pincode: '411046', lat: 18.4529, lon: 73.8553 },
  { name: 'Dhankawadi, Pune', landmark: 'Bharati Vidyapeeth Campus', suburb: 'Dhankawadi', city: 'Pune', state: 'Maharashtra', pincode: '411043', lat: 18.4600, lon: 73.8550 },
  { name: 'Sahakar Nagar, Pune', landmark: 'Taljai Hills Foot', suburb: 'Sahakar Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411009', lat: 18.4872, lon: 73.8546 },
  { name: 'Padmavati, Pune', landmark: 'Padmavati Mandir', suburb: 'Padmavati', city: 'Pune', state: 'Maharashtra', pincode: '411009', lat: 18.4800, lon: 73.8580 },
  { name: 'Sinhagad Road, Manik Baug, Pune', landmark: 'Near Abhiruchi Mall', suburb: 'Sinhagad Road', city: 'Pune', state: 'Maharashtra', pincode: '411051', lat: 18.4812, lon: 73.8298 },
  { name: 'Dhayari, Pune', landmark: 'Dhayari Phata / DSK Vishwa', suburb: 'Dhayari', city: 'Pune', state: 'Maharashtra', pincode: '411041', lat: 18.4500, lon: 73.8150 },
  { name: 'Camp, MG Road, Pune', landmark: 'Aurora Towers / SGS Mall', suburb: 'Camp', city: 'Pune', state: 'Maharashtra', pincode: '411001', lat: 18.5186, lon: 73.8785 },
  { name: 'Pune Railway Station', landmark: 'Main Station Entrance', suburb: 'Agarkar Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411001', lat: 18.5289, lon: 73.8744 },
  { name: 'Pune Airport (PNQ), Lohegaon', landmark: 'Departure Terminal', suburb: 'Lohegaon', city: 'Pune', state: 'Maharashtra', pincode: '411032', lat: 18.5822, lon: 73.9197 }
];

// Common abbreviation expansions
const ABBREVIATIONS = {
  apa: 'apartment',
  apt: 'apartment',
  apts: 'apartments',
  soc: 'society',
  socy: 'society',
  bldg: 'building',
  bldng: 'building',
  rd: 'road',
  st: 'street',
  nr: 'near',
  opp: 'opposite',
  ngr: 'nagar',
  ng: 'nagar',
  col: 'colony',
  clny: 'colony',
  hsg: 'housing',
  stn: 'station',
  chwk: 'chowk',
  chauk: 'chowk',
  mrg: 'marg',
  gln: 'galli',
  flt: 'flat'
};

export function expandAbbreviations(query) {
  if (!query) return '';
  return query
    .trim()
    .split(/\s+/)
    .map((w) => ABBREVIATIONS[w.toLowerCase()] || w)
    .join(' ');
}

// Synchronous Instant Search (0ms for every keystroke)
export function searchLocalLocations(query) {
  const clean = query.toLowerCase().trim();
  if (!clean || clean.length < 1) return [];

  const tokens = clean.split(/\s+/).filter(Boolean);
  const expandedQuery = expandAbbreviations(clean).toLowerCase();
  const expandedTokens = expandedQuery.split(/\s+/).filter(Boolean);

  return MAHARASHTRA_LOCALITIES.filter((loc) => {
    const haystack = `${loc.name} ${loc.landmark || ''} ${loc.suburb || ''} ${loc.city || ''} ${loc.pincode || ''}`.toLowerCase();
    
    // Direct string match
    if (haystack.includes(clean) || haystack.includes(expandedQuery)) return true;

    // Token match
    const matchesAllTokens = tokens.every((t) => haystack.includes(t));
    if (matchesAllTokens) return true;

    const matchesAllExpandedTokens = expandedTokens.every((t) => haystack.includes(t));
    if (matchesAllExpandedTokens) return true;

    // Partial prefix match
    const matchesAnySignificant = tokens.some((t) => t.length >= 3 && haystack.includes(t));
    if (matchesAnySignificant) return true;

    return false;
  }).slice(0, 8);
}

// Full Hybrid Autocomplete (Local 0ms + Online Photon / Nominatim Fallbacks)
export async function searchLocationsHybrid(query, currentPos = { lat: 18.5204, lng: 73.8567 }) {
  const clean = query.trim();
  if (!clean) return [];

  // 1. Instant local indexed items
  const localMatches = searchLocalLocations(clean).map((loc) => ({
    display_name: `${loc.name}, ${loc.landmark ? loc.landmark + ', ' : ''}${loc.suburb}, ${loc.city}, ${loc.pincode}`,
    lat: loc.lat,
    lon: loc.lon,
    title: loc.name,
    subtitle: `${loc.landmark ? loc.landmark + ', ' : ''}${loc.suburb}, ${loc.city}`,
    address: {
      postcode: loc.pincode,
      suburb: loc.suburb,
      city: loc.city,
      state: loc.state,
      road: loc.name
    },
    source: 'local'
  }));

  // 2. Fetch live geocoder with expansion & Pune proximity
  let apiMatches = [];
  const expanded = expandAbbreviations(clean);
  const searchQueries = [
    expanded,
    clean,
    `${expanded}, Pune`,
    `${clean.split(/\s+/)[0]}, Pune`
  ];

  for (const q of searchQueries) {
    if (apiMatches.length >= 6) break;

    try {
      const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(
        q
      )}&lat=${currentPos.lat || 18.5204}&lon=${currentPos.lng || 73.8567}&limit=6&lang=en`;
      const res = await fetch(photonUrl);
      if (res.ok) {
        const data = await res.json();
        if (data?.features?.length > 0) {
          const formatted = data.features
            .filter((f) => f.properties.country === 'India' || !f.properties.country)
            .map((f) => {
              const props = f.properties || {};
              const title = props.name || props.street || clean;
              const subtitle = [props.street !== title ? props.street : null, props.district || props.suburb, props.city, props.state].filter(Boolean).join(', ');
              const full = [title, subtitle].filter(Boolean).join(', ');
              return {
                display_name: full,
                title,
                subtitle: subtitle || 'India',
                lat: f.geometry.coordinates[1],
                lon: f.geometry.coordinates[0],
                address: {
                  postcode: props.postcode,
                  city: props.city,
                  state: props.state,
                  road: props.street || props.name,
                  suburb: props.district || props.suburb
                },
                source: 'photon'
              };
            });
          apiMatches = [...apiMatches, ...formatted];
        }
      }
    } catch {}
  }

  // Deduplicate by name & proximity
  const combined = [...localMatches, ...apiMatches];
  const seen = new Set();
  const deduped = [];

  for (const item of combined) {
    const key = `${item.title.toLowerCase()}-${Math.round(item.lat * 100)}-${Math.round(item.lon * 100)}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(item);
    }
  }

  // 3. Pinpoint option if no exact full matches
  if (!deduped.some((d) => d.title.toLowerCase() === clean.toLowerCase())) {
    deduped.push({
      display_name: `${clean} (Deliver to this pin location)`,
      title: clean,
      subtitle: `📍 Drop delivery pin at current map position`,
      lat: currentPos.lat || 18.5204,
      lon: currentPos.lng || 73.8567,
      address: { road: clean, city: 'Pune', state: 'Maharashtra' },
      isCustomPin: true
    });
  }

  return deduped.slice(0, 8);
}
