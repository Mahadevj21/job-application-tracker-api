import { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      const userData = {
        userId: response.userId,
        username: response.username,
        role: response.role,
      };
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (data) => {
    try {
      const response = await authApi.register(data);
      const userData = {
        userId: response.userId,
        username: response.username,
        role: response.role,
      };
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
