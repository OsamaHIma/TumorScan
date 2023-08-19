// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

import { signOut as NextAuthSignOut } from "next-auth/react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKgO4xoXJSdlTLlMO6Y-MPNkJzcW47nQA",
  authDomain: "tumor-scan.firebaseapp.com",
  projectId: "tumor-scan",
  storageBucket: "tumor-scan.appspot.com",
  messagingSenderId: "243785654758",
  appId: "1:243785654758:web:605a1291041e80289b3627",
  measurementId: "G-D2HB8EG5GN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const dataBase = getFirestore();
export const auth = getAuth();
export const signWithGoogle = () => signInWithPopup(auth, provider);
// console.log()
export const signInWithGoogleRedirect = () => {
  signInWithRedirect(auth, provider);
};

// Creating user document and if it doesn't exist create new one

export const createUserDocument = async (user, additionalInfo = {}) => {
  if (!user) return;
  const userDocRef = doc(dataBase, "users", user.uid);
  const userSnapShoot = await getDoc(userDocRef);
  if (!userSnapShoot.exists()) {
    const { email } = user;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return userDocRef;
};

// export const addUserWithEmailAndPassword = async (email, password) => {
//   if (!email || !password) return;
//   return await createUserWithEmailAndPassword(auth, email, password);
// };

export const addUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Send email verification
    await sendEmailVerificationToUser(userCredential.user);

    return userCredential.user;
  } catch (error) {
    console.log("Error signing up:", error);
    throw error;
  }
};

export const sendEmailVerificationToUser = async (user) => {
  if (!user) return;

  try {
    await sendEmailVerification(user);

    console.log("Email verification sent successfully.");
  } catch (error) {
    console.log("Error sending email verification:", error);
    throw error;
    return
  }
};

export const sendPasswordResetEmailToUser = async (email) => {
  if (!email) return;

  try {
    await sendPasswordResetEmail(auth, email);

    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.log("Error sending password reset email:", error);
    throw error;
    return
  }
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const SignOutUser = async () => {
  if (window.confirm("Are You sure you wanna sign out?") === true) {
    await NextAuthSignOut();
    await signOut(auth);
  } else {
    return;
  }
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
