import { createBrowserRouter, Navigate } from "react-router-dom";
import DeafaultLayout from "./Layouts/DefaultLayout";
import GuestLayout from "./Layouts/GuestLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import Userform from "./pages/Userform";
import ShowUser from "./pages/ShowUser";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DeafaultLayout />,
        children: [
        
            {
                path: "/",
                element: <Navigate to="/dashboard" />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "/users",
                element: <Users/>
            },
            {
                path: "/profile",
                element: <ProfilePage/>
            },
            {
                path: "/users/new",
                element: <Userform key="usercreate"/>
            },
            {
                path: "/users/:id",
                element: <ShowUser/>
            },
            {
                path: "/users/:id/edit",
                element: <Userform key="userupdate"/>
            },
            {
                path: "/*",
                element: <NotFound />
            }
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/login"/>
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "/*",
                element: <NotFound />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);


export default router;