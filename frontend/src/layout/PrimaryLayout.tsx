import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/headers/Navbar";
import { Flex } from "antd";
import React from "react";


export const PrimaryLayout: React.FC = () => {
  const [, setIsAuthenticated] = useState(false);

  return (
    <Flex vertical>
      <Navbar />
      <Flex style={{ width: "100%",flexGrow: 1 }}>
        <Outlet context={{ setIsAuthenticated }} />
      </Flex>
    </Flex>
  )
}
