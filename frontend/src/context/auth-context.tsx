import React, { createContext, useContext, useState } from "react";
import { IAuthContextProps, IAuthProviderProps } from "../types/authentication";

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const setAuthState = (auth: boolean, role: string | null) => {
    setIsAuthenticated(auth);
    setUserRole(role);
    // if (auth && role) {
    //   localStorage.setItem("userRole", role);
    // } else {
    //   localStorage.removeItem("userRole");
    // }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): IAuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth is not used in AuthProvider")
  }
  return context;
}
