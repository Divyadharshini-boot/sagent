📚 Library Management System

A Spring Boot based Library Management System that provides REST APIs to manage books, members, and borrowing transactions in a library.

This project demonstrates backend development using Java, Spring Boot, and MySQL with a layered architecture.

**PROJECT OVERVIEW**

The system allows:

📖 Managing books in the library

👤 Registering members

🔄 Borrowing books

↩️ Returning books

✅ Tracking book availability status

The application follows a RESTful API architecture using:

Controller → Service → Repository → Database

🛠️ Tech Stack

1,Java

2.Spring Boot

3.Spring Data JPA

4.Hibernate

5.MySQL

6.Maven

7.Postman (API Testing)

🌐 API Endpoints (Postman Testing)

The following REST APIs can be tested using Postman.

Base URL:

http://localhost:8080

📚 1. Get All Books

Retrieve all books available in the library.

Method: GET

http://localhost:8080/books

👤 2. Get All Members

Retrieve all registered library members.

Method: GET

http://localhost:8080/members

🔄 3. Borrow a Book

Allows a member to borrow a book if it is available.

Method: POST

http://localhost:8080/borrow?memberId=4&bookId=7


✅ Book status changes to NOT_AVAILABLE after borrowing.

↩️ 4. Return a Book

Returns a borrowed book back to the library.

Method: POST

http://localhost:8080/borrow/return?transactionId=5


✅ Book status becomes AVAILABLE again.

❌ 5. Borrowing a Damaged Book (Not Allowed)

System prevents borrowing books marked as DAMAGED.

Method: POST

http://localhost:8080/borrow?memberId=4&bookId=3


🚫 Borrow request will be rejected.

⚠️ 6. Mark Book as Damaged

Updates book condition to damaged.

Method: PUT

http://localhost:8080/books/2/status?status=DAMAGED

✅ 7. Mark Book as Available Again

Changes book status back to available.

Method: PUT

http://localhost:8080/books/2/status?status=AVAILABLE

🧪 Testing Tool

APIs were tested using:

✅ Postman

Screenshot

<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/28ec3ece-8455-4383-b760-427112b7f4ad" />


