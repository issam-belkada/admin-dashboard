import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../axios-client";
import "../Styles/ShowUser.css";

export default function ShowUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/users/${id}`)
      .then(({ data }) => {
        setUser(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="user-profile-loading">
        <div className="loading-animation">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
        <p>Loading user profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="user-profile-error">
        <div className="error-icon">⚠️</div>
        <h3>User Not Found</h3>
        <p>We couldn't find the user you're looking for.</p>
        <Link to="/users" className="modern-btn back-btn">
          Return to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <h1>
          <span className="profile-icon">👤</span>
          {user.name}'s Profile
        </h1>
        <div className="header-actions">
          <Link to={`/users/${user.id}/edit`} className="modern-btn edit-btn">
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-section">
          <div 
            className="user-avatar"
            style={{ backgroundColor: stringToColor(user.name) }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <h2>{user.name}</h2>
            <p className="user-email">{user.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Username</span>
            <span className="detail-value">{user.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Account Created</span>
            <span className="detail-value">
              {new Date(user.created_at).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="profile-footer">
          <Link to="/users" className="modern-btn back-btn">
            ← Back to All Users
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper function to generate consistent color from string
function stringToColor(str) {
  if (!str || str.length === 0) return "#ccc";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 65%)`;
}
