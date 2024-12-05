import { ReactNode } from "react";

export interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextProps {
    isAuthenticated: boolean;
    userRole: string | null;
    setAuthState: (auth: boolean, role: string | null) => void;
}

export interface PasswordValidationResponse {
    role: string;
}
