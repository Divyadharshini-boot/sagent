import axios from "axios";

// Configure your Spring Boot backend URL here
// Make sure your Spring Boot is running on http://localhost:8080
const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// ============ BOOK SERVICES ============
export const bookService = {
  // Get all books
  getAllBooks: () => {
    return api.get("/books");
  },

  // Get books by category/department
  getBooksByCategory: (category) => {
    return api.get(`/books/category/${category}`);
  },

  // Get a single book by ID
  getBookById: (id) => {
    return api.get(`/books/${id}`);
  },

  // Create a new book (Librarian only)
  createBook: (bookData, userRole) => {
    if (userRole !== "LIBRARIAN") {
      return Promise.reject(new Error("Only librarians can add books"));
    }
    return api.post("/books", bookData, {
      headers: { "X-User-Role": userRole }
    });
  },

  // Update book status (Librarian only)
  updateBookStatus: (id, statusData, userRole) => {
    if (userRole !== "LIBRARIAN") {
      return Promise.reject(new Error("Only librarians can update book status"));
    }
    return api.put(`/books/${id}/status`, statusData, {
      headers: { "X-User-Role": userRole }
    });
  },

  // Delete a book (Librarian only)
  deleteBook: (id, userRole) => {
    if (userRole !== "LIBRARIAN") {
      return Promise.reject(new Error("Only librarians can delete books"));
    }
    return api.delete(`/books/${id}`, {
      headers: { "X-User-Role": userRole }
    });
  },

  // Get books by status
  getBooksByStatus: (status) => {
    return api.get(`/books/status/${status}`);
  }
};

// ============ MEMBER SERVICES ============
export const memberService = {
  // Register a new member
  registerMember: (memberData) => {
    return api.post("/members/register", memberData);
  },

  // Login member
  loginMember: (email, password) => {
    return api.post("/members/login", { email, password });
  },

  // Get all members
  getAllMembers: () => {
    return api.get("/members");
  },

  // Get a single member by ID
  getMemberById: (id) => {
    return api.get(`/members/${id}`);
  },

  // Get member by email
  getMemberByEmail: (email) => {
    return api.get(`/members/email/${email}`);
  },

  // Update member details
  updateMember: (id, memberData) => {
    return api.put(`/members/${id}`, memberData);
  },

  // Delete a member
  deleteMember: (id) => {
    return api.delete(`/members/${id}`);
  }
};

// ============ BORROW SERVICES ============
export const borrowService = {
  // Create a new borrow record
  createBorrow: (borrowData) => {
    return api.post("/borrows", borrowData);
  },

  // Get all borrow records
  getAllBorrows: () => {
    return api.get("/borrows");
  },

  // Get borrow records for a specific member
  getBorrowsByMember: (memberId) => {
    return api.get(`/borrows/member/${memberId}`);
  },

  // Get a single borrow record by ID
  getBorrowById: (id) => {
    return api.get(`/borrows/${id}`);
  },

  // Return a borrowed book
  returnBorrow: (id, returnData) => {
    return api.put(`/borrows/${id}/return`, returnData);
  },

  // Get active borrows (not yet returned)
  getActiveBorrows: () => {
    return api.get("/borrows/active");
  }
};

// ============ CATEGORY/DEPARTMENT SERVICES ============
export const categoryService = {
  // Get all categories
  getAllCategories: () => {
    return api.get("/categories");
  },

  // Get books count by category
  getBookCountByCategory: () => {
    return api.get("/categories/count");
  }
};

export default api;
