import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';

/**
 * 💎 Luxury Assets Marketplace (969) - Portfolio Intelligence Context
 * Enterprise-grade Portfolio Management replacing traditional 'cart' functionality
 * 
 * Features:
 * ✅ Persistent Portfolio State (localStorage)
 * ✅ Duplicate Asset Prevention (UUID-based)
 * ✅ Real-time Valuation Calculations
 * ✅ Tax & Fee Estimations
 * ✅ Luxury Success Notifications
 * ✅ Complex State Transitions (useReducer)
 * ✅ Zero Null Property Errors
 * 
 * @version 2.0.0
 * @author 969 Luxury Engineering
 */

const PortfolioContext = createContext({});

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

// LocalStorage key
const PORTFOLIO_STORAGE_KEY = 'luxury_portfolio_969';

// Initial state
const initialState = {
  assets: [],
  totalValuation: 0,
  taxEstimate: 0,
  feeEstimate: 0,
  isCalculating: false,
  lastAddedAsset: null,
  syncStatus: 'synced' // 'synced' | 'pending' | 'error'
};

// Action types
const ACTION_TYPES = {
  ADD_ASSET: 'ADD_ASSET',
  REMOVE_ASSET: 'REMOVE_ASSET',
  CLEAR_PORTFOLIO: 'CLEAR_PORTFOLIO',
  RESTORE_PORTFOLIO: 'RESTORE_PORTFOLIO',
  UPDATE_ASSET_VALUATION: 'UPDATE_ASSET_VALUATION',
  UPDATE_VALUATIONS: 'UPDATE_VALUATIONS',
  SET_CALCULATING: 'SET_CALCULATING',
  SET_LAST_ADDED: 'SET_LAST_ADDED',
  SET_SYNC_STATUS: 'SET_SYNC_STATUS'
};

/**
 * Portfolio Reducer - Handles complex state transitions
 */
const portfolioReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_ASSET:
      // Prevent duplicate assets by unique ID
      const exists = state.assets.some(asset => asset.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          lastAddedAsset: null
        };
      }
      
      return {
        ...state,
        assets: [action.payload, ...state.assets],
        lastAddedAsset: action.payload,
        isCalculating: true
      };

    case ACTION_TYPES.REMOVE_ASSET:
      return {
        ...state,
        assets: state.assets.filter(asset => asset.id !== action.payload),
        isCalculating: true
      };

    case ACTION_TYPES.CLEAR_PORTFOLIO:
      return {
        ...initialState,
        lastAddedAsset: null
      };

    case ACTION_TYPES.RESTORE_PORTFOLIO:
      // Replace entire assets array at once from localStorage
      return {
        ...state,
        assets: action.payload || [],
        isCalculating: true
      };

    case ACTION_TYPES.UPDATE_ASSET_VALUATION:
      // Update specific asset's valuation directly without re-adding
      return {
        ...state,
        assets: state.assets.map(asset =>
          asset.id === action.payload.assetId
            ? { ...asset, fairMarketPrice: action.payload.newValuation }
            : asset
        ),
        isCalculating: true
      };

    case ACTION_TYPES.UPDATE_VALUATIONS:
      return {
        ...state,
        totalValuation: action.payload.totalValuation,
        taxEstimate: action.payload.taxEstimate,
        feeEstimate: action.payload.feeEstimate,
        isCalculating: false
      };

    case ACTION_TYPES.SET_CALCULATING:
      return {
        ...state,
        isCalculating: action.payload
      };

    case ACTION_TYPES.SET_LAST_ADDED:
      return {
        ...state,
        lastAddedAsset: action.payload
      };

    case ACTION_TYPES.SET_SYNC_STATUS:
      return {
        ...state,
        syncStatus: action.payload
      };

    default:
      return state;
  }
};

/**
 * Calculate portfolio totals with luxury tax logic
 * Uses precise rounding to avoid floating-point errors
 */
const calculatePortfolioTotals = (assets) => {
  if (!Array.isArray(assets)) return { totalValuation: 0, taxEstimate: 0, feeEstimate: 0 };

  // Use precise rounding to 2 decimal places for currency calculations
  const totalValuation = assets.reduce((sum, asset) => {
    const value = Number(asset.fairMarketPrice || asset.valuation || 0);
    const roundedValue = Math.round(value * 100) / 100; // Round to 2 decimal places
    return sum + (isNaN(roundedValue) ? 0 : roundedValue);
  }, 0);

  // Round total valuation to 2 decimal places
  const roundedTotalValuation = Math.round(totalValuation * 100) / 100;

  // Luxury tax: 8.25% for high-value portfolios - precise calculation
  const taxEstimate = Math.round((roundedTotalValuation * 0.0825) * 100) / 100;
  
  // Platform fee: 1.75% + $250k minimum for concierge service - precise calculation
  const feeCalculation = Math.round((roundedTotalValuation * 0.0175) * 100) / 100;
  const feeEstimate = Math.max(250000, feeCalculation);

  return {
    totalValuation: roundedTotalValuation,
    taxEstimate,
    feeEstimate
  };
};

