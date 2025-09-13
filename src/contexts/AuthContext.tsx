import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup, signInWithRedirect, getRedirectResult, signOut, User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    // Handle redirect results (e.g., on mobile or when popup blocked)
    getRedirectResult(auth).catch(() => {/* ignore if none */});

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      // Prefer popup on large screens; fallback to redirect on small screens or when popup fails
      const isSmallScreen = typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches;
      if (isSmallScreen) {
        await signInWithRedirect(auth, provider);
        return;
      }
      await signInWithPopup(auth, provider);
    } catch (error) {
      // Fallback to redirect if popup blocked or COOP/COEP prevents closing
      try {
        await signInWithRedirect(auth, provider);
      } catch (redirectError) {
        console.error('Erro ao fazer login com Google (redirect fallback):', redirectError);
        throw redirectError;
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  const value = {
    user,
    signInWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 