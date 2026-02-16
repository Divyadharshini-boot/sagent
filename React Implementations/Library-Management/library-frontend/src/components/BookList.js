import React, { useEffect, useState } from "react";
import { getAllBooks, deleteBook, markBookAsDamaged } from "../services/bookService";

function BookList({ member, onAddBookClick }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    setLoading(true);
    getAllBooks()
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading books:", error);
        setMessage("❌ Failed to load books");
        setLoading(false);
      });
  };

  const handleDelete = (book) => {
    if (!member || member.role !== "LIBRARIAN") {
      setMessage("❌ Only librarians can delete books");
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      deleteBook(book.id, member.role)
        .then(() => {
          setBooks(books.filter((b) => b.id !== book.id));
          setMessage("✅ Book deleted successfully");
          setTimeout(() => setMessage(""), 3000);
        })
        .catch((error) => {
          setMessage("❌ " + (error.response?.data?.message || error.message));
        });
    }
  };

  const handleMarkDamaged = (book) => {
    if (!member || member.role !== "LIBRARIAN") {
      setMessage("❌ Only librarians can mark books as damaged");
      return;
    }

    if (
      window.confirm(
        `Mark "${book.title}" as damaged? Damaged books cannot be borrowed.`
      )
    ) {
      markBookAsDamaged(book.id, member.role)
        .then((response) => {
          setBooks(
            books.map((b) => (b.id === book.id ? response.data : b))
          );
          setMessage("✅ Book marked as damaged");
          setTimeout(() => setMessage(""), 3000);
        })
        .catch((error) => {
          setMessage("❌ " + (error.response?.data?.message || error.message));
        });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "AVAILABLE":
        return <span className="badge bg-success">Available</span>;
      case "BORROWED":
        return <span className="badge bg-warning">Borrowed</span>;
      case "DAMAGED":
        return <span className="badge bg-danger">Damaged</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (loading) {
    return <div className="alert alert-info">Loading books...</div>;
  }

  if (books.length === 0) {
    return (
      <div className="alert alert-warning">
        No books available in the library.
      </div>
    );
  }

  return (
    <div className="book-list-container">
      {message && (
        <div
          className={`alert ${
            message.includes("✅") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}

      {member?.role === "LIBRARIAN" && (
        <button
          className="btn btn-success btn-lg mb-3"
          onClick={onAddBookClick}
        >
          ➕ Add New Book
        </button>
      )}

      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              {member?.role === "LIBRARIAN" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>
                  <strong>{book.title}</strong>
                </td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{getStatusBadge(book.status)}</td>
                {member?.role === "LIBRARIAN" && (
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleMarkDamaged(book)}
                      title="Mark as damaged"
                    >
                      🔧 Damage
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(book)}
                      title="Delete this book"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {member?.role !== "LIBRARIAN" && (
        <div className="alert alert-info mt-3">
          <small>
            📌 <strong>Note:</strong> Only librarians can add, delete, or
            modify books. Damaged books cannot be borrowed.
          </small>
        </div>
      )}
    </div>
  );
}

export default BookList;
