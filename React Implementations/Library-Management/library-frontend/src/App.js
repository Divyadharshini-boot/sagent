import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DepartmentPage from "./components/DepartmentPage";
import DepartmentBooksPage from "./components/DepartmentBooksPage";
import BorrowBookPage from "./components/BorrowBookPage";
import BookDetailPage from "./components/BookDetailPage";
import BorrowConfirmPage from "./components/BorrowConfirmPage";
import BorrowSuccessPage from "./components/BorrowSuccessPage";
import AddBook from "./components/AddBook";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [member, setMember] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  // ============ AUTHENTICATION FLOWS ============
  const handleLoginSuccess = (memberData) => {
    setMember(memberData);
    setCurrentPage("departments");
  };

  const handleRegisterSuccess = (memberData) => {
    setMember(memberData);
    setCurrentPage("departments");
  };

  const handleLogout = () => {
    setMember(null);
    setSelectedDepartment(null);
    setSelectedBook(null);
    setCurrentPage("login");
  };

  // ============ DEPARTMENT & BOOK FLOWS ============
  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
    setCurrentPage("departmentBooks");
  };

  const handleBackToDepartments = () => {
    setSelectedDepartment(null);
    setSelectedBook(null);
    setCurrentPage("departments");
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setCurrentPage("bookDetail");
  };

  const handleBackToBooks = () => {
    setSelectedBook(null);
    setCurrentPage("departmentBooks");
  };

  // ============ BOOK MANAGEMENT FLOWS (LIBRARIAN ONLY) ============
  const handleAddBookClick = () => {
    setCurrentPage("addBook");
  };

  const handleBookAdded = (newBook) => {
    setCurrentPage("departmentBooks");
  };

  const handleCancelAddBook = () => {
    setCurrentPage("departmentBooks");
  };

  // ============ BORROWING FLOWS ============
  const handleBorrow = (book) => {
    setSelectedBook(book);
    setCurrentPage("borrowConfirm");
  };

  const handleConfirmBorrow = (book) => {
    setCurrentPage("borrowSuccess");
  };

  const handleCancelBorrow = () => {
    setSelectedBook(null);
    setCurrentPage("departmentBooks");
  };

  const handleReturnHome = () => {
    setSelectedDepartment(null);
    setSelectedBook(null);
    setCurrentPage("departments");
  };

  // ============ PAGE RENDERING ============
  return (
    <div className="App">
      {currentPage === "login" && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setCurrentPage("register")}
        />
      )}

      {currentPage === "register" && (
        <RegisterPage
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "departments" && member && (
        <DepartmentPage
          member={member}
          onSelectDepartment={handleSelectDepartment}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "departmentBooks" && member && selectedDepartment && (
        <DepartmentBooksPage
          member={member}
          department={selectedDepartment}
          onSelectBook={handleSelectBook}
          onBorrowBook={handleBorrow}
          onBackToDepartments={handleBackToDepartments}
          onAddBookClick={handleAddBookClick}
        />
      )}

      {currentPage === "addBook" && member && (
        <AddBook
          member={member}
          onBookAdded={handleBookAdded}
          onCancel={handleCancelAddBook}
          onBorrow={handleBorrow}
          onBackToBooks={handleBackToBooks}
        />
      )}

      {currentPage === "borrowConfirm" && member && selectedBook && (
        <BorrowConfirmPage
          member={member}
          book={selectedBook}
          onConfirmBorrow={handleConfirmBorrow}
          onCancelBorrow={handleCancelBorrow}
        />
      )}

      {currentPage === "borrowSuccess" && member && selectedBook && (
        <BorrowSuccessPage
          member={member}
          book={selectedBook}
          onReturnHome={handleReturnHome}
        />
      )}
    </div>
  );
}

export default App;
