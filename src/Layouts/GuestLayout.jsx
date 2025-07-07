import{ Outlet } from 'react-router-dom';

export default function GuestLayoutLayout() {

    
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