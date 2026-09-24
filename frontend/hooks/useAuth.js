"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "@/api/user.api";

// Shared auth check used to gate the planner and to decide
// whether nav actions (Planner button, Hero submit) should go
// straight through or via Google login first.
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getUserProfile()
      .then((response) => {
        if (!cancelled) {
          setUser(response.data.user);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { user, loading, isAuthenticated: Boolean(user) };
}
