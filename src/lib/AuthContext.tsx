'use client';

import React, { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

interface AuthContextType {
  user: any;
  role: "customer" | "admin" | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  const user = session?.user || null;
  // @ts-ignore
  const role = session?.user?.role || (user ? "customer" : null);
  const loading = status === "loading";

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
