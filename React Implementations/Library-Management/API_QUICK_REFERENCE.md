# Quick API Reference - Spring Boot Backend Endpoints

## How to Update apiService.js for Your Backend URL

In `src/services/apiService.js`, change this line to match your backend:
```javascript
const API_BASE_URL = "http://localhost:8080/api";
```

---

## All API Endpoints Your Frontend Expects

### **AUTHENTICATION (Member APIs)**

1. **Register New Member**
   - `POST /api/members/register`
   - Body: `{ name, email, password, role }`
   - Returns: Member object with `id`, `regNo`

2. **Login Member**
   - `POST /api/members/login`
   - Body: `{ email, password }`
   - Returns: Member object with `id`, `name`, `email`, `regNo`, `role`

---

### **BOOKS (Book APIs)**

3. **Get All Books**
   - `GET /api/books`
   - Returns: Array of books

4. **Get Books by Category**
   - `GET /api/books/category/{category}`
   - Example: `/api/books/category/Programming`
   - Returns: Array of books in that category

5. **Get Single Book**
   - `GET /api/books/{id}`
   - Returns: Single book object

---

### **CATEGORIES/DEPARTMENTS**

6. **Get Book Count by Category**
   - `GET /api/categories/count`
   - Returns: Array like:
   ```json
   [
     { "category": "Programming", "count": 8 },
     { "category": "Framework", "count": 5 }
   ]
   ```

7. **Get All Categories**
   - `GET /api/categories`
   - Returns: Array of category names

---

### **BORROWING (Borrow APIs)**

8. **Create Borrow Record**
   - `POST /api/borrows`
   - Body:
   ```json
   {
     "memberId": 1,
     "bookId": 1,
     "issueDate": "2025-02-14",
     "returnDate": "2025-02-28",
     "status": "ACTIVE"
   }
   ```
   - Returns: Borrow object with `id`

9. **Get Borrows for Member**
   - `GET /api/borrows/member/{memberId}`
   - Returns: Array of borrow records

---

## Book Object Structure

```json
{
  "id": 1,
  "title": "Java Programming",
  "author": "James Gosling",
  "category": "Programming",
  "isbn": "978-0-123456-78-9",
  "status": "AVAILABLE"  // or "DAMAGED", "LOST"
}
```

## Member Object Structure

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "regNo": "LIB001",
  "role": "STUDENT"  // or "STAFF", "FACULTY"
}
```

## Borrow Object Structure

```json
{
  "id": 1,
  "memberId": 1,
  "bookId": 1,
  "issueDate": "2025-02-14",
  "returnDate": "2025-02-28",
  "status": "ACTIVE"  // or "RETURNED", "OVERDUE"
}
```

---

## Book Status Values

- `AVAILABLE` - Book is available for borrowing (shown with ✓ green badge)
- `DAMAGED` - Book is damaged (shown with ⚠ yellow badge)
- `LOST` - Book is lost (shown with ✗ red badge)

---

## Category Names to Support

- Programming
- Framework
- Database
- Architecture
- Software Engineering
- Computer Science
- ORM
- Microservices

---

## Testing Your API

### Step 1: Register a Member
```bash
POST http://localhost:8080/api/members/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "STUDENT"
}
```

### Step 2: Login
```bash
POST http://localhost:8080/api/members/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Step 3: Get Categories
```bash
GET http://localhost:8080/api/categories/count
```

### Step 4: Get Books by Category
```bash
GET http://localhost:8080/api/books/category/Programming
```

### Step 5: Create Borrow Record
```bash
POST http://localhost:8080/api/borrows
{
  "memberId": 1,
  "bookId": 1,
  "issueDate": "2025-02-14",
  "returnDate": "2025-02-28",
  "status": "ACTIVE"
}
```

---

## CORS Configuration Needed

Your Spring Boot backend must have CORS enabled for `http://localhost:3001`:

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
                    .allowedMethods("*")
                    .allowedHeaders("*");
            }
        };
    }
}
```

---

## Important Notes

1. **Login Response Must Include**: `id`, `name`, `email`, `regNo` (registration number)
2. **Books Use "category" Field**: Not "department"
3. **Book Status Field**: Use UPPERCASE status values
4. **Dates Format**: Use `YYYY-MM-DD` format for dates in requests
5. **Member Registration Number**: Should be auto-generated as `LIB + some number`

---

## Frontend Components & Their API Calls

| Component | API Calls |
|-----------|-----------|
| LoginPage | POST /api/members/login |
| RegisterPage | POST /api/members/register |
| DepartmentPage | GET /api/categories/count |
| DepartmentBooksPage | GET /api/books/category/{category} |
| BookDetailPage | (no API call, uses passed data) |
| BorrowConfirmPage | POST /api/borrows |
| BorrowSuccessPage | (no API call, displays data) |
