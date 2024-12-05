import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/headers/Navbar";
import { Flex } from "antd";

export const PrimaryLayout: React.FC = () => {
    const [, setIsAuthenticated] = useState(false);

  return (
    <Flex vertical align="center">
    <Navbar />
    <Flex style={{ padding: "20px" }}>
      <Outlet context={{ setIsAuthenticated }} />
    </Flex>
  </Flex>
  )
}
