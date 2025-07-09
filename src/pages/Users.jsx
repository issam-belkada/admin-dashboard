import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import "../Styles/Users.css";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setUsers(data.data || data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching users:", error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    axiosClient
      .delete(`/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("❌ Error deleting user:", error);
      });
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>👥 Users List</h2>
        <Link to="/users/create" className="create-button">
          ➕ Create New User
        </Link>
      </div>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : users.length > 0 ? (
        <div className="users-grid">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p className="created-at">
                  Created on: {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="user-actions">
                <Link to={`/users/${user.id}`} className="btn show">
                  Show
                </Link>
                <Link to={`/users/${user.id}/edit`} className="btn edit">
                  Edit
                </Link>
                <button onClick={() => handleDelete(user.id)} className="btn delete">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-users">No users found.</p>
      )}
    </div>
  );
}
