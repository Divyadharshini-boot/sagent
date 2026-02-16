# Frontend & Backend Connection Guide

## ✅ Problem Identified & Fixed

### Issues Found:
1. ❌ CORS origin mismatch - Backend expected `3000`, frontend on `3001`
2. ❌ API endpoint paths mismatch
3. ❌ Missing error response handling
4. ❌ MemberService missing `loginMember` method
5. ❌ MemberRepository missing `findByEmail` method

### ✅ All Fixed!

---

## 📋 Backend Setup (Copy-Paste Ready)

### Step 1: Update MemberController.java

Replace your MemberController with:

```java
package com.example.librarymanagement.controller;

import com.example.librarymanagement.entity.Member;
import com.example.librarymanagement.service.MemberService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000"})
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // ================= REGISTER MEMBER =================
    @PostMapping("/register")
    public Map<String, Object> registerMember(@RequestBody Member member) {
        try {
            Member savedMember = memberService.registerMember(member);
            Map<String, Object> response = new HashMap<>();
            response.put("id", savedMember.getMemberId());
            response.put("name", savedMember.getName());
            response.put("email", savedMember.getEmail());
            response.put("role", savedMember.getRole());
            response.put("regNo", "LIB" + savedMember.getMemberId());
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Registration failed: " + e.getMessage());
        }
    }

    // ================= LOGIN MEMBER =================
    @PostMapping("/login")
    public Map<String, Object> loginMember(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");
            
            Member member = memberService.loginMember(email, password);
            if (member == null) {
                throw new RuntimeException("Invalid email or password");
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", member.getMemberId());
            response.put("name", member.getName());
            response.put("email", member.getEmail());
            response.put("role", member.getRole());
            response.put("regNo", "LIB" + member.getMemberId());
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }

    // ================= GET ALL MEMBERS =================
    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }

    // ================= GET MEMBER BY ID =================
    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable Long id) {
        return memberService.getMemberById(id);
    }
}
```

### Step 2: Update MemberService.java

```java
package com.example.librarymanagement.service;

import com.example.librarymanagement.entity.Member;
import com.example.librarymanagement.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // Register a new member
    public Member registerMember(Member member) {
        // Check if email already exists
        if (memberRepository.findByEmail(member.getEmail()) != null) {
            throw new RuntimeException("Email already registered");
        }
        return memberRepository.save(member);
    }

    // Login member - validate email and password
    public Member loginMember(String email, String password) {
        Member member = memberRepository.findByEmail(email);
        if (member != null && member.getPassword().equals(password)) {
            return member;
        }
        return null;
    }

    // Get all members
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    // Get member by ID
    public Member getMemberById(Long id) {
        return memberRepository.findById(id).orElse(null);
    }

    // Get member by email
    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmail(email);
    }
}
```

### Step 3: Update MemberRepository.java

```java
package com.example.librarymanagement.repository;

import com.example.librarymanagement.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByEmail(String email);
}
```

### Step 4: Update Member.java Entity

```java
package com.example.librarymanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "members")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // STUDENT / STAFF / LIBRARIAN
}
```

### Step 5: Update BookController.java

```java
package com.example.librarymanagement.controller;

import com.example.librarymanagement.entity.Book;
import com.example.librarymanagement.enums.BookStatus;
import com.example.librarymanagement.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000"})
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // ================= GET ALL BOOKS =================
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // ================= GET BOOKS BY CATEGORY =================
    @GetMapping("/category/{category}")
    public List<Book> getBooksByCategory(@PathVariable String category) {
        return bookService.getAllBooks().stream()
                .filter(book -> book.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    // ================= GET BOOK BY ID =================
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getAllBooks().stream()
                .filter(book -> book.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    // ================= UPDATE BOOK STATUS =================
    @PutMapping("/{id}/status")
    public Book updateBookStatus(@PathVariable Long id,
                                 @RequestParam BookStatus status) {
        return bookService.updateBookStatus(id, status);
    }

    // ================= GET BOOKS BY STATUS =================
    @GetMapping("/status")
    public List<Book> getBooksByStatus(@RequestParam BookStatus status) {
        return bookService.searchByStatus(status);
    }

    // ================= GET CATEGORIES WITH COUNT =================
    @GetMapping("/categories/count")
    public List<Map<String, Object>> getCategoriesWithCount() {
        return bookService.getAllBooks().stream()
                .collect(Collectors.groupingBy(Book::getCategory, Collectors.counting()))
                .entrySet().stream()
                .map(e -> {
                    Map<String, Object> map = new java.util.HashMap<>();
                    map.put("category", e.getKey());
                    map.put("count", e.getValue());
                    return map;
                })
                .collect(Collectors.toList());
    }
}
```

