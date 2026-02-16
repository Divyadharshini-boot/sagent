import React, { useState } from "react";
import { borrowService } from "../services/apiService";

function BorrowConfirmPage({ member, book, onConfirmBorrow, onCancelBorrow }) {
  const [borrowDays] = useState(14);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date();
  const returnDate = new Date(
    today.getTime() + borrowDays * 24 * 60 * 60 * 1000
  );

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleConfirmBorrow = async () => {
    setLoading(true);
    setError("");

    try {
      const borrowData = {
        memberId: member.memberId || member.id || member.regNo,
        bookId: book.id,
        issueDate: today.toISOString().split("T")[0],
        returnDate: returnDate.toISOString().split("T")[0],
        status: "ACTIVE",
      };

      const response = await borrowService.createBorrow(borrowData);
      console.log("Borrow created successfully:", response.data);

      onConfirmBorrow(book);
    } catch (err) {
      console.error("Error creating borrow:", err);
      setError(
        err.response?.data?.message ||
          "Failed to process borrow. Please try again."
      );
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(String(text));
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div
          className="card shadow-lg p-5"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <div className="text-center mb-4">
            <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center" }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: "#0d6efd" }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, background: "#6c757d" }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, background: "#6c757d" }} />
            </div>
            <h2 className="text-primary fw-bold" style={{ marginTop: 12 }}>📋 Confirm Book Borrowing</h2>
          </div>

          <div className="alert alert-info mb-4">
            <strong>⚠️ Important:</strong> Please review all the details before
            confirming your borrow.
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

          {/* Member Details */}
          <div className="mb-4">
            <h5 className="fw-bold text-secondary mb-3">
              👤 Member Details
            </h5>
            <div className="bg-light p-3 rounded">
              <div className="mb-2">
                <label className="form-label fw-bold text-muted mb-1">
                  Member Name
                </label>
                <p className="fs-5 fw-bold">{member.name}</p>
              </div>
              <div className="mb-2 d-flex align-items-center justify-content-between">
                <div>
                  <label className="form-label fw-bold text-muted mb-1">Member ID</label>
                  <p className="fs-6">{member.memberId || member.id || member.regNo || "-"}</p>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => handleCopy(member.memberId || member.id || member.regNo)}>
                    Copy ID
                  </button>
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label fw-bold text-muted mb-1">
                  Registration Number
                </label>
                <p className="fs-5 fw-bold">
                  {member.regNo || member.memberId}
                </p>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="mb-4">
            <h5 className="fw-bold text-secondary mb-3">
              📖 Book Details
            </h5>
            <div className="bg-light p-3 rounded d-flex gap-3 align-items-start">
              {/* Small cover placeholder */}
              <div style={{ width: 100, minWidth: 100, height: 140, background: "linear-gradient(135deg,#e9ecef,#dee2e6)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
                📚
              </div>
              <div style={{ flex: 1 }}>
                <div className="mb-2">
                  <label className="form-label fw-bold text-muted mb-1">Book Title</label>
                  <p className="fs-5 fw-bold">{book.title}</p>
                </div>
                <div className="mb-2 d-flex align-items-center justify-content-between">
                  <div>
                    <label className="form-label fw-bold text-muted mb-1">Author</label>
                    <p className="fs-6">{book.author || "Unknown"}</p>
                  </div>
                  <div>
                    <label className="form-label fw-bold text-muted mb-1">Book ID</label>
                    <p className="fs-6">#{book.id}</p>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleCopy(book.id)}>Copy Book ID</button>
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold text-muted mb-1">ISBN</label>
                  <p className="fs-6">{book.isbn || "Not Available"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Borrow Duration */}
          <div className="mb-4">
            <h5 className="fw-bold text-secondary mb-3">
              📅 Borrow Duration
            </h5>
            <div className="bg-light p-3 rounded">
              <div className="mb-2">
                <label className="form-label fw-bold text-muted mb-1">
                  Issue Date
                </label>
                <p className="fs-5 fw-bold">
                  {formatDate(today)}
                </p>
              </div>
              <div className="mb-2">
                <label className="form-label fw-bold text-muted mb-1">
                  Return Date
                </label>
                <p className="fs-5 fw-bold text-danger">
                  {formatDate(returnDate)}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold text-muted mb-1">
                  Duration
                </label>
                <p className="fs-5">{borrowDays} days</p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="alert alert-warning mb-4">
            <small>
              <strong>Terms:</strong> You agree to return this book by the
              specified return date. Late returns may incur additional charges.
            </small>
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2">
            <button
              className="btn btn-success btn-lg fw-bold"
              onClick={handleConfirmBorrow}
              disabled={loading}
            >
              {loading ? "Processing..." : "✓ Confirm & Borrow"}
            </button>

            <button
              className="btn btn-outline-danger btn-lg"
              onClick={onCancelBorrow}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BorrowConfirmPage;
