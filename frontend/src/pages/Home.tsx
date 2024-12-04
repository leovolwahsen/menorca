import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, Typography, Flex } from "antd";

const { Title, Text } = Typography;

export const Home: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
        setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/validate-password", { password });

     if (response.status === 200) {
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
     }
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  if (isAuthenticated) {
    return (
      <Flex vertical justify="center">
        <Title level={3}>Welcome to the  Website!</Title>
        <Text>You now have full access to the site.</Text>
      </Flex>
    );
  }

  return (
    <Flex vertical justify="center" align="center" style={{ height: "100vh" }}>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        style={{ width: 300, padding: 20, border: "1px solid #ddd", borderRadius: 10 }}
      >
        <Title level={3}>Enter Password</Title>
        <Form.Item
          label="Password"
          validateStatus={error ? "error" : ""}
          help={error}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