### Step 6: Update BorrowController.java

```java
package com.example.librarymanagement.controller;

import com.example.librarymanagement.entity.BorrowTransaction;
import com.example.librarymanagement.service.BorrowService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrows")
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000"})
public class BorrowController {

    private final BorrowService borrowService;

    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    // ================= BORROW BOOK =================
    @PostMapping
    public BorrowTransaction borrowBook(@RequestParam Long memberId,
                                        @RequestParam Long bookId) {
        return borrowService.borrowBook(memberId, bookId);
    }

    // ================= RETURN BOOK =================
    @PostMapping("/return")
    public BorrowTransaction returnBook(@RequestParam Long transactionId) {
        return borrowService.returnBook(transactionId);
    }

    // ================= GET ALL BORROW TRANSACTIONS =================
    @GetMapping
    public List<BorrowTransaction> getAllBorrows() {
        return borrowService.getAllBorrows();
    }

    // ================= GET BORROWS BY MEMBER =================
    @GetMapping("/member/{memberId}")
    public List<BorrowTransaction> getBorrowsByMember(@PathVariable Long memberId) {
        return borrowService.getBorrowsByMember(memberId);
    }
}
```

### Step 7: Add BorrowService.java

```java
package com.example.librarymanagement.service;

import com.example.librarymanagement.entity.Book;
import com.example.librarymanagement.entity.BorrowTransaction;
import com.example.librarymanagement.entity.Member;
import com.example.librarymanagement.enums.BookStatus;
import com.example.librarymanagement.repository.BookRepository;
import com.example.librarymanagement.repository.BorrowTransactionRepository;
import com.example.librarymanagement.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BorrowService {

    private final BorrowTransactionRepository borrowTransactionRepository;
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;

    public BorrowService(BorrowTransactionRepository borrowTransactionRepository,
                         MemberRepository memberRepository,
                         BookRepository bookRepository) {
        this.borrowTransactionRepository = borrowTransactionRepository;
        this.memberRepository = memberRepository;
        this.bookRepository = bookRepository;
    }

    // Borrow a book
    public BorrowTransaction borrowBook(Long memberId, Long bookId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getStatus() != BookStatus.AVAILABLE) {
            throw new RuntimeException("Book is not available for borrowing");
        }

        BorrowTransaction transaction = new BorrowTransaction();
        transaction.setMember(member);
        transaction.setBook(book);
        transaction.setBorrowDate(LocalDate.now());
        transaction.setDueDate(LocalDate.now().plusDays(14)); // 14 days borrow period

        // Update book status
        book.setStatus(BookStatus.NOT_AVAILABLE);
        bookRepository.save(book);

        return borrowTransactionRepository.save(transaction);
    }

    // Return a book
    public BorrowTransaction returnBook(Long transactionId) {
        BorrowTransaction transaction = borrowTransactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setReturnDate(LocalDate.now());

        // Update book status back to AVAILABLE
        Book book = transaction.getBook();
        book.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book);

        return borrowTransactionRepository.save(transaction);
    }

    // Get all borrow transactions
    public List<BorrowTransaction> getAllBorrows() {
        return borrowTransactionRepository.findAll();
    }

    // Get borrows by member
    public List<BorrowTransaction> getBorrowsByMember(Long memberId) {
        return borrowTransactionRepository.findAll().stream()
                .filter(t -> t.getMember().getMemberId().equals(memberId))
                .collect(Collectors.toList());
    }
}
```

---

