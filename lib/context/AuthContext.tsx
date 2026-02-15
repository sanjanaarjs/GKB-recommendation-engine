"use client";

import { createContext, useContext, useState } from "react";

interface AuthContextType {
    authOpen: boolean;
    setAuthOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authOpen, setAuthOpen] = useState(false);

    return (
        <AuthContext.Provider value={{ authOpen, setAuthOpen }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
