import React, { useState } from "react";
import { memberService } from "../services/apiService";

function RegisterPage({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Step 2a: Validate fields
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // Step 2b: Prepare data for backend
    const registerData = {
      name: formData.name,               // Backend expects 'name', not 'fullName'
      email: formData.email,
      password: formData.password,
      role: formData.role.toUpperCase()  // <-- must be uppercase
    };

    // Step 2c: Call backend
    memberService.registerMember(registerData)
      .then(response => {
        const newMember = response.data;
        onRegisterSuccess(newMember);
        setLoading(false);
      })
      .catch(error => {
        console.error("Registration error full:", error); // Step 3: log full error
        setError(
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed. Please try again."
        );
        setLoading(false);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-5" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="text-center mb-4">
          <h1 className="text-primary">📚 Library</h1>
          <h2 className="mb-2">Register</h2>
          <p className="text-muted">Create your library account</p>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError("")}
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email Address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Role</label>
            <select
              className="form-control form-control-lg"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="STUDENT">Student</option>
              <option value="STAFF">Staff</option>
              <option value="FACULTY">Faculty</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Confirm Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-muted">
            Already have an account?{" "}
            <button
              className="btn btn-link p-0"
              onClick={onSwitchToLogin}
              style={{ textDecoration: "underline" }}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