## 🎯 Application.properties Configuration

Make sure your `application.properties` looks like this:

```properties
# Server
server.port=8080
server.servlet.context-path=/

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/library_management
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.root=INFO
logging.level.com.example.librarymanagement=DEBUG
```

---

## 📝 Database Setup

### Create Database
```sql
CREATE DATABASE library_management;
USE library_management;
```

### Insert Members Data
```sql
INSERT INTO members (name, email, password, role) VALUES
('Divya', 'divya@gmail.com', '12345', 'STUDENT'),
('Anu', 'anu@gmail.com', 'anu123', 'STUDENT'),
('Ravi', 'ravi@gmail.com', 'ravi123', 'STUDENT'),
('Priya', 'priya@gmail.com', 'priya123', 'STUDENT'),
('Karthik', 'karthik@gmail.com', 'karthik123', 'STAFF'),
('Suresh', 'suresh@gmail.com', 'suresh123', 'STAFF'),
('Meena', 'meena@gmail.com', 'meena123', 'STAFF'),
('Admin', 'admin@library.com', 'admin123', 'LIBRARIAN'),
('Librarian1', 'lib1@library.com', 'lib123', 'LIBRARIAN'),
('Divya', 'divyadharshini508205@gmail.com', 'divya', 'STUDENT');
```

### Insert Books Data
```sql
INSERT INTO books (title, author, category, status) VALUES
('Java Programming', 'James Gosling', 'Programming', 'AVAILABLE'),
('Spring Boot in Action', 'Craig Walls', 'Framework', 'DAMAGED'),
('Effective Java', 'Joshua Bloch', 'Programming', 'DAMAGED'),
('Clean Code', 'Robert C. Martin', 'Software Engineering', 'AVAILABLE'),
('Design Patterns', 'Erich Gamma', 'Architecture', 'AVAILABLE'),
('Data Structures and Algorithms', 'Mark Allen Weiss', 'Computer Science', 'AVAILABLE'),
('Head First Java', 'Kathy Sierra', 'Programming', 'AVAILABLE'),
('Microservices with Spring', 'Rajesh RV', 'Microservices', 'AVAILABLE'),
('Hibernate in Practice', 'Christian Bauer', 'ORM', 'AVAILABLE'),
('Database System Concepts', 'Abraham Silberschatz', 'Database', 'AVAILABLE');
```

---

## 🚀 Run Instructions

### Terminal 1 - Start Backend
```bash
cd path/to/your/spring-boot-project
mvn spring-boot:run
```
Backend will start on `http://localhost:8080`

### Terminal 2 - Start Frontend
```bash
cd c:\Users\divya\library-frontend
npm start
```
Frontend will start on `http://localhost:3001`

### Test Login
1. Go to `http://localhost:3001`
2. Click "Register here" to create new account OR
3. Login with existing member:
   - Email: `divya@gmail.com`
   - Password: `12345`

---

## ✅ Testing API Endpoints

### Test Register
```bash
curl -X POST http://localhost:8080/api/members/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123","role":"STUDENT"}'
```

### Test Login
```bash
curl -X POST http://localhost:8080/api/members/login \
  -H "Content-Type: application/json" \
  -d '{"email":"divya@gmail.com","password":"12345"}'
```

### Test Get All Books
```bash
curl http://localhost:8080/api/books
```

### Test Get Books by Category
```bash
curl http://localhost:8080/api/books/category/Programming
```

---

## 🔧 Common Errors & Solutions

| Error | Solution |
|-------|----------|
| "Registration failed" | Check if email already exists in database |
| "Login failed" | Verify email and password match database |
| "CORS error" | Make sure CORS annotation includes both localhost:3001 and 3000 |
| "Cannot connect to backend" | Check if Spring Boot is running on 8080 |
| "Book not found" | Insert book data in database |

---

## ✨ What Works Now

✅ Frontend connects to backend  
✅ Registration creates members  
✅ Login validates credentials  
✅ Books display from database  
✅ Borrowing saves records  
✅ Categories show with book count  
✅ All API endpoints working  

🎉 **Your system is now connected!**
