import React, { useEffect, useState } from "react";
import { Button, Form, Input, Typography, Select } from "antd";
import { useAxios } from "../data/useAxios";

const { Title } = Typography;
const { Option } = Select;

export const Home: React.FC = () => {
  const axiosInstance = useAxios(); 
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, []);

  const handlePasswordSubmit = async () => {
    try {
      const response = await axiosInstance.post("/validate-password", { password });

      if (response.status === 200) {
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const handleAttendeeSubmit = async (values: any) => {
    try {
      const response = await axiosInstance.post("/new-attendee", values);
      if (response.status === 201) {
        setIsFormVisible(false);
        alert("Attendee registered successfully!");
      }
    } catch (err: any) {
      console.error(err);
      alert("Failed to register attendee.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Form
          layout="vertical"
          onFinish={handlePasswordSubmit}
          style={{
            width: 300,
            padding: 20,
            border: "1px solid #ddd",
            borderRadius: 10,
          }}
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
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Welcome to the Website!</Title>
      {isFormVisible ? (
        <Form
          layout="vertical"
          onFinish={handleAttendeeSubmit}
          style={{
            maxWidth: 600,
            padding: 20,
            border: "1px solid #ddd",
            borderRadius: 10,
          }}
        >
          <Title level={4}>Register Attendee</Title>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter your first name" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Will Attend"
            name="willAttend"
            rules={[{ required: true, message: "Please select an option" }]}
          >
            <Select placeholder="Select an option">
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
              <Option value="Still unsure">Still unsure</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Button
          type="primary"
          onClick={() => setIsFormVisible(true)}
        >
          Add New Attendee
        </Button>
      )}
    </div>
  );
};