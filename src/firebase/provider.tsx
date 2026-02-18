'use client';

import {
  type Auth,
} from 'firebase/auth';
import { type FirebaseApp } from 'firebase/app';
import { type Firestore } from 'firebase/firestore';
import React, { createContext, useContext } from 'react';

// Define the context shape
interface FirebaseContextType {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

// Create the context
export const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  auth: null,
  firestore: null,
});

// Create a hook for easy access to the context
export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const useFirebaseApp = () => {
  return useContext(FirebaseContext)?.app ?? null;
}

export const useAuth = () => {
  return useContext(FirebaseContext)?.auth ?? null;
}

export const useFirestore = () => {
  return useContext(FirebaseContext)?.firestore ?? null;
}

// Create the provider component
export const FirebaseProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: FirebaseContextType;
}) => {
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
