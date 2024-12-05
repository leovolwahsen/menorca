import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { Menu, MenuProps, Typography } from "antd";
import { FaHome, FaClipboardList, FaCar, FaHotel, FaGrinStars, FaUser, FaTable } from "react-icons/fa";

const { Title } = Typography;
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
  }))

  return (
    <nav>
      <Title style={{ color: "#fff" }}>Menorca</Title>
      {isAuthenticated ? (
        <Menu mode="horizontal" theme="dark" defaultSelectedKeys={["/"]} items={items} style={{ flexGrow: 1, marginLeft: "1rem" }}>
          {navLinks.map((link) => (
            <Menu.Item key={link.route}>
              <NavLink to={link.route}>{link.name}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      ) : (
        <Typography.Text style={{ color: "#fff" }}>Please authenticate to access the site.</Typography.Text>
      )}
    </nav>
  )
}
