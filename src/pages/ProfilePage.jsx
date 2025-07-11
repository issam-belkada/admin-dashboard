import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import "../Styles/ProfilePage.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/user") // Assumes /api/user returns the authenticated user
      .then(({ data }) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-error">
        <h2>Profile not found</h2>
        <p>You are not logged in or the user doesn't exist.</p>
        <Link to="/login" className="modern-btn">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div 
          className="avatar"
          style={{ backgroundColor: stringToColor(user.name) }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <div className="profile-info">
          <div>
            <label>Username:</label>
            <span>{user.name}</span>
          </div>
          <div>
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div>
            <label>Member since:</label>
            <span>{new Date(user.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <Link to="/users" className="modern-btn">← Back to Users</Link>
      </div>
    </div>
  );
}

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 65%)`;
}
