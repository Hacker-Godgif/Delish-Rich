import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

const syncUserWithBackend = async (firebaseUser) => {
  const firebaseToken = await firebaseUser.getIdToken();

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE}/users/firebase-login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebaseToken,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Authentication failed"
    );
  }

  localStorage.setItem(
    "token",
    data.data.token
  );

  return data;
};

// Google login
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(
    auth,
    googleProvider
  );

  return await syncUserWithBackend(result.user);
};

// Email/password signup
export const signupWithEmail = async (
  name,
  email,
  password
) => {
  const result =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await updateProfile(result.user, {
    displayName: name,
  });

  return await syncUserWithBackend(result.user);
};

// Email/password login
export const loginWithEmail = async (
  email,
  password
) => {
  const result =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return await syncUserWithBackend(result.user);
};