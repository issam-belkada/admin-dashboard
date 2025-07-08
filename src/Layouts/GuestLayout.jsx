import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useStateContext } from "../Contexts/ContextProvider.jsx";

export default function GuestLayoutLayout() {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
    
    return (
        <div className="guest-layout">
            <header>
                <h1>Welcome to the Admin Dashboard</h1>
            </header>
            <main>
            <Outlet />
            </main>
        </div>
    )
};