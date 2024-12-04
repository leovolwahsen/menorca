import React, { createContext, useContext, useState } from "react";
import { AuthProviderProps } from "../types/authentication";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: () => void;
}>({
  isAuthenticated: false,
  login: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
