import { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import { Link } from "react-router-dom";
import "../Styles/login.css";

const Login = () => {
  const { setToken, setUser } = useStateContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axiosClient
      .post("/login", { email, password })
      .then(({ data }) => {
        localStorage.setItem("ACCESS-TOKEN", data.token);
        localStorage.setItem("USER", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || "An error occurred");
        }
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">🔐 Sign In</h2>

        {error && <p className="auth-error">⚠️ {error}</p>}

        <div className="auth-input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="auth-btn" type="submit">Login</button>

        <p className="auth-redirect">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
