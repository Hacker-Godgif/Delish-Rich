import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut
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
  try {
    // Normal signup
    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await updateProfile(result.user, {
      displayName: name,
    });

    await sendEmailVerification(result.user);

    return {
      firebaseUser: result.user,
      verificationSent: true,
      existingUnverifiedUser: false,
    };
  } catch (error) {
    // Email already exists in Firebase
    if (
      error.code !== "auth/email-already-in-use"
    ) {
      throw error;
    }

    /*
     * The email already exists.
     *
     * Try signing in with the password supplied
     * in the signup form.
     */
    let existingUser;

    try {
      const loginResult =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      existingUser = loginResult.user;
    } catch (loginError) {
      /*
       * We don't know whether the existing account
       * is verified if the password is wrong.
       *
       * Don't reveal unnecessary account information.
       */
      throw new Error(
        "An account already exists with this email. Please use the correct password or sign in instead."
      );
    }

    // Existing account is already verified
    if (existingUser.emailVerified) {
      await signOut(auth);

      const error = new Error(
      "This email is already registered. Please sign in instead."
    );

    error.code = "auth/account-already-verified";

    throw error;
    }

    /*
     * Existing account is NOT verified.
     *
     * Send the verification email again.
     */
    await sendEmailVerification(existingUser);

    return {
      firebaseUser: existingUser,
      verificationSent: true,
      existingUnverifiedUser: true,
    };
  }
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

     if (!result.user.emailVerified) {
    await sendEmailVerification(result.user);

    return {
      verificationRequired: true,
      firebaseUser: result.user,
    };
  }

  return await syncUserWithBackend(result.user);
};