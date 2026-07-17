import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient'; // تأكد من مسار الملف

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = user?.user_metadata?.role === 'admin';
  const value = { 
  user, 
  isAuthenticated, 
  loading, 
  error, 
  login, 
  register, 
  logout, 
  isAdmin, // ضيف دي هنا عشان الـ AdminPanel يعرف مين اللي داخل
  clearError: () => setError(null) 
};

  // تحديث حالة المستخدم عند التغير (يغنينا عن checkAuth المعقدة)
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return { success: false, error: error.message };
    }
    return { success: true, user: data.user };
  }, []);

  const register = useCallback(async ({ email, password, ...metadata }) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: { data: metadata } 
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return { success: false, error: error.message };
    }
    return { success: true, user: data.user };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  }, []);

  const authValue = { user, isAuthenticated, loading, error, login, register, logout, clearError: () => setError(null) };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};