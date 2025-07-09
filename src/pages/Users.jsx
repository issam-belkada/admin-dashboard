import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import "../Styles/Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getUsers();
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const getUsers = () => {
    axiosClient
      .get("/users")
      .then(({ data }) => {
        const usersData = data.data || data;
        setUsers(usersData);
        setFilteredUsers(usersData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    axiosClient
      .delete(`/users/${id}`)
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`users-wrapper ${darkMode ? "dark-mode" : ""}`}>
      <div className="users-header">
        <div className="header-left">
          <h1>👥 User Management</h1>
        </div>
        <div className="header-right">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <Link to="/users/create" className="btn-primary">
            + Add New User
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <div className="loader" />
          <p>Loading users...</p>
        </div>
      ) : filteredUsers.length ? (
        <div className="user-cards">
          {filteredUsers.map((user) => (
            <div className="user-card" key={user.id}>
              <div className="user-avatar">{user.name[0].toUpperCase()}</div>
              <div className="user-details">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <small>
                  Created: {new Date(user.created_at).toLocaleDateString()}
                </small>
              </div>
              <div className="user-actions">
                <Link to={`/users/${user.id}`} className="btn btn-view">
                  View
                </Link>
                <Link to={`/users/${user.id}/edit`} className="btn btn-edit">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-users">
          {searchTerm ? "No matching users found." : "No users found."}
        </p>
      )}
    </div>
  );
}