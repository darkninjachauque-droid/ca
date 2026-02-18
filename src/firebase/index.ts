'use client';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from './config';

// Provides a way to access the firebase services that is consistent
// and easy to test.

export function initializeFirebase() {
  // This check prevents the app from crashing if the config is not set.
  if (firebaseConfig.apiKey === "API_KEY" || firebaseConfig.projectId === "PROJECT_ID") {
    console.error("Firebase config is not set. Using mock services. Please update src/firebase/config.ts");
    return { app: null, auth: null, firestore: null };
  }
  
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  return { app, auth, firestore };
}

export * from './provider';
export * from './auth/use-user';
