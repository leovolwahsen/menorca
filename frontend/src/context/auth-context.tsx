import React, { createContext, useContext, useState } from "react";
import { AuthContextProps, AuthProviderProps } from "../types/authentication";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const setAuthState = (auth: boolean, role: string | null) => {
    setIsAuthenticated(auth);
    setUserRole(role);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth is not used in AuthProvider")
  }
  return context;
}
