import React, { useState } from "react";
import { borrowBook } from "../services/borrowService";

function BorrowBook() {

    const [memberId, setMemberId] = useState("");
    const [bookId, setBookId] = useState("");

    const handleBorrow = () => {
        borrowBook(memberId, bookId)
            .then(() => alert("Book Borrowed Successfully"))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Borrow Book</h2>
            <input placeholder="Member ID" onChange={e => setMemberId(e.target.value)} />
            <input placeholder="Book ID" onChange={e => setBookId(e.target.value)} />
            <button onClick={handleBorrow}>Borrow</button>
        </div>
    );
}

export default BorrowBook;
