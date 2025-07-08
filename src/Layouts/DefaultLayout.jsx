import { useState } from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import "../Styles/defaultlayout.css";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("ACCESS-TOKEN");
    setUser(null);
    setToken(null);
  };

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
            <h1>Welcome, {user?.name} 👋</h1>
          </div>

          <div className="user-menu">
            <div
              className="user-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>{user?.name}</span> ⏷
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
