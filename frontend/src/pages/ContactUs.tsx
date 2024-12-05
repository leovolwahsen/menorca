import { useEffect, useState } from "react";
import { useAxios } from "../data/useAxios";
import { IContactUs } from "../types/contactUs"
import { Flex, Space, Typography } from "antd";

const { Title, Text } = Typography;

export const ContactUs: React.FC = () => {
  const axiosInstance = useAxios();
  const [contactUs, setContactUs] = useState<IContactUs>();

  useEffect(() => {
    axiosInstance.get<IContactUs>("/contact-us").then((res) => {
      setContactUs(res.data);
    }).catch((error) => {
      console.error(error);
    })
  }, []);

  return (
    <Flex vertical justify="center" align="center" style={{ width: "99vw" }}>
      <Title level={2}>{contactUs?.title}</Title>
      <Flex vertical align="center" justify="center" gap="5rem">
        <Space direction="vertical" size="small">
          <Text>name: {contactUs?.primaryContact?.name}</Text>
          <Text>
            email:{" "}
            <a href={`mailto:${contactUs?.primaryContact?.email}`}>
              {contactUs?.primaryContact?.email}
            </a>
          </Text>
          <Text>
            phone:{" "}
            <a href={`tel:${contactUs?.primaryContact?.phone}`}>
              {contactUs?.primaryContact?.phone}
            </a>
          </Text>
          <Text>whatsapp: {contactUs?.primaryContact?.whatsapp}</Text>
        </Space>

        <Space direction="vertical" size="small">
          <Text>name: {contactUs?.secondaryContact?.name}</Text>
          <Text>
            email:{" "}
            <a href={`mailto:${contactUs?.secondaryContact?.email}`}>
              {contactUs?.secondaryContact?.email}
            </a>
          </Text>
          <Text>
            phone:{" "}
            <a href={`tel:${contactUs?.secondaryContact?.phone}`}>
              {contactUs?.secondaryContact?.phone}
            </a>
          </Text>
          <Text>whatsapp: {contactUs?.secondaryContact?.whatsapp}</Text>
        </Space>
      </Flex>
    </Flex>
  )
}
