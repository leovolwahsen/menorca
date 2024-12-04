import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { Menu, Typography } from "antd";

const { Title } = Typography;

const navLinks = [
    { name: "Home", route: "/" },
    { name: "Program", route: "/program" },
    { name: "Travel", route: "/travel" },
    { name: "Accommondation", route: "/accommondation" },
    { name: "RestaurantsAndActivities", route: "/restaurants&activities" },
    { name: "ContactUs", route: "/contact-us" },
];

export const Navbar: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <nav>
        <Title>Menorca</Title>
        {isAuthenticated ? (
          <Menu mode="horizontal" theme="dark" defaultSelectedKeys={["/"]} style={{ flexGrow: 1, marginLeft: "1rem" }}>
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
