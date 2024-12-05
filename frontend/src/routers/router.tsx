import { createBrowserRouter } from "react-router-dom";
import { PrimaryLayout } from "../layout/PrimaryLayout";
import { Home } from "../pages/Home";
import { Accommondation } from "../pages/Accommondation";
import { ContactUs } from "../pages/ContactUs";
import { Program } from "../pages/Program";
import { RestaurantsAndActivities } from "../pages/RestaurantsAndActivities";
import { Travel } from "../pages/Travel";
import { Dashboard } from "../pages/Dashboard";

// Get userRole from localStorage
const userRole = localStorage.getItem("userRole");

const defaultRoutes = [
    {
        path: "/",
        element: <Home />,
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
if (userRole === "admin") {
    defaultRoutes.splice(1, 0, {
        path: "/dashboard",
        element: <Dashboard />,
    });
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrimaryLayout />,
        children: defaultRoutes,
    },
]);

export default router;