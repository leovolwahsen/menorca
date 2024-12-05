import { Flex, Table, TableColumnsType, Typography } from "antd";
import { useAxios } from "../data/useAxios";
import { useEffect, useState } from "react";
import { IAttendeeFormValues, IAttendeesTableRow } from "../types/attendee";

const { Title } = Typography;

export const Dashboard: React.FC = () => {
  const axiosInstance = useAxios();
  const [attendees, setAttendees] = useState<IAttendeeFormValues[]>([])
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    axiosInstance.get<IAttendeeFormValues[]>("/attendees").then((res) => {
      setAttendees(res.data);
    }).catch((error) => {
      console.error(error);
    })
  }, [axiosInstance]);

  if (!userRole) {
    return null
  }

  const dataSource: IAttendeesTableRow[] = attendees.map((attendee, index) => ({
    key: index.toString(),
    willAttend: attendee.willAttend,
    firstName: attendee.firstName,
    lastName: attendee.lastName,
    email: attendee.email,
    companionFirstName: attendee.companion?.firstName || undefined,
    companionLastName: attendee.companion?.lastName || undefined,
    companionRequireBabysitter: attendee.companion?.requireBabysitter || undefined,
  }));

  const columns: TableColumnsType<IAttendeesTableRow> = [
    {
      title: 'Will attend',
      dataIndex: 'willAttend',
      key: 'willAttend',
      filters: [
        {
          text: "Yes",
          value: "Yes",
        },
        {
          text: "No",
          value: "No",
        },
        {
          text: "Still unsure",
          value: "Still unsure",
        }
      ],
      sorter: (a, b) => a.willAttend.localeCompare(b.willAttend),
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Companion First Name',
      dataIndex: 'companionFirstName',
      key: 'companionFirstName',
      sorter: (a, b) => (a.companionFirstName || "").localeCompare(b.companionFirstName || ""),
    },
    {
      title: 'Companion Last Name',
      dataIndex: 'companionLastName',
      key: 'companionLastName',
      sorter: (a, b) => (a.companionLastName || "").localeCompare(b.companionLastName || ""),
    },
    {
      title: 'Companion Require Babysitter',
      dataIndex: 'companionRequireBabysitter',
      key: 'companionRequireBabysitter',
      filters: [
        {
          text: "Yes",
          value: "Yes",
        },
        {
          text: "We will arrange/travel with our own",
          value: "We will arrange/travel with our own",
        },
        {
          text: "No, we don't require childcare",
          value: "No, we don't require childcare",
        }
      ],
      sorter: (a, b) => (a.companionRequireBabysitter || "").localeCompare(b.companionRequireBabysitter || ""),
    },
  ];

  return (
    <Flex vertical justify="center" align="center">
      <Title level={2}>Dashboard</Title>
      <Table dataSource={dataSource} columns={columns} style={{ width: "99vw"}} />;
    </Flex>
  )
}
