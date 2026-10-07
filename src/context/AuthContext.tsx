import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUpAdmin: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const clearAuthError = () => setAuthError(null);

  const signIn = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      setUser(cred.user);
    } catch (err: any) {
      console.error('Firebase Auth Sign In error:', err);
      let msg = 'Failed to sign in. Please verify your email and password.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password. If this is your first time, please create an admin account.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Please enter a valid email address.';
      } else if (err.code === 'auth/too-many-requests') {
        msg = 'Too many failed login attempts. Please wait a few moments or reset your credentials.';
      }
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const signUpAdmin = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      setUser(cred.user);
      
      // Store admin record in Firestore
      try {
        await setDoc(doc(db, 'admins', cred.user.uid), {
          email: cred.user.email,
          role: 'admin',
          createdAt: new Date().toISOString()
        }, { merge: true });
      } catch (fErr) {
        console.warn('Could not record admin profile in Firestore:', fErr);
      }
    } catch (err: any) {
      console.error('Firebase Auth Sign Up error:', err);
      let msg = 'Failed to create admin account.';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'An account with this email already exists. Please log in instead.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      }
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const signOut = async () => {
    setAuthError(null);
    await fbSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUpAdmin,
        signOut,
        authError,
        clearAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
