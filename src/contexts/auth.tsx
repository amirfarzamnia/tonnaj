'use client';

import { AuthTypes } from '@/types/types';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface AuthContextProps {
    user: AuthTypes;
    setUser: Dispatch<SetStateAction<AuthTypes>>;
}

const AuthContext = createContext<AuthContextProps>({
    user: { phone_number: '' },
    setUser: () => {}
});

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthTypes>({ phone_number: '' });

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
