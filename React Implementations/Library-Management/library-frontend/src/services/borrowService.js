import axios from "axios";

const BASE_URL = "http://localhost:8080/borrow";

export const borrowBook = (memberId, bookId) => {
    return axios.post(`${BASE_URL}?memberId=${memberId}&bookId=${bookId}`);
};

export const returnBook = (transactionId) => {
    return axios.post(`${BASE_URL}/return?transactionId=${transactionId}`);
};
