import React, { useEffect, useState } from "react";
import axios from "axios";

const DepartmentBooksPage = ({ department, member, onBackToDepartments, onAddBookClick, onBorrowBook }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch all books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/books");
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Filter books based on department category
  const filteredBooks = books.filter(
    (book) =>
      book.category &&
      book.category.toLowerCase() === (department?.name || department)?.toLowerCase()
  );

  // Handle Borrow button click
  const handleBorrowClick = (book) => {
    if (book.status === "DAMAGED") {
      setMessage("❌ This book is damaged and cannot be borrowed");
      return;
    }
    // Navigate to borrow page
    onBorrowBook(book);
  };

  return (
    <div className="department-books-page">
      {/* Header with Title and Add Book Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ margin: 0 }}>📚 {department?.name || department} Books</h2>
        {member?.role === "LIBRARIAN" && (
          <button 
            className="btn btn-primary" 
            onClick={onAddBookClick}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            ➕ Add Book
          </button>
        )}
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`} style={{ marginBottom: "20px" }}>
          {message}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <p>Loading books...</p>
      ) : filteredBooks.length > 0 ? (
        <>
          {/* Book Count */}
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
            📖 {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""} available
          </p>

          {/* Books Grid */}
          <div className="books-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}>
            {filteredBooks.map((book) => (
              <div key={book.id} className="book-card" style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <h4 style={{ marginTop: 0, marginBottom: "10px" }}>{book.title}</h4>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Author:</strong> {book.author || "Unknown"}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Category:</strong> {book.category}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Status:</strong> 
                    <span style={{
                      marginLeft: "8px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      backgroundColor: book.status === "AVAILABLE" ? "#d4edda" : book.status === "DAMAGED" ? "#f8d7da" : "#e2e3e5",
                      color: book.status === "AVAILABLE" ? "#155724" : book.status === "DAMAGED" ? "#721c24" : "#383d41"
                    }}>
                      {book.status}
                    </span>
                  </p>
                </div>

                {/* Borrow Button */}
                <button
                  className="btn btn-primary"
                  onClick={() => handleBorrowClick(book)}
                  disabled={book.status !== "AVAILABLE"}
                  style={{
                    marginTop: "15px",
                    padding: "10px",
                    backgroundColor: book.status === "AVAILABLE" ? "#007bff" : "#ccc",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: book.status === "AVAILABLE" ? "pointer" : "not-allowed",
                    fontSize: "14px"
                  }}
                >
                  📖 Borrow Book
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No books available in this department.</p>
      )}

      {/* Borrow Modal Removed - Now uses dedicated BorrowBookPage */}

      {/* Back Button */}
      <button
        className="btn btn-secondary"
        onClick={onBackToDepartments}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px"
        }}
      >
        ⬅️ Back to Departments
      </button>
    </div>
  );
};

export default DepartmentBooksPage;
