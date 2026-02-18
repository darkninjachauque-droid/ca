'use client';

import {
  type Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { type Firestore, doc, setDoc } from 'firebase/firestore';
import { z } from 'zod';

export const emailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signUpDataSchema = emailPasswordSchema.extend({
    phone: z.string().min(9),
});

export async function signUp(auth: Auth, firestore: Firestore,
  values: z.infer<typeof signUpDataSchema>
) {
  const validatedFields = signUpDataSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error('Invalid fields for sign up action.');
  }
  const { email, password, phone } = validatedFields.data;
  
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const displayName = email.split('@')[0];
  const photoURL = `https://avatar.vercel.sh/${email}.png`;

  // Set display name and photoURL in Auth profile
  await updateProfile(user, {
    displayName: displayName,
    photoURL: photoURL
  });

  // Save public user profile to Firestore
  await setDoc(doc(firestore, 'users', user.uid), {
    displayName: displayName,
    phone: phone,
    photoURL: photoURL
  });

  return userCredential;
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
