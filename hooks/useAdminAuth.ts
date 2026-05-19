"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

import { isAdmin, onAuthChange } from "@/lib/firebase/auth";

export type AdminAuthState = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
};

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    loading: true,
    isAdmin: false,
  });

  useEffect(() => {
    const unsub = onAuthChange(async (user) => {
      if (!user) {
        setState({ user: null, loading: false, isAdmin: false });
        return;
      }
      const admin = await isAdmin(user.uid).catch(() => false);
      setState({ user, loading: false, isAdmin: admin });
    });
    return unsub;
  }, []);

  return state;
}
