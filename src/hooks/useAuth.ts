"use client";

import { useContext } from "react";
import { AuthContext, type AuthContextValue } from "@/context/AuthContext";

/** Access the current auth session. Must be used within an `<AuthProvider>`. */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
