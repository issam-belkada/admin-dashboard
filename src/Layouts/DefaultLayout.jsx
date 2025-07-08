import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import { Link } from "react-router-dom";
import "../index.css"; 


export default function DefaultLayout() {
    const { user, token } = useStateContext();
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    


    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    {user ?<h1>Welcome, {user.name}!</h1>: <h1>Welcome to the Admin Dashboard</h1>}
                </header>
                <main>
                    <Outlet />
                </main>
                <footer>
                    <p>&copy; 2023 Admin Dashboard</p>
                </footer>
            </div>

        </div>
    )
};