import React from "react";
import { Button, Form, Input, Typography, Select } from "antd";
import { useAxios } from "../data/useAxios";
// import { FaLock, FaLockOpen } from "react-icons/fa";
// import { useAuth } from "../context/auth-context";
// import { IPasswordValidationResponse } from "../types/authentication";
import { IAttendeeFormValues } from "../types/attendee";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Title } = Typography;
const { Option } = Select;

// Error handling utility
const handleError = (err: unknown): Error | string => {
  if (err instanceof Error) {
    return err;
  }
  return "An unknown error occurred.";
};

const extractErrorMessage = (err: Error | string | null): string => {
  return err instanceof Error ? err.message : err || "";
};

export const Home: React.FC = () => {
  const axiosInstance = useAxios();
  // const [password, setPassword] = useState<string>("");
  // const [error, setError] = useState("");
  // const [isUnlocking, setIsUnlocking] = useState<boolean>(false);
  // const { isAuthenticated, setAuthState, userRole } = useAuth();

  const [form] = Form.useForm();

  // const handlePasswordSubmit = async () => {
  //   try {
  //     const response = await axiosInstance.post<IPasswordValidationResponse>("/validate-password", { password });

  //     if (response.status === 200) {
  //       const role = response.data.role;
  //       setAuthState(true, role);
  //       localStorage.setItem("isAuthenticated", "true");
  //       localStorage.setItem("userRole", role);
  //       setIsUnlocking(true);

  //       // This commented out code would be a way to automatically be loged-out after time ended
  //       // setTimeout(() => {
  //       //   setIsAuthenticated(true);
  //       //   setIsUnlocking(false);
  //       //   localStorage.removeItem("isAuthenticated");
  //       //   localStorage.removeItem("userRole")
  //       // }, 3000)
  //     }
  //   } catch (err: unknown) {
  //     const processedError = handleError(err);
  //     toast.error(extractErrorMessage(processedError));
  //     setError(extractErrorMessage(processedError));
  //   }
  // };

  const handleAttendeeSubmit = async (values: IAttendeeFormValues) => {
    try {
      const response = await axiosInstance.post("/new-attendee", values);
      if (response.status === 201) {
        toast.success("You have registered successfully!", { autoClose: false });
        form.resetFields();
      }
    } catch (err: unknown) {
      const processedError = handleError(err);
      toast.error("Failed to register, please check your input!");
      console.error(extractErrorMessage(processedError));
    }
  };

  // if (!isAuthenticated) {
  //   return (
  //     <Flex vertical justify="center" align="center" style={{ width: "100vw", height: "90vh" }}>
  //       <ToastContainer />
  //       <Form
  //         layout="vertical"
  //         onFinish={handlePasswordSubmit}
  //         style={{
  //           width: 300,
  //           padding: 20,
  //           border: "1px solid #ddd",
  //           borderRadius: 10,
  //           marginTop: 20,
  //         }}
  //       >
  //         <Flex vertical align="center" justify="center" gap="5rem" style={{ fontSize: 35, transition: "transform 0.5s, color 0.5s, opacity 0.8s", opacity: isUnlocking ? 0 : 1, width: "100%", height: "30%" }}>
  //           {isUnlocking ? <FaLockOpen /> : <FaLock />}
  //         </Flex>
  //         <Form.Item
  //           name="username"
  //           label="Username (for autofill compatibility)"
  //           initialValue="default-username"
  //           style={{ display: "none" }}
  //         >
  //           <Input type="text" autoComplete="username" />
  //         </Form.Item>
  //         <Form.Item
  //           label="Password"
  //           validateStatus={error ? "error" : ""}
  //           help={error}
  //         >
  //           <Input.Password
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             placeholder="Enter your password"
  //             autoComplete="current-password"
  //           />
  //         </Form.Item>
  //         <Form.Item>
  //           <Button type="primary" htmlType="submit" block>
  //             Submit
  //           </Button>
  //         </Form.Item>
  //       </Form>
  //     </Flex>
  //   );
  // }

  return (
    <div style={{ padding: 20 }}>
      <ToastContainer />
      <Title level={3}>Welcome 
        {/* {userRole === "admin" ? "Admin" : "Visitor"} */}
         to the Website!</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAttendeeSubmit}
        style={{
          maxWidth: 600,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 10
        }}
      >
        <Title level={5}>Please fill out this Form</Title>
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
        <Title level={5}>Companion</Title>
        <Form.Item
          label="Companion First Name"
          name={["companion", "firstName"]}
        >
          <Input placeholder="Companion First Name" />
        </Form.Item>
        <Form.Item
          label="Companion Last Name"
          name={["companion", "lastName"]}
        >
          <Input placeholder="Companion Last Name" />
        </Form.Item>
        <Form.Item
          label="We will require a babysitter for the evening?"
          name={["companion", "requireBabysitter"]}
        >
          <Select placeholder="Select an option">
            <Option value="Yes">Yes</Option>
            <Option value="We will arrange/travel with our own">We will arrange/travel with our own</Option>
            <Option value="No, we don't require childcare">No, we don't require childcare</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};