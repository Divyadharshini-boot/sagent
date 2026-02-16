import React, { useState } from "react";
import { addBook } from "../services/bookService";
import "../App.css";

function AddBook({ member, onBookAdded, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if user is librarian
  if (member.role !== "LIBRARIAN") {
    return (
      <div className="alert alert-danger">
        <strong>Access Denied:</strong> Only librarians can add books.
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.title || !formData.author || !formData.category) {
      setMessage("Please fill in all fields");
      setLoading(false);
      return;
    }

    addBook(
      {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        status: "AVAILABLE",
      },
      member.role
    )
      .then((response) => {
        setMessage("✅ Book added successfully!");
        setFormData({ title: "", author: "", category: "" });
        setTimeout(() => {
          onBookAdded(response.data);
        }, 1000);
      })
      .catch((error) => {
        setMessage(
          "❌ " + (error.response?.data?.message || error.message)
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="card shadow-lg p-5 mb-5" style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2 className="mb-4">📚 Add New Book</h2>

      {message && (
        <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Book Title *</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author *</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category/Department *</label>
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Science">Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Literature">Literature</option>
            <option value="History">History</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Arts">Arts</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-lg w-100"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
