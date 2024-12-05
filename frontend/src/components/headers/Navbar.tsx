import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { Grid, Menu, MenuProps, Typography } from "antd";
import { FaHome, FaClipboardList, FaCar, FaHotel, FaGrinStars, FaUser, FaTable, FaBars } from "react-icons/fa";

const { Title } = Typography;
const { useBreakpoint } = Grid
type MenuItem = Required<MenuProps>['items'][number];

export const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const userRole = localStorage.getItem("userRole");

  const navLinks = [
    { name: "Home", route: "/", icon: <FaHome /> },
    { name: "Program", route: "/program", icon: <FaClipboardList /> },
    { name: "Travel", route: "/travel", icon: <FaCar /> },
    { name: "Accommondation", route: "/accommondation", icon: <FaHotel /> },
    { name: "RestaurantsAndActivities", route: "/restaurants&activities", icon: <FaGrinStars /> },
    { name: "ContactUs", route: "/contact-us", icon: <FaUser /> },
  ];

  // is admin password was entert then add this navLink element
  const links = [...navLinks];
  if (isAuthenticated && userRole == "admin") {
    links.splice(1, 0, { name: "Dashboard", route: "/dashboard", icon: <FaTable /> });
  }

  const items: MenuItem[] = links.map((link) => ({
    label: <NavLink to={link.route}>{link.name}</NavLink>,
    key: link.route,
    icon: link.icon
  }));

  const screens = useBreakpoint();

  if (!isAuthenticated) {
    return null
  }

  return (
    <nav style={{ backgroundColor: "#f5f5f5", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <Title level={4}>Menorca</Title>
      {!screens.lg ? (
        <FaBars style={{ fontSize: "24px", cursor: "pointer" }} />
      ) : (
        <Menu mode="horizontal" theme="light" defaultSelectedKeys={["/"]} items={items} style={{ marginTop: "10px", display: "flex", flexWrap: "wrap" }} />
      )}
    </nav>
  )
}
