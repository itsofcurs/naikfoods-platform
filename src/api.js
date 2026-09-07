const API_URL = "/api/store";
const API_KEY = "pk_06a1ec731cd40716cbbd84986c5ff6db13f7f50b746cfbcd71b523363441e6bd";

export const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "x-publishable-api-key": API_KEY,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`API Error on ${url}:`, text);
    throw new Error(`API returned ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

export const getProducts = (queryParams = '') => fetchApi(`/products${queryParams}`);
export const getProduct = (handle) => fetchApi(`/products?handle=${handle}`);
export const getCollections = () => fetchApi('/collections');
export const searchProducts = (query) => fetchApi(`/products?q=${query}`);
