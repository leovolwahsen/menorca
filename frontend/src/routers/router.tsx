import { createBrowserRouter } from "react-router-dom";
import { PrimaryLayout } from "../layout/PrimaryLayout";
import { Home } from "../pages/Home";
import { Accommondation } from "../pages/Accommondation";
import { ContactUs } from "../pages/ContactUs";
import { Program } from "../pages/Program";
import { RestaurantsAndActivities } from "../pages/RestaurantsAndActivities";
import { Travel } from "../pages/Travel";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrimaryLayout />,
        children: [
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
        ]
    }
]);

export default router;