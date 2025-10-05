import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import "../Styles/Users.css";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { darkMode } = useStateContext();

  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState([]);



  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers(`/users?search=${encodeURIComponent(searchTerm)}`);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const fetchUsers = (url = "/users") => {
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setUsers(data.data);
        setMeta(data.meta);
        setLinks(data.meta?.links || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    axiosClient.delete(`/users/${id}`).then(() => {
      fetchUsers(`/users?page=${meta.current_page}&search=${encodeURIComponent(searchTerm)}`);
    });
  };

  return (
    <div className={`users-wrapper ${darkMode ? "dark-mode" : ""}`}>
      <div className="users-header">
        <div className="header-left">
          <h1>👥 User Management</h1>
          <p>Total: {meta.total ?? "..."}</p>
        </div>
        <div className="header-right">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Link to="/users/new" className="btn-primary">
            + Add New User
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <div className="loader" /> Loading...
        </div>
      ) : users.length ? (
        <>
          <div className="user-cards">
            {users.map((user) => (
              <div className="user-card" key={user.id}>
                <div className="user-avatar">{user.name[0]}</div>
                <div className="user-details">
                  <h2 className="username">
                  {user.name}
                  </h2>
                  <p>{user.email}</p>
                  <small>
                    Created: {new Date(user.created_at).toLocaleDateString()}
                  </small>
                </div>
                <div className="user-actions">
                  <Link to={`/users/${user.id}`} className="btn btn-view">View</Link>
                  <Link to={`/users/${user.id}/edit`} className="btn btn-edit">Edit</Link>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-delete">Delete</button>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            {links.map((link, index) =>
              link.url ? (
                <button
                  key={index}
                  className={`page-btn ${link.active ? "active" : ""}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  onClick={() =>
                    fetchUsers(
                      link.url.replace("http://localhost:8000/api", "")
                    )
                  }
                />
              ) : null
            )}
          </div>
        </>
      ) : (
        <p className="no-users">No users found.</p>
      )}
    </div>
  );
}
