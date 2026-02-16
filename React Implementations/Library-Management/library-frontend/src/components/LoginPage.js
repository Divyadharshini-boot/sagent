import React, { useState } from "react";
import { memberService } from "../services/apiService";

function LoginPage({ onLoginSuccess, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    setLoading(true);

    // Call Spring Boot login API
    memberService.loginMember(formData.email, formData.password)
      .then(response => {
        const member = response.data;
        onLoginSuccess(member);
      })
      .catch(error => {
        console.error("Login error:", error);
        setError(
          error.response?.data?.message ||
          "Invalid email or password. Please try again."
        );
        setLoading(false);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-5" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <h1 className="text-primary">📚 Library</h1>
          <h2 className="mb-2">Login</h2>
          <p className="text-muted">Access your library account</p>
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
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-muted">
            Don't have an account?{" "}
            <button
              className="btn btn-link p-0"
              onClick={onSwitchToRegister}
              style={{ textDecoration: "underline" }}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
