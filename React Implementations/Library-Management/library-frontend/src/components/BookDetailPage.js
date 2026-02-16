import React from "react";

function BookDetailPage({ member, book, department, onBorrow, onBackToBooks }) {
  // eslint-disable-next-line no-unused-vars
  const getEmojiForCategory = (category) => {
    const emojiMap = {
      "Programming": "💻",
      "Framework": "🏗️",
      "Software Engineering": "✨",
      "Architecture": "🏛️",
      "Computer Science": "🌳",
      "Database": "💾",
      "ORM": "🔗",
      "Microservices": "🔄"
    };
    return emojiMap[category] || "📖";
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          <span className="navbar-brand fw-bold">📚 Library Management System</span>
          <div>
            <span className="text-white me-3">Welcome, {member.name}</span>
            <button className="btn btn-outline-light" onClick={onBackToBooks}>
              Back
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card shadow-lg p-5 text-center" style={{ minHeight: "400px" }}>
              <div style={{ fontSize: "8rem", marginBottom: "2rem" }}>
                {getEmojiForCategory(book.category)}
              </div>
              <h3 className="fw-bold">{book.title}</h3>
              <p className="text-muted mt-3">
                <strong>Department:</strong> {department.name}
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-lg p-4">
              <h2 className="text-primary fw-bold mb-4">Book Information</h2>

              <div className="mb-3">
                <h6 className="text-secondary">Title</h6>
                <p className="fs-5 fw-bold">{book.title}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Author</h6>
                <p className="fs-5">{book.author}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">ISBN</h6>
                <p className="fs-5">{book.isbn}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Department</h6>
                <p className="fs-5">{department.name}</p>
              </div>

              <div className="mb-4">
                <h6 className="text-secondary">Availability Status</h6>
                {book.status === "AVAILABLE" ? (
                  <span className="badge bg-success fs-6 p-2">✓ Available</span>
                ) : book.status === "DAMAGED" ? (
                  <span className="badge bg-warning fs-6 p-2">⚠ Damaged</span>
                ) : (
                  <span className="badge bg-danger fs-6 p-2">✗ {book.status}</span>
                )}
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => onBorrow(book)}
                  disabled={book.status !== "AVAILABLE"}
                >
                  📥 Borrow This Book
                </button>
                <button
                  className="btn btn-outline-secondary btn-lg"
                  onClick={onBackToBooks}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
