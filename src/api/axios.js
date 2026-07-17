// api/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * Enterprise-grade Axios Configuration for Luxury Assets Marketplace (969)
 * 
 * Features:
 * ✅ BaseURL from environment variables
 * ✅ Automatic Bearer token attachment
 * ✅ Global 401 handling with token refresh
 * ✅ Comprehensive error handling
 * ✅ Request/Response logging (development only)
 * ✅ Timeout & retry logic
 * ✅ Modular & extensible
 * 
 * @version 2.1.0
 * @author Luxury Assets Engineering Team
 */

// Configuration
const config = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Token management
const TOKEN_KEY = 'luxury_auth_token';
const REFRESH_TOKEN_KEY = 'luxury_refresh_token';

// Create axios instance
const api = axios.create(config);

// Track requests to prevent infinite loops during refresh
let isRefreshing = false;
let failedQueue = [];

/**
 * Process queued requests after token refresh
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

/**
 * Request Interceptor - Automatically attach Bearer token
 */
api.interceptors.request.use(
  (config) => {
    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.log('🌐 API Request:', config.method?.toUpperCase(), config.url);
    }

    // Attach token if available
    const token = Cookies.get(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Attach refresh token for specific endpoints
    if (config.url?.includes('/refresh') || config.url?.includes('/logout')) {
      const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        config.headers['X-Refresh-Token'] = refreshToken;
      }
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor - Global error handling & token refresh
 */
api.interceptors.response.use(
  (response) => {
    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', response.status, response.config.url);
    }
    
    return response;
  },
  
  async (error) => {
    const originalRequest = error.config;
    
    // Development error logging
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.response?.data?.message || error.message
      });
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        ...error,
        message: 'Network error. Please check your connection.'
      });
    }

    const { status } = error.response;

    // 401 Unauthorized - Token refresh logic
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Attempt token refresh
        const refreshResponse = await axios.post(`${config.baseURL}/auth/refresh`, {
          refreshToken
        }, {
          headers: { 'Content-Type': 'application/json' }
        });

        const { accessToken: newToken, refreshToken: newRefreshToken } = refreshResponse.data;

        // Update tokens
        Cookies.set(TOKEN_KEY, newToken, { 
          expires: 1/24, // 1 hour
          secure: true,
          sameSite: 'strict'
        });

        Cookies.set(REFRESH_TOKEN_KEY, newRefreshToken, {
          expires: 7, // 7 days
          secure: true,
          sameSite: 'strict'
        });

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        
        return api(originalRequest);

      } catch (refreshError) {
        // Refresh failed - logout user
        processQueue(refreshError, null);
        
        // Clear all tokens
        Cookies.remove(TOKEN_KEY);
        Cookies.remove(REFRESH_TOKEN_KEY);
        
        // Redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login?session=expired';
        }
        
        return Promise.reject({
          ...refreshError,
          message: 'Session expired. Please log in again.'
        });
      } finally {
        isRefreshing = false;
      }
    }

    // 403 Forbidden - User lacks permissions
    if (status === 403) {
      return Promise.reject({
        ...error,
        message: 'You do not have permission to perform this action.'
      });
    }

    // 404 Not Found
    if (status === 404) {
      return Promise.reject({
        ...error,
        message: 'Resource not found.'
      });
    }

    // 429 Rate Limited
    if (status === 429) {
      return Promise.reject({
        ...error,
        message: 'Too many requests. Please try again later.'
      });
    }

    // Default error handling
    return Promise.reject({
      ...error,
      message: error.response?.data?.message || 'An unexpected error occurred.'
    });
  }
);

/**
 * Custom method to clear auth state
 */
api.clearAuth = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

/**
 * Health check endpoint
 */
api.healthCheck = () => api.get('/health');

/**
 * Set custom headers for specific requests
 */
api.setHeader = (key, value) => {
  api.defaults.headers.common[key] = value;
};

export default api;