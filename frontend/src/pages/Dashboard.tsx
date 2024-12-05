import { Flex, Table, Typography } from "antd";

const { Title } = Typography;

export const Dashboard: React.FC = () => {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    return null
  }

  const dataSource = [
    {
      key: '1',
      willAttend: 'Mike',
      firstName: 32,
      lastName: '10 Downing Street',
      email: 'Mike',
      companionFirstName: 32,
      companionLastName: '10 Downing Street',
      companionRequireBabysitter: '10 Downing Street',
    },
    {
      key: '1',
      willAttend: 'Mike',
      firstName: 32,
      lastName: '10 Downing Street',
      email: 'Mike',
      companionFirstName: 32,
      companionLastName: '10 Downing Street',
      companionRequireBabysitter: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'willAttend',
      dataIndex: 'willAttend',
      key: 'willAttend',
    },
    {
      title: 'firstName',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'lastName',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'companionFirstName',
      dataIndex: 'companionFirstName',
      key: 'companionFirstName',
    },
    {
      title: 'companionRequireBabysitter',
      dataIndex: 'companionRequireBabysitter',
      key: 'companionRequireBabysitter',
    },
  ];
  
 

  return (
    <Flex vertical justify="center" align="center" style={{ width: "100vw", height: "90vh" }}>
    <Title level={2}>Dashboard</Title> 
    <Table dataSource={dataSource} columns={columns} />;
    </Flex>
  )
}
