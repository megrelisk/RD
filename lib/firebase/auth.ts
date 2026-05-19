"use client";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  type User,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "./client";

export async function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth(), email, password);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth(), provider);
}

export async function signOut() {
  return fbSignOut(auth());
}

export function onAuthChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth(), cb);
}

export async function isAdmin(uid: string): Promise<boolean> {
  const snap = await getDoc(doc(db(), "admins", uid));
  return snap.exists();
}
