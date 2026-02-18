'use client';

import {
  type Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { z } from 'zod';

export const emailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signUp(auth: Auth,
  values: z.infer<typeof emailPasswordSchema>
) {
  const validatedFields = emailPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error('Invalid fields');
  }
  const { email, password } = validatedFields.data;
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signIn(auth: Auth,
  values: z.infer<typeof emailPasswordSchema>
) {
  const validatedFields = emailPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error('Invalid fields');
  }
  const { email, password } = validatedFields.data;
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOut(auth: Auth) {
  return firebaseSignOut(auth);
}

export async function resetPassword(auth: Auth, email: string) {
  const emailSchema = z.string().email();
  const validatedEmail = emailSchema.safeParse(email);
  if (!validatedEmail.success) {
      throw new Error('Invalid email');
  }
  return sendPasswordResetEmail(auth, validatedEmail.data);
}
