'use client';

import { Provider } from "react-redux";
import { createContext, useContext, useState, ReactNode } from "react";
import { AuthUser } from "../types";
import { store } from "../store/store";

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    // Check if we have a stored user in localStorage
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email: string, password: string) => {
    // Mock authentication - you should replace this with real authentication
    if (email === 'admin@example.com' && password === 'admin123') {
      const user = {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
      };
      setUser(user);
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    // Clear user from localStorage
    localStorage.removeItem('user');
  };

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          user,
          login,
          logout,
          isAuthenticated: !!user,
        }}
      >
        {children}
      </AuthContext.Provider>
    </Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 