'use client';


import { AuthTypes } from '@/types/auth';
import React, { useEffect } from 'react';

const AuthContext = React.createContext<{ user: AuthTypes; setUser: React.Dispatch<React.SetStateAction<AuthTypes>> }>({ user: { phone_number: '' }, setUser: () => { } });

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<AuthTypes>({ phone_number: '' });

    useEffect(() => { }, [])

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => React.useContext(AuthContext);
