import React, { useState } from "react";

const BorrowBookPage = ({ member, book, onBackToDepartments, onBorrowSuccess }) => {
  const [borrowDetails, setBorrowDetails] = useState({
    borrowDate: new Date().toISOString().split("T")[0],
    returnDate: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBorrowDetails((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const calculateDays = () => {
    if (borrowDetails.borrowDate && borrowDetails.returnDate) {
      const start = new Date(borrowDetails.borrowDate);
      const end = new Date(borrowDetails.returnDate);
      return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!borrowDetails.returnDate) {
      setError("Please select a return date");
      return;
    }

    if (new Date(borrowDetails.borrowDate) >= new Date(borrowDetails.returnDate)) {
      setError("Return date must be after borrow date");
      return;
    }

    const days = calculateDays();
    if (days > 30) {
      setError("Borrow period cannot exceed 30 days");
      return;
    }

    // Log the successful borrow
    console.log("Book Successfully Borrowed:", {
      memberId: member?.id,
      memberName: member?.name,
      memberEmail: member?.email,
      bookId: book?.id,
      bookTitle: book?.title,
      bookAuthor: book?.author,
      borrowDate: borrowDetails.borrowDate,
      returnDate: borrowDetails.returnDate,
      borrowDays: days
    });

    // Show success and redirect after 2 seconds
    setSuccess(true);
    setTimeout(() => {
      if (onBorrowSuccess) {
        onBorrowSuccess();
      } else {
        onBackToDepartments();
      }
    }, 2000);
  };

  const days = calculateDays();
  const borrowDate = new Date(borrowDetails.borrowDate);
  const returnDate = new Date(borrowDetails.returnDate);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "30px", cursor: "pointer" }} onClick={onBackToDepartments}>
          <span style={{ fontSize: "24px", color: "white" }}>⬅️</span>
          <span style={{ marginLeft: "10px", color: "white", fontSize: "18px", fontWeight: "bold" }}>Back to Books</span>
        </div>

        {/* Success Message */}
        {success && (
          <div style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
            animation: "slideDown 0.5s ease"
          }}>
            ✅ Book borrowed successfully! Redirecting...
          </div>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          alignItems: "start"
        }}>
          {/* Left Side - Book Information */}
          <div>
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              height: "100%"
            }}>
              {/* Book Cover Placeholder */}
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "80px"
              }}>
                📖
              </div>

              {/* Book Details */}
              <div style={{ padding: "30px" }}>
                <h2 style={{ margin: "0 0 15px 0", color: "#333", fontSize: "24px" }}>
                  {book?.title}
                </h2>
                
                <div style={{ marginBottom: "20px" }}>
                  <p style={{ margin: "10px 0", color: "#666", fontSize: "14px" }}>
                    <strong>Author:</strong> {book?.author || "Unknown"}
                  </p>
                  <p style={{ margin: "10px 0", color: "#666", fontSize: "14px" }}>
                    <strong>Category:</strong> {book?.category}
                  </p>
                  <p style={{ margin: "10px 0", color: "#666", fontSize: "14px" }}>
                    <strong>Book ID:</strong> #{book?.id}
                  </p>
                </div>

                {/* Status Badge */}
                <div style={{
                  display: "inline-block",
                  backgroundColor: "#d4edda",
                  color: "#155724",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginTop: "15px"
                }}>
                  ✅ Available for Borrowing
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Borrow Form */}
          <div>
            {/* Member Card */}
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "25px",
              marginBottom: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#333" }}>
                👤 Member Information
              </h3>

              <div style={{
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px"
              }}>
                <p style={{ margin: "10px 0", color: "#666", fontSize: "14px" }}>
                  <strong>ID:</strong> <span style={{ color: "#667eea", fontWeight: "bold" }}>{member?.id}</span>
                </p>
                <p style={{ margin: "10px 0", color: "#666", fontSize: "14px" }}>
                  <strong>Name:</strong> <span style={{ color: "#333", fontWeight: "bold" }}>{member?.name}</span>
                </p>
                <p style={{ margin: "10px 0", color: "#666", fontSize: "14px" }}>
                  <strong>Email:</strong> {member?.email}
                </p>
                <p style={{ margin: "10px 0", color: "#666", fontSize: "14px" }}>
                  <strong>Role:</strong> <span style={{
                    backgroundColor: member?.role === "LIBRARIAN" ? "#007bff" : "#6c757d",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "12px"
                  }}>
                    {member?.role}
                  </span>
                </p>
              </div>
            </div>

            {/* Borrow Form */}
            <form onSubmit={handleSubmit}>
              <div style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "25px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}>
                <h3 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#333" }}>
                  📅 Borrow Details
                </h3>

                {/* Error Message */}
                {error && (
                  <div style={{
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    padding: "12px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                    fontSize: "14px"
                  }}>
                    ❌ {error}
                  </div>
                )}

                {/* Borrow Date */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    color: "#333"
                  }}>
                    📌 Borrow Date
                  </label>
                  <input
                    type="date"
                    name="borrowDate"
                    value={borrowDetails.borrowDate}
                    onChange={handleInputChange}
                    disabled
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid #e0e0e0",
                      borderRadius: "6px",
                      fontSize: "14px",
                      backgroundColor: "#f8f9fa",
                      cursor: "not-allowed"
                    }}
                  />
                  <small style={{ color: "#666", marginTop: "5px", display: "block" }}>
                    Today: {borrowDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </small>
                </div>

                {/* Return Date */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    color: "#333"
                  }}>
                    📌 Return Date
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={borrowDetails.returnDate}
                    onChange={handleInputChange}
                    min={borrowDetails.borrowDate}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid #667eea",
                      borderRadius: "6px",
                      fontSize: "14px",
                      boxSizing: "border-box"
                    }}
                  />
                  {borrowDetails.returnDate && (
                    <small style={{ color: "#666", marginTop: "5px", display: "block" }}>
                      {returnDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </small>
                  )}
                </div>

                {/* Days Calculator */}
                {days > 0 && (
                  <div style={{
                    backgroundColor: "#e7f3ff",
                    border: "2px solid #667eea",
                    borderRadius: "6px",
                    padding: "15px",
                    marginBottom: "20px",
                    textAlign: "center"
                  }}>
                    <p style={{ margin: "0 0 5px 0", color: "#333", fontWeight: "bold", fontSize: "18px" }}>
                      📊 Borrow Duration
                    </p>
                    <p style={{ margin: "5px 0 0 0", color: "#667eea", fontSize: "24px", fontWeight: "bold" }}>
                      {days} day{days !== 1 ? "s" : ""}
                    </p>
                    {days > 30 && <p style={{ margin: "10px 0 0 0", color: "#d32f2f", fontSize: "12px" }}>⚠️ Max 30 days allowed</p>}
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: "14px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      boxShadow: "0 4px 15px rgba(40, 167, 69, 0.3)"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
                  >
                    ✅ Confirm Borrow
                  </button>
                  <button
                    type="button"
                    onClick={onBackToDepartments}
                    style={{
                      flex: 1,
                      padding: "14px",
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      boxShadow: "0 4px 15px rgba(108, 117, 125, 0.3)"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#5a6268"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#6c757d"}
                  >
                    ❌ Cancel
                  </button>
                </div>

                <p style={{
                  textAlign: "center",
                  color: "#999",
                  fontSize: "12px",
                  marginTop: "15px",
                  marginBottom: "0"
                }}>
                  📝 Maximum borrow period is 30 days
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BorrowBookPage;
