import { useState, useEffect } from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axios-client";
import "../Styles/defaultlayout.css";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

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
  const userInitial = username.charAt(0).toUpperCase();

  return (
    <div className={`default-layout ${darkMode ? 'dark' : 'light'}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Admin Panel</h2>
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-link">
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </Link>
          <Link to="/users" className="nav-link">
            <span className="nav-icon">👥</span>
            <span className="nav-text">User Management</span>
          </Link>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-avatar">{userInitial}</div>
          <div className="user-info">
            <span className="username">{username}</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </aside>

      <div className="content-area">
        <header className="main-header">
          <div className="header-content">
            <h1 className="welcome-message">
              Welcome back, <span className="username-highlight">{username}</span> 👋
            </h1>
            
            <div className="header-actions">
              <div className="user-menu-container">
                <button 
                  className="user-menu-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="avatar-circle">{userInitial}</div>
                  <span className="username">{username}</span>
                  <span className="dropdown-icon">{dropdownOpen ? '⏶' : '⏷'}</span>
                </button>

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <span className="item-icon">👤</span> Profile Settings
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item" >
                      <span className="item-icon">🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="content-container">
            <Outlet />
          </div>
        </main>

        <footer className="main-footer">
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Admin Dashboard v2.0 • 
            <span className="version"> v2.1.0</span>
          </p>
          <div className="footer-links">
            <Link to="mailto:belkadaissam@gmail.com">Privacy Policy</Link>
            <Link to="mailto:belkadaissam@gmail.com">Terms of Service</Link>
            <Link to="mailto:belkadaissam@gmail.com">Contact</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}