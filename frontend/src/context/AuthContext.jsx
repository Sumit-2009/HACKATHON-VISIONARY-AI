import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/client';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: "USR-01",
  name: "Priya Shah",
  email: "priya.shah@flowmind.ai",
  role: "Lead People Operations",
  department: "Human Resources",
  avatarInitials: "PS"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('flowmind_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });
  const [token, setToken] = useState(() => localStorage.getItem('flowmind_token') || 'demo-token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('flowmind_user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('flowmind_token', res.data.token);
      localStorage.setItem('flowmind_user', JSON.stringify(res.data.user));
      return { success: true };
    } catch (err) {
      // Fallback demo user
      const demo = { ...DEFAULT_USER, email: email || DEFAULT_USER.email };
      setUser(demo);
      localStorage.setItem('flowmind_user', JSON.stringify(demo));
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('flowmind_token');
    localStorage.removeItem('flowmind_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
