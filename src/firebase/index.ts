'use client';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from './config';

// Provides a way to access the firebase services that is consistent
// and easy to test.

export function initializeFirebase() {
  // This check prevents the app from crashing if the config is not set or invalid.
  const isInvalidConfig =
    !firebaseConfig ||
    !firebaseConfig.apiKey ||
    firebaseConfig.apiKey === 'API_KEY' ||
    !firebaseConfig.projectId ||
    firebaseConfig.projectId === 'PROJECT_ID' ||
    !firebaseConfig.authDomain;

  if (isInvalidConfig) {
    console.error(
      'Firebase config is not set or invalid. Authentication will not work. Please update src/firebase/config.ts'
    );
    return { app: null, auth: null, firestore: null };
  }

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  return { app, auth, firestore };
}

export * from './provider';
export * from './auth/use-user';
