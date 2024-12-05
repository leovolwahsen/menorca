import { createBrowserRouter } from "react-router-dom";
import { PrimaryLayout } from "../layout/PrimaryLayout";
import { Home } from "../pages/Home";
import { Accommondation } from "../pages/Accommondation";
import { ContactUs } from "../pages/ContactUs";
import { Program } from "../pages/Program";
import { RestaurantsAndActivities } from "../pages/RestaurantsAndActivities";
import { Travel } from "../pages/Travel";
import { Dashboard } from "../pages/Dashboard";
// import { useAuth } from "../context/auth-context";
// import { Typography } from "antd";

// const { Title } = Typography;
// Get userRole from localStorage
// const userRole = localStorage.getItem("userRole");
// const { userRole } = useAuth();

const defaultRoutes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/program",
        element: <Program />,
    },
    {
        path: "/travel",
        element: <Travel />,
    },
    {
        path: "/accommondation",
        element: <Accommondation />,
    },
    {
        path: "/restaurants&activities",
        element: <RestaurantsAndActivities />,
    },
    {
        path: "/contact-us",
        element: <ContactUs />,
    }
];

// add in 2. place dashbord if it is admin
// if (userRole === "admin") {
//     defaultRoutes.splice(1, 0, {
//         path: "/dashboard",
//         element: <Dashboard />,
//     });
// }

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrimaryLayout />,
        children: defaultRoutes,
        // errorElement: (
        //     <Space size="large">
        //         <Title level={1}>404 - Page Not Found</Title>
        //         <Button type="link" href="/">Go back to Home</Button>
        //     </Space>
        // ),
    },
]);

export default router;