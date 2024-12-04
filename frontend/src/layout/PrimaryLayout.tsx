import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/headers/Navbar";

export const PrimaryLayout: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
    <Navbar isAuthenticated={isAuthenticated} />
    <main>
      <Outlet context={{ setIsAuthenticated }} />
    </main>
  </div>
  )
}
