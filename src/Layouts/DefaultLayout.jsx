import { useState } from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import "../Styles/defaultlayout.css";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    axiosClient.post("/logout")
      .then(() => {
        localStorage.removeItem("ACCESS-TOKEN");
        localStorage.removeItem("USER");
        setUser(null);
        setToken(null);
      })
      .catch((error) => {
        console.error("❌ Logout failed:", error);
      });
    
  };

  const username = user?.name ?? "Guest";


  return (
    <div id="defaultLayout">
      <aside>
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav className="sidebar-nav">
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/users">👥 Users</Link>
        </nav>
      </aside>

      <div className="content">
        <header className="header">
          <div className="welcome-message">
          <h1>Welcome,{username} 👋</h1>
          </div>

          <div className="user-menu">
            <div
              className="user-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
            
            <span>{username}</span> ⏷
            </div>

            {dropdownOpen && (
              <ul className="dropdown">
                <li>
                  <Link to="/profile">👤 Profile</Link>
                </li>
                <li onClick={handleLogout}>🚪 Logout</li>
              </ul>
            )}
          </div>
        </header>

        <main>
          <Outlet />
        </main>

        <footer>
          <p>&copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
