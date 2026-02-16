import axios from "axios";

const BASE_URL = "http://localhost:8080/api/books";

// Get all books
export const getAllBooks = () => {
    return axios.get(BASE_URL);
};

// Get books by category
export const getBooksByCategory = (category) => {
    return axios.get(`${BASE_URL}/category/${category}`);
};

// Add a new book (Librarian only)
export const addBook = (bookData, role) => {
    if (role !== "LIBRARIAN") {
        return Promise.reject(new Error("Only librarians can add books"));
    }
    return axios.post(BASE_URL, bookData, {
        headers: { "X-User-Role": role }
    });
};

// Delete a book (Librarian only)
export const deleteBook = (bookId, role) => {
    if (role !== "LIBRARIAN") {
        return Promise.reject(new Error("Only librarians can delete books"));
    }
    return axios.delete(`${BASE_URL}/${bookId}`, {
        headers: { "X-User-Role": role }
    });
};

// Mark book as damaged (Librarian only)
export const markBookAsDamaged = (bookId, role) => {
    if (role !== "LIBRARIAN") {
        return Promise.reject(new Error("Only librarians can mark books as damaged"));
    }
    return axios.put(`${BASE_URL}/${bookId}/status`, 
        { status: "DAMAGED" },
        { headers: { "X-User-Role": role } }
    );
};

// Update book status
export const updateBookStatus = (id, status) => {
    return axios.put(`${BASE_URL}/${id}/status`, { status });
};

// Get books by status
export const getBooksByStatus = (status) => {
    return axios.get(`${BASE_URL}/status/${status}`);
};
