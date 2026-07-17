import { db } from './firebase.js';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc,
  query,
  limit,
  orderBy
} from 'firebase/firestore';

// ============================================================================
// CACHE CONFIGURATION
// ============================================================================

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

// ============================================================================
// CACHE HELPERS
// ============================================================================

const getFromCache = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCache = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

const clearCache = () => {
  cache.clear();
};

// ============================================================================
// PRODUCT SERVICE
// ============================================================================

/**
 * Fetch all products from Firestore
 * @returns {Promise<Array>} Array of product objects
 */
export const getAllProducts = async () => {
  try {
    // Check cache first
    const cached = getFromCache('all_products');
    if (cached) {
      return cached;
    }

    const productsRef = collection(db, 'products');
    const q = query(
      productsRef,
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Cache the results
    setCache('all_products', products);

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
};

/**
 * Fetch a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProductById = async (id) => {
  try {
    // Check cache first
    const cached = getFromCache(`product_${id}`);
    if (cached) {
      return cached;
    }

    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const product = {
        id: docSnap.id,
        ...docSnap.data(),
      };

      // Cache the result
      setCache(`product_${id}`, product);

      return product;
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product. Please try again later.');
  }
};

/**
 * Fetch products by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of product objects
 */
export const getProductsByCategory = async (category) => {
  try {
    const cacheKey = `category_${category}`;
    const cached = getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    const productsRef = collection(db, 'products');
    const q = query(
      productsRef,
      orderBy('createdAt', 'desc'),
      limit(20)
    );
    
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      const productData = doc.data();
      if (productData.category === category) {
        products.push({
          id: doc.id,
          ...productData,
        });
      }
    });

    // Cache the results
    setCache(cacheKey, products);

    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
};

/**
 * Search products by query
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Array of matching product objects
 */
export const searchProducts = async (searchTerm) => {
  try {
    const products = await getAllProducts();
    
    const filtered = products.filter((product) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        product.name?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.category?.toLowerCase().includes(searchLower) ||
        product.brand?.toLowerCase().includes(searchLower)
      );
    });

    return filtered;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Failed to search products. Please try again later.');
  }
};

// ============================================================================
// EXPORT CACHE UTILITIES
// ============================================================================

export { clearCache };