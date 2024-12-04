import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Flex } from "antd";

const navLinks = [
    { name: "Home", route: "/" },
    { name: "Program", route: "/program" },
    { name: "Travel", route: "/travel" },
    { name: "Accommondation", route: "/accommondation" },
    { name: "RestaurantsAndActivities", route: "/restaurants&activities" },
    { name: "ContactUs", route: "/contact-us" },
];


export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHome, setIsHome] = useState(false);

    return (
        <Flex>Navbar</Flex>
    )
}
