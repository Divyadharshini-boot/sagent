import React, { useState, useEffect } from "react";
import { bookService } from "../services/apiService";

function DepartmentPage({ member, onSelectDepartment, onLogout }) {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all books from backend
    bookService.getAllBooks()
      .then(response => {
        const books = response.data;

        // Group books by category
        const categoryMap = {};

        books.forEach(book => {
          if (!categoryMap[book.category]) {
            categoryMap[book.category] = 0;
          }
          categoryMap[book.category]++;
        });

        // Convert to department format
        const deptData = Object.keys(categoryMap).map((category, index) => ({
          id: index + 1,
          name: category,
          description: `${categoryMap[category]} books available`,
          icon: getIconForCategory(category),
          bookCount: categoryMap[category]
        }));

        setDepartments(deptData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching books:", error);
        setError("Failed to load departments.");
        setLoading(false);
      });
  }, []);

  const getIconForCategory = (category) => {
    const iconMap = {
      "Programming": "💻",
      "Computer Science": "🌳",
      "Framework": "🏗️",
      "Database": "💾",
      "Architecture": "🏛️",
      "Software Engineering": "⚙️",
      "ORM": "🔗",
      "Microservices": "🔄"
    };
    return iconMap[category] || "📚";
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          <span className="navbar-brand fw-bold">
            📚 Library Management System
          </span>
          <div>
            <span className="text-white me-3">
              Welcome, {member.name}
            </span>
            <button
              className="btn btn-outline-light"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5 mb-5">
        <div className="mb-4">
          <h1 className="text-primary fw-bold">
            📖 Select Department
          </h1>
          <p className="text-muted">
            Choose a department to browse books
          </p>
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

        {loading && (
          <div className="text-center py-5">
            <div
              className="spinner-border text-primary"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>
            <p className="mt-3 text-muted">
              Loading departments...
            </p>
          </div>
        )}

        {!loading && (
          <div className="row g-4">
            {departments.map(dept => (
              <div
                key={dept.id}
                className="col-md-6 col-lg-4"
              >
                <div
                  className="card h-100 shadow-sm"
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div className="card-body text-center p-4">
                    <div
                      style={{
                        fontSize: "3rem",
                        marginBottom: "1rem"
                      }}
                    >
                      {dept.icon}
                    </div>
                    <h5 className="card-title fw-bold text-primary">
                      {dept.name}
                    </h5>
                    <p className="card-text text-muted small">
                      {dept.description}
                    </p>
                    <p className="text-secondary">
                      <small>
                        📚 {dept.bookCount} books available
                      </small>
                    </p>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() =>
                        onSelectDepartment(dept)
                      }
                    >
                      View Books →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DepartmentPage;