/**
 * Persist portfolio to localStorage
 */
const persistPortfolio = (portfolio) => {
  try {
    localStorage.setItem(
      PORTFOLIO_STORAGE_KEY,
      JSON.stringify({
        assets: portfolio.assets,
        timestamp: Date.now()
      })
    );
  } catch (error) {
    console.error('Portfolio persistence failed:', error);
  }
};

/**
 * Portfolio Provider Component
 */
export const PortfolioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  // Load portfolio from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Data integrity validation: ensure parsed.assets is a valid array
        if (!parsed.assets || !Array.isArray(parsed.assets)) {
          console.warn('Corrupted portfolio data detected, resetting to initial state');
          dispatch({ type: ACTION_TYPES.CLEAR_PORTFOLIO });
          return;
        }

        // Restore assets only if recent (24h)
        if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          dispatch({
            type: ACTION_TYPES.RESTORE_PORTFOLIO,
            payload: parsed.assets
          });
        }
      }
    } catch (error) {
      console.error('Failed to load portfolio:', error);
      // Reset to initial state on any parsing error
      dispatch({ type: ACTION_TYPES.CLEAR_PORTFOLIO });
    }
  }, []);

  // Auto-calculate totals whenever assets change
  useEffect(() => {
    if (state.assets.length > 0) {
      const totals = calculatePortfolioTotals(state.assets);
      dispatch({
        type: ACTION_TYPES.UPDATE_VALUATIONS,
        payload: totals
      });
    } else {
      dispatch({
        type: ACTION_TYPES.UPDATE_VALUATIONS,
        payload: { totalValuation: 0, taxEstimate: 0, feeEstimate: 0 }
      });
    }
  }, [state.assets]);

  // Persist on every change
  useEffect(() => {
    persistPortfolio(state);
  }, [state.assets]);

  /**
   * 🛒 Add Asset to Portfolio (Prevents Duplicates)
   * @param {Object} asset - Luxury asset details
   * @param {string} asset.id - Unique asset identifier (UUID)
   * @param {string} asset.name - Asset display name
   * @param {number} asset.fairMarketPrice - AI-calculated value
   * @param {Object} asset.details - Make, model, condition, etc.
   * @returns {boolean} Success flag
   */
  const addAsset = useCallback((asset) => {
    if (!asset?.id) {
      console.warn('Cannot add asset without unique ID');
      return false;
    }

    dispatch({
      type: ACTION_TYPES.ADD_ASSET,
      payload: {
        ...asset,
        addedAt: new Date().toISOString()
      }
    });

    // Trigger success notification (for luxury toast)
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.SET_LAST_ADDED, payload: null });
    }, 5000);

    return true;
  }, []);

  /**
   * 🗑️ Remove Asset from Portfolio
   * @param {string} assetId - Unique asset identifier
   */
  const removeAsset = useCallback((assetId) => {
    dispatch({
      type: ACTION_TYPES.REMOVE_ASSET,
      payload: assetId
    });
  }, []);

  /**
   * 💎 Complete Portfolio Acquisition (Clear After Purchase)
   */
  const clearPortfolio = useCallback(() => {
    dispatch({ type: ACTION_TYPES.CLEAR_PORTFOLIO });
  }, []);

  /**
   * 💰 Update Asset Valuation (Real-time AI sync)
   * @param {string} assetId - Asset to update
   * @param {number} newValuation - New fair market price
   */
  const updateAssetValuation = useCallback((assetId, newValuation) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_ASSET_VALUATION,
      payload: { assetId, newValuation }
    });
  }, []);

  // Memoized computed values
  const portfolioValue = useMemo(() => ({
    totalValuation: state.totalValuation,
    taxEstimate: state.taxEstimate,
    feeEstimate: state.feeEstimate,
    grandTotal: state.totalValuation + state.taxEstimate + state.feeEstimate,
    assetCount: state.assets.length,
    averageValue: state.assets.length > 0 
      ? Math.round((state.totalValuation / state.assets.length) * 100) / 100
      : 0
  }), [state.totalValuation, state.taxEstimate, state.feeEstimate, state.assets.length]);

  // Memoized grand total formatted as currency string
  const getGrandTotal = useMemo(() => {
    const grandTotal = state.totalValuation + state.taxEstimate + state.feeEstimate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(grandTotal);
  }, [state.totalValuation, state.taxEstimate, state.feeEstimate]);

  const value = {
    // State
    portfolio: state,
    assets: state.assets || [],
    portfolioValue,
    
    // Actions
    addAsset,
    removeAsset,
    clearPortfolio,
    updateAssetValuation,
    setSyncStatus: (status) => dispatch({ type: ACTION_TYPES.SET_SYNC_STATUS, payload: status }),
    
    // Status
    hasPortfolio: state.assets.length > 0,
    isCalculating: state.isCalculating,
    lastAddedAsset: state.lastAddedAsset,
    syncStatus: state.syncStatus,
    
    // Utils
    getAssetById: (id) => state.assets.find(asset => asset.id === id),
    getGrandTotal
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContext;
