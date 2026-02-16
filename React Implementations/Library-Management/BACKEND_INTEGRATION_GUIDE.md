# Library Management System - Backend Configuration Guide

## Overview
This React frontend is configured to communicate with a Spring Boot backend API. This guide explains how to set up and connect your Spring Boot backend with this frontend.

## Frontend API Configuration

### Base URL Configuration
The frontend API calls are configured in `src/services/apiService.js`:

```javascript
const API_BASE_URL = "http://localhost:8080/api";
```

**Change this URL to match your Spring Boot backend URL** if it's running on a different port or host.

## Required Spring Boot API Endpoints

### 1. **Member Management Endpoints**

#### Login
- **POST** `/api/members/login`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "user@example.com",
  "regNo": "LIB001",
  "role": "STUDENT"
}
```

#### Register
- **POST** `/api/members/register`
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "STUDENT"
}
```
- **Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "regNo": "LIB001",
  "role": "STUDENT"
}
```

#### Get All Members
- **GET** `/api/members`
- **Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "regNo": "LIB001",
    "role": "STUDENT"
  }
]
```

#### Get Member by ID
- **GET** `/api/members/{id}`
- **Response:** Single member object

---

### 2. **Book Management Endpoints**

#### Get Books by Category
- **GET** `/api/books/category/{category}`
- **Response:**
```json
[
  {
    "id": 1,
    "title": "Java Programming",
    "author": "James Gosling",
    "category": "Programming",
    "isbn": "978-0-123456-78-9",
    "status": "AVAILABLE"
  },
  {
    "id": 2,
    "title": "Spring Boot in Action",
    "author": "Craig Walls",
    "category": "Framework",
    "isbn": "978-1-617292-95-7",
    "status": "DAMAGED"
  }
]
```

#### Get All Books
- **GET** `/api/books`
- **Response:** Array of book objects

#### Get Book by ID
- **GET** `/api/books/{id}`
- **Response:** Single book object

---

### 3. **Category/Department Endpoints**

#### Get Book Count by Category
- **GET** `/api/categories/count`
- **Response:**
```json
[
  {
    "category": "Programming",
    "count": 8
  },
  {
    "category": "Framework",
    "count": 5
  },
  {
    "category": "Database",
    "count": 3
  }
]
```

#### Get All Categories
- **GET** `/api/categories`
- **Response:**
```json
[
  "Programming",
  "Framework",
  "Database",
  "Architecture"
]
```

---

### 4. **Borrow Management Endpoints**

#### Create Borrow Record
- **POST** `/api/borrows`
- **Request Body:**
```json
{
  "memberId": 1,
  "bookId": 1,
  "issueDate": "2025-02-14",
  "returnDate": "2025-02-28",
  "status": "ACTIVE"
}
```
- **Response:**
```json
{
  "id": 1,
  "memberId": 1,
  "bookId": 1,
  "issueDate": "2025-02-14",
  "returnDate": "2025-02-28",
  "status": "ACTIVE"
}
```

#### Get Borrow Records by Member
- **GET** `/api/borrows/member/{memberId}`
- **Response:** Array of borrow records

#### Get All Borrows
- **GET** `/api/borrows`
- **Response:** Array of all borrow records

#### Return a Book
- **PUT** `/api/borrows/{id}/return`
- **Request Body:**
```json
{
  "returnDate": "2025-02-28",
  "status": "RETURNED"
}
```

---

## Sample Book Data

Here's the sample book data you provided that should be in your database:

```json
[
  {
    "id": 1,
    "title": "Java Programming",
    "author": "James Gosling",
    "category": "Programming",
    "status": "AVAILABLE"
  },
  {
    "id": 2,
    "title": "Spring Boot in Action",
    "author": "Craig Walls",
    "category": "Framework",
    "status": "DAMAGED"
  },
  {
    "id": 3,
    "title": "Effective Java",
    "author": "Joshua Bloch",
    "category": "Programming",
    "status": "DAMAGED"
  },
  {
    "id": 4,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "category": "Software Engineering",
    "status": "AVAILABLE"
  },
  {
    "id": 5,
    "title": "Design Patterns",
    "author": "Erich Gamma",
    "category": "Architecture",
    "status": "AVAILABLE"
  },
  {
    "id": 6,
    "title": "Data Structures and Algorithms",
    "author": "Mark Allen Weiss",
    "category": "Computer Science",
    "status": "AVAILABLE"
  },
  {
    "id": 7,
    "title": "Head First Java",
    "author": "Kathy Sierra",
    "category": "Programming",
    "status": "AVAILABLE"
  },
  {
    "id": 8,
    "title": "Microservices with Spring",
    "author": "Rajesh RV",
    "category": "Microservices",
    "status": "AVAILABLE"
  },
  {
    "id": 9,
    "title": "Hibernate in Practice",
    "author": "Christian Bauer",
    "category": "ORM",
    "status": "AVAILABLE"
  },
  {
    "id": 10,
    "title": "Database System Concepts",
    "author": "Abraham Silberschatz",
    "category": "Database",
    "status": "AVAILABLE"
  }
]
```

---

## Spring Boot Dependencies

Add these dependencies to your `pom.xml`:

```xml
<!-- Spring Boot Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Boot Data JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- MySQL Driver -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

---

## Spring Boot Application Properties

Configure `application.properties`:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/library_management
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# CORS Configuration (important for frontend)
spring.web.cors.allowed-origins=http://localhost:3001
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

---

## Database Schema

### Books Table
```sql
CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    isbn VARCHAR(20),
    status VARCHAR(50) DEFAULT 'AVAILABLE'
);
```

### Members Table
```sql
CREATE TABLE members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    regNo VARCHAR(50) UNIQUE,
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Borrows Table
```sql
CREATE TABLE borrows (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    book_id INT NOT NULL,
    issue_date DATE NOT NULL,
    return_date DATE NOT NULL,
    actual_return_date DATE,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);
```

---

## Testing the Integration

### 1. Start Spring Boot Backend
```bash
mvn spring-boot:run
```
The backend should be running on `http://localhost:8080`

### 2. Start React Frontend
```bash
npm start
```
The frontend should be running on `http://localhost:3001`

### 3. Test the Flow
1. Register a new member
2. Login with registered credentials
3. Browse departments (categories)
4. Select a department to view books
5. Click on a book to view details
6. Borrow a book (this creates a record in the database)
7. Verify the data in your Spring Boot database

---

## Frontend Structure

- **LoginPage.js** - Login form with API call
- **RegisterPage.js** - Registration form with API call
- **DepartmentPage.js** - Lists all departments (fetches categories from API)
- **DepartmentBooksPage.js** - Shows books for selected department (fetches from API)
- **BookDetailPage.js** - Shows book details
- **BorrowConfirmPage.js** - Confirmation page (creates borrow record via API)
- **BorrowSuccessPage.js** - Success message page
- **apiService.js** - All API calls to Spring Boot backend

---

## Troubleshooting

### CORS Error
If you see CORS errors, ensure your Spring Boot backend has CORS configured:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3001")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*");
            }
        };
    }
}
```

### API Connection Error
Check that:
1. Spring Boot is running on `http://localhost:8080`
2. Database is connected properly
3. API endpoints match the paths in `apiService.js`

---

## Next Steps

Once integrated with your Spring Boot backend, the application will:
✅ Fetch real books from database
✅ Create new member records in database
✅ Save borrow records with dates
✅ Display real-time data updates
✅ Sync all changes between frontend and backend
