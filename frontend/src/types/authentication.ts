import { ReactNode } from "react";

export interface IAuthProviderProps {
    children: ReactNode;
}

export interface IAuthContextProps {
    isAuthenticated: boolean;
    userRole: string | null;
    setAuthState: (auth: boolean, role: string | null) => void;
}

export interface IPasswordValidationResponse {
    role: string;
}
