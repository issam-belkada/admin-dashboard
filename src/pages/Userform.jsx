import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import "../Styles/UserForm.css";

export default function Userform() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {

          setFormData({
            name: data.data.name,
            email: data.data.email,
            password: "",
            password_confirmation: "",
          });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const request = id
      ? axiosClient.put(`/users/${id}`, formData)
      : axiosClient.post("/users", formData);

    request
      .then(() => {
        navigate("/users");
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          setErrors(error.response.data.errors);
        } else {
          alert("An unexpected error occurred.");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <small className="error">{errors.name[0]}</small>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <small className="error">{errors.email[0]}</small>}
          </div>

          <div className="form-group">
            <label>Password {id && <em>(leave empty to keep current)</em>}</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small className="error">{errors.password[0]}</small>
            )}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <button className="btn" type="submit">
            {id ? "Update User" : "Create User"}
          </button>
        </>
      )}
    </form>
  );
}
