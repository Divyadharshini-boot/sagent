import React from "react";

function BorrowSuccessPage({ member, book, onReturnHome }) {
  const today = new Date();
  const returnDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          <span className="navbar-brand fw-bold">📚 Library Management System</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className="text-center">
          {/* Success Icon */}
          <div style={{ fontSize: "5rem", marginBottom: "1rem", transform: "translateY(0)", transition: "all 300ms" }}>
            ✅
          </div>

          {/* Success Message */}
          <h1 className="text-success fw-bold mb-2">Book Borrowed Successfully!</h1>
          <p className="text-muted fs-5 mb-3">Your book is ready — here are the details.</p>

          {/* Receipt Card */}
          <div className="card shadow-lg p-4 mb-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div className="d-flex gap-4 align-items-start">
              <div style={{ width: 100, height: 120, background: "linear-gradient(135deg,#f8f9fa,#e9ecef)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
                📚
              </div>
              <div style={{ flex: 1 }}>
                <h5 className="fw-bold text-secondary mb-3">📋 Borrowing Receipt</h5>

                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">Member</small>
                    <div className="fw-bold">{member.name}</div>
                  </div>
                  <div>
                    <small className="text-muted">Member ID</small>
                    <div className="fw-bold">{member.memberId || member.id || member.regNo || "-"}</div>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => { const t = member.memberId || member.id || member.regNo; navigator.clipboard?.writeText(String(t)); }}>Copy</button>
                  </div>
                </div>

                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">Book</small>
                    <div className="fw-bold">{book.title}</div>
                    <div className="text-muted">{book.author}</div>
                  </div>
                  <div>
                    <small className="text-muted">Book ID</small>
                    <div className="fw-bold">#{book.id}</div>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => navigator.clipboard?.writeText(String(book.id))}>Copy</button>
                  </div>
                </div>

                <div className="mt-3 d-flex gap-4">
                  <div>
                    <small className="text-muted">Issue Date</small>
                    <div className="fw-bold">{formatDate(today)}</div>
                  </div>
                  <div>
                    <small className="text-muted">Return Date</small>
                    <div className="fw-bold text-danger">{formatDate(returnDate)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="alert alert-info mb-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <strong>📌 Important Reminder:</strong> Please return the book by {formatDate(returnDate)} to avoid late charges.
          </div>

          {/* Action Button */}
          <button
            className="btn btn-primary btn-lg fw-bold px-5"
            onClick={onReturnHome}
          >
            Continue to Departments
          </button>
        </div>
      </div>
    </div>
  );
}

export default BorrowSuccessPage;
