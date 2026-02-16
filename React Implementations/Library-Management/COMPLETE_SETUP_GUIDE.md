# Library Management System - Complete Setup Guide

## Project Overview
This is a full-stack Library Management System with:
- **Frontend**: React.js (running on port 3001)
- **Backend**: Spring Boot (expected on port 8080)
- **Database**: MySQL (stores books, members, borrow records)

---

## Frontend Setup (Already Done ✅)

### Installed Dependencies
```bash
npm install
```

### Running the Frontend
```bash
npm start
```
The app will open at `http://localhost:3001`

### Project Structure
```
src/
├── components/
│   ├── LoginPage.js              # Login form
│   ├── RegisterPage.js           # Registration form
│   ├── DepartmentPage.js         # Department/Category list
│   ├── DepartmentBooksPage.js    # Books in category
│   ├── BookDetailPage.js         # Book details
│   ├── BorrowConfirmPage.js      # Confirm borrow
│   └── BorrowSuccessPage.js      # Success message
├── services/
│   └── apiService.js             # All API calls to backend
├── App.js                        # Main app routing
├── App.css                       # Component styles
├── index.css                     # Global styles
└── index.js                      # App entry point
```

---

## Backend Setup (Spring Boot)

### Database Setup

#### 1. Create MySQL Database
```sql
CREATE DATABASE library_management;
USE library_management;
```

#### 2. Create Tables

**Members Table:**
```sql
CREATE TABLE members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    reg_no VARCHAR(50) UNIQUE,
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Books Table:**
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

**Borrows Table:**
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

#### 3. Insert Sample Books
```sql
INSERT INTO books (title, author, category, isbn, status) VALUES
('Java Programming', 'James Gosling', 'Programming', '978-0-123456-78-9', 'AVAILABLE'),
('Spring Boot in Action', 'Craig Walls', 'Framework', '978-1-617292-95-7', 'DAMAGED'),
('Effective Java', 'Joshua Bloch', 'Programming', '978-0-134686-19-4', 'DAMAGED'),
('Clean Code', 'Robert C. Martin', 'Software Engineering', '978-0-132350-88-4', 'AVAILABLE'),
('Design Patterns', 'Erich Gamma', 'Architecture', '978-0-201633-61-0', 'AVAILABLE'),
('Data Structures and Algorithms', 'Mark Allen Weiss', 'Computer Science', '978-0-201361-20-9', 'AVAILABLE'),
('Head First Java', 'Kathy Sierra', 'Programming', '978-0-596004-65-6', 'AVAILABLE'),
('Microservices with Spring', 'Rajesh RV', 'Microservices', '978-1-491950-53-8', 'AVAILABLE'),
('Hibernate in Practice', 'Christian Bauer', 'ORM', '978-1-617292-99-5', 'AVAILABLE'),
('Database System Concepts', 'Abraham Silberschatz', 'Database', '978-0-078022-15-4', 'AVAILABLE');
```

### Spring Boot Project Setup

#### 1. Create Spring Boot Project
Use Spring Boot Starter or create manually with:
- Spring Web
- Spring Data JPA
- MySQL Driver
- Lombok (optional)

#### 2. Application Properties
In `application.properties`:
```properties
# Server
server.port=8080
server.servlet.context-path=/

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/library_management
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.root=INFO
logging.level.com.library=DEBUG
```

#### 3. Entity Classes

**Member Entity:**
```java
@Entity
@Table(name = "members")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String name;
    private String email;
    private String password;
    
    @Column(name = "reg_no")
    private String regNo;
    
    private String role;
    
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
```

**Book Entity:**
```java
@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String title;
    private String author;
    private String category;
    private String isbn;
    private String status;
}
```

**Borrow Entity:**
```java
@Entity
@Table(name = "borrows")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Borrow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "member_id")
    private Integer memberId;
    
    @Column(name = "book_id")
    private Integer bookId;
    
    @Column(name = "issue_date")
    private LocalDate issueDate;
    
    @Column(name = "return_date")
    private LocalDate returnDate;
    
    @Column(name = "actual_return_date")
    private LocalDate actualReturnDate;
    
    private String status;
}
```

#### 4. Repository Interfaces

**MemberRepository:**
```java
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findByEmail(String email);
}
```

**BookRepository:**
```java
public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByCategory(String category);
    List<Book> findByStatus(String status);
}
```

**BorrowRepository:**
```java
public interface BorrowRepository extends JpaRepository<Borrow, Integer> {
    List<Borrow> findByMemberId(Integer memberId);
    List<Borrow> findByStatus(String status);
}
```

#### 5. Service Layer

**MemberService:**
```java
@Service
@Transactional
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;
    
    public Member register(Member member) {
        member.setRegNo("LIB" + System.currentTimeMillis());
        member.setPassword(member.getPassword()); // In production, hash the password!
        return memberRepository.save(member);
    }
    
    public Member login(String email, String password) {
        Member member = memberRepository.findByEmail(email);
        if (member != null && member.getPassword().equals(password)) {
            return member;
        }
        throw new RuntimeException("Invalid credentials");
    }
    
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
}
```

**BookService:**
```java
@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    public List<Book> getBooksByCategory(String category) {
        return bookRepository.findByCategory(category);
    }
    
    public Book getBookById(Integer id) {
        return bookRepository.findById(id).orElse(null);
    }
}
```

**BorrowService:**
```java
@Service
@Transactional
public class BorrowService {
    @Autowired
    private BorrowRepository borrowRepository;
    
