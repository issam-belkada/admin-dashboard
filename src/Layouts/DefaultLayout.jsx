import { Outlet } from "react-router-dom";


export default function DefaultLayout() {


    return (
        <div className="default-layout">
            <header>
                <h1>Admin Dashboard</h1>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
};