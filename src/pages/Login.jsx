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
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>🔐 Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-btn" type="submit">Login</button>
        <p className="redirect-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