    public Borrow createBorrow(Borrow borrow) {
        borrow.setStatus("ACTIVE");
        return borrowRepository.save(borrow);
    }
    
    public List<Borrow> getBorrowsByMember(Integer memberId) {
        return borrowRepository.findByMemberId(memberId);
    }
}
```

#### 6. REST Controllers

**MemberController:**
```java
@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:3001")
public class MemberController {
    @Autowired
    private MemberService memberService;
    
    @PostMapping("/register")
    public ResponseEntity<Member> register(@RequestBody Member member) {
        return ResponseEntity.ok(memberService.register(member));
    }
    
    @PostMapping("/login")
    public ResponseEntity<Member> login(@RequestBody Map<String, String> credentials) {
        try {
            Member member = memberService.login(
                credentials.get("email"), 
                credentials.get("password")
            );
            return ResponseEntity.ok(member);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }
}
```

**BookController:**
```java
@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3001")
public class BookController {
    @Autowired
    private BookService bookService;
    
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }
    
    @GetMapping("/category/{category}")
    public List<Book> getBooksByCategory(@PathVariable String category) {
        return bookService.getBooksByCategory(category);
    }
    
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Integer id) {
        return bookService.getBookById(id);
    }
}
```

**BorrowController:**
```java
@RestController
@RequestMapping("/api/borrows")
@CrossOrigin(origins = "http://localhost:3001")
public class BorrowController {
    @Autowired
    private BorrowService borrowService;
    
    @PostMapping
    public ResponseEntity<Borrow> createBorrow(@RequestBody Borrow borrow) {
        return ResponseEntity.ok(borrowService.createBorrow(borrow));
    }
    
    @GetMapping("/member/{memberId}")
    public List<Borrow> getBorrowsByMember(@PathVariable Integer memberId) {
        return borrowService.getBorrowsByMember(memberId);
    }
}
```

**CategoryController:**
```java
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3001")
public class CategoryController {
    @Autowired
    private BookRepository bookRepository;
    
    @GetMapping("/count")
    public List<Map<String, Object>> getBookCountByCategory() {
        return bookRepository.findAll().stream()
            .collect(Collectors.groupingBy(Book::getCategory, Collectors.counting()))
            .entrySet().stream()
            .map(e -> {
                Map<String, Object> map = new HashMap<>();
                map.put("category", e.getKey());
                map.put("count", e.getValue());
                return map;
            })
            .collect(Collectors.toList());
    }
    
    @GetMapping
    public List<String> getAllCategories() {
        return bookRepository.findAll().stream()
            .map(Book::getCategory)
            .distinct()
            .collect(Collectors.toList());
    }
}
```

---

## Connection Testing

### 1. Test Member Registration (Postman/cURL)
```bash
POST http://localhost:8080/api/members/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "STUDENT"
}
```

### 2. Test Member Login
```bash
POST http://localhost:8080/api/members/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Test Get Books by Category
```bash
GET http://localhost:8080/api/books/category/Programming
```

### 4. Test Create Borrow
```bash
POST http://localhost:8080/api/borrows
Content-Type: application/json

{
  "memberId": 1,
  "bookId": 1,
  "issueDate": "2025-02-14",
  "returnDate": "2025-02-28",
  "status": "ACTIVE"
}
```

---

## Running Both Frontend & Backend

### Terminal 1 - Start Backend
```bash
cd your-spring-boot-project
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

### Terminal 2 - Start Frontend
```bash
cd library-frontend
npm start
```
Frontend runs on: `http://localhost:3001`

---

## Flow Walkthrough

1. **User opens** `http://localhost:3001`
2. **Login Page loads** - User can login or register
3. **Register** → Creates new member in `members` table → Auto-generates `regNo`
4. **Login** → Queries member from `members` table → Redirects to departments
5. **Department Page** → Fetches all categories from books table
6. **Select Category** → Fetches books from that category
7. **Select Book** → Shows book details
8. **Borrow Book** → Creates record in `borrows` table
9. **Success Page** → Shows confirmation with dates

---

## Frontend API Configuration

If your backend is on a different URL, update in `src/services/apiService.js`:
```javascript
const API_BASE_URL = "http://your-backend-url/api";
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| CORS Error | Add CORS configuration to Spring Boot |
| 404 on API calls | Verify Spring Boot is running on 8080 |
| Database connection failed | Check MySQL credentials in `application.properties` |
| "No books found" | Insert sample data in `books` table |
| Can't login | Check password hashing (or remove for testing) |

---

## Next Steps

1. ✅ Frontend is ready
2. 🔄 Create Spring Boot backend with the code above
3. 🔄 Set up MySQL database with sample data
4. 🔄 Run both applications
5. 🔄 Test the complete flow

All data will be stored in the database and synced between frontend and backend! 🚀
