import fallbackProductsData from './data/fallbackProducts.json';
import fallbackCollectionsData from './data/fallbackCollections.json';

const API_URL = "/api/store";
const API_KEY = "pk_06a1ec731cd40716cbbd84986c5ff6db13f7f50b746cfbcd71b523363441e6bd";

export const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "x-publishable-api-key": API_KEY,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("application/json")) {
      console.warn(`API returned ${response.status} or non-JSON content type for ${url}. Using resilient fallback data.`);
      return getFallbackResponse(endpoint);
    }

    return await response.json();
  } catch (err) {
    console.warn(`Network/API error on ${url}:`, err.message, `. Using resilient fallback data.`);
    return getFallbackResponse(endpoint);
  }
};

function getFallbackResponse(endpoint) {
  const urlParams = endpoint.split('?')[1] || '';
  const searchParams = new URLSearchParams(urlParams);

  if (endpoint.startsWith('/collections')) {
    return fallbackCollectionsData;
  }

  if (endpoint.startsWith('/products')) {
    const handle = searchParams.get('handle');
    const query = searchParams.get('q');

    let prods = fallbackProductsData.products || [];

    if (handle) {
      const match = prods.filter(p => p.handle === handle || p.id === handle);
      return { products: match.length > 0 ? match : prods.slice(0, 1) };
    }

    if (query) {
      const q = query.toLowerCase();
      prods = prods.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.value?.toLowerCase().includes(q))
      );
    }

    const limit = parseInt(searchParams.get('limit') || '200', 10);
    return {
      products: prods.slice(0, limit),
      count: prods.length,
      offset: 0,
      limit: limit
    };
  }

  return { products: fallbackProductsData.products || [] };
}

export const getProducts = (queryParams = '') => fetchApi(`/products${queryParams}`);
export const getProduct = (handle) => fetchApi(`/products?handle=${handle}`);
export const getCollections = () => fetchApi('/collections');
export const searchProducts = (query) => fetchApi(`/products?q=${encodeURIComponent(query)}`);
