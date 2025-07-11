import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="not-found-btn">← Back to Home</Link>
    </div>
  );
}
