import { Outlet, Navigate } from 'react-router-dom';
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import '../Styles/guestLayout.css';

export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="guest-layout">
      <header className="guest-header">
        <h1>👋 Welcome</h1>
        <p>Please log in or sign up to continue</p>
      </header>
      <main className="guest-main">
        <Outlet />
      </main>
      <footer className="guest-footer">
        <p>&copy; {new Date().getFullYear()} Admin Dashboard</p>
      </footer>
    </div>
  );
}
