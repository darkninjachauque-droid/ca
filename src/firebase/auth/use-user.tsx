'use client';

import { type User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuth } from '../provider';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!auth) {
      // We set initialized to true here so that routes that depend on auth state
      // don't get stuck in a loading state if firebase is not configured.
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        setInitialized(false);
      } else {
        setInitialized(true);
      }
      return;
    };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitialized(true);
    });
    return () => unsubscribe();
  }, [auth]);

  return { user, initialized };
}
