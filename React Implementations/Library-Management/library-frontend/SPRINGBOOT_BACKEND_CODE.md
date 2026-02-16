# Spring Boot Backend - Copy-Paste Code

This file contains complete Spring Boot code ready to copy-paste for the Library Management System.

---

## 1. POM.XML - Dependencies

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.library</groupId>
    <artifactId>library-management-system</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.0.0</version>
        <relativePath/>
    </parent>

    <dependencies>
        <!-- Spring Boot Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- MySQL Connector -->
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

        <!-- Spring Boot Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

---

## 2. Application Properties

Create `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/library_management
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.root=INFO
logging.level.com.library=DEBUG
```

---

## 3. Entity Classes

### Member.java
Create `src/main/java/com/library/entity/Member.java`:

```java
package com.library.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "members")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(name = "reg_no", unique = true)
    private String regNo;
    
    @Column(nullable = false)
    private String role;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (regNo == null) {
            regNo = "LIB" + System.currentTimeMillis();
        }
    }
}
```

### Book.java
Create `src/main/java/com/library/entity/Book.java`:

```java
package com.library.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String author;
    
    @Column(nullable = false)
    private String category;
    
    @Column(length = 20)
    private String isbn;
    
    @Column(nullable = false)
    private String status = "AVAILABLE";
}
```

### Borrow.java
Create `src/main/java/com/library/entity/Borrow.java`:

```java
package com.library.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "borrows")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Borrow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "member_id", nullable = false)
    private Integer memberId;
    
    @Column(name = "book_id", nullable = false)
    private Integer bookId;
    
    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;
    
    @Column(name = "return_date", nullable = false)
    private LocalDate returnDate;
    
    @Column(name = "actual_return_date")
    private LocalDate actualReturnDate;
    
    @Column(nullable = false)
    private String status = "ACTIVE";
}
```

---

## 4. Repository Interfaces

### MemberRepository.java
Create `src/main/java/com/library/repository/MemberRepository.java`:

```java
package com.library.repository;

import com.library.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findByEmail(String email);
    Member findByRegNo(String regNo);
}
```

### BookRepository.java
Create `src/main/java/com/library/repository/BookRepository.java`:

```java
package com.library.repository;

import com.library.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByCategory(String category);
    List<Book> findByStatus(String status);
}
```

### BorrowRepository.java
Create `src/main/java/com/library/repository/BorrowRepository.java`:

```java
package com.library.repository;

import com.library.entity.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BorrowRepository extends JpaRepository<Borrow, Integer> {
    List<Borrow> findByMemberId(Integer memberId);
    List<Borrow> findByStatus(String status);
}
```

---

## 5. Service Layer

### MemberService.java
Create `src/main/java/com/library/service/MemberService.java`:

```java
package com.library.service;

import com.library.entity.Member;
import com.library.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class MemberService {
    
    @Autowired
    private MemberRepository memberRepository;
    
    public Member register(Member member) {
        if (memberRepository.findByEmail(member.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        return memberRepository.save(member);
    }
    
    public Member login(String email, String password) {
        Member member = memberRepository.findByEmail(email);
        if (member != null && member.getPassword().equals(password)) {
            return member;
        }
        throw new RuntimeException("Invalid email or password");
    }
    
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
    
    public Member getMemberById(Integer id) {
        return memberRepository.findById(id).orElse(null);
    }
    
    public Member updateMember(Integer id, Member member) {
        Member existing = memberRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(member.getName());
            existing.setEmail(member.getEmail());
            existing.setRole(member.getRole());
            return memberRepository.save(existing);
        }
        return null;
    }
    
    public void deleteMember(Integer id) {
        memberRepository.deleteById(id);
    }
}
```

### BookService.java
Create `src/main/java/com/library/service/BookService.java`:

```java
package com.library.service;

import com.library.entity.Book;
import com.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

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
    
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }
    
    public Book updateBook(Integer id, Book book) {
        Book existing = bookRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setTitle(book.getTitle());
            existing.setAuthor(book.getAuthor());
            existing.setCategory(book.getCategory());
            existing.setIsbn(book.getIsbn());
            existing.setStatus(book.getStatus());
            return bookRepository.save(existing);
        }
        return null;
    }
    
    public void deleteBook(Integer id) {
        bookRepository.deleteById(id);
    }
}
```

### BorrowService.java
Create `src/main/java/com/library/service/BorrowService.java`:

```java
package com.library.service;

import com.library.entity.Borrow;
import com.library.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class BorrowService {
    
    @Autowired
    private BorrowRepository borrowRepository;
    
    public Borrow createBorrow(Borrow borrow) {
        if (borrow.getStatus() == null) {
            borrow.setStatus("ACTIVE");
        }
        return borrowRepository.save(borrow);
    }
    
    public List<Borrow> getAllBorrows() {
        return borrowRepository.findAll();
    }
    
    public List<Borrow> getBorrowsByMember(Integer memberId) {
        return borrowRepository.findByMemberId(memberId);
    }
    
    public List<Borrow> getActiveBorrows() {
        return borrowRepository.findByStatus("ACTIVE");
    }
    
    public Borrow getBorrowById(Integer id) {
        return borrowRepository.findById(id).orElse(null);
    }
    
    public Borrow returnBorrow(Integer id, Borrow borrow) {
        Borrow existing = borrowRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setActualReturnDate(borrow.getActualReturnDate());
            existing.setStatus("RETURNED");
            return borrowRepository.save(existing);
        }
        return null;
    }
}
```

---

## 6. REST Controllers

### MemberController.java
Create `src/main/java/com/library/controller/MemberController.java`:

```java
package com.library.controller;

import com.library.entity.Member;
import com.library.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:3001")
public class MemberController {
    
    @Autowired
    private MemberService memberService;
    
    @PostMapping("/register")
    public ResponseEntity<Member> register(@RequestBody Member member) {
        try {
            Member newMember = memberService.register(member);
            return ResponseEntity.ok(newMember);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<Member> login(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");
            Member member = memberService.login(email, password);
            return ResponseEntity.ok(member);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable Integer id) {
        Member member = memberService.getMemberById(id);
        if (member != null) {
            return ResponseEntity.ok(member);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable Integer id, @RequestBody Member member) {
        Member updated = memberService.updateMember(id, member);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Integer id) {
        memberService.deleteMember(id);
        return ResponseEntity.ok().build();
    }
}
```

### BookController.java
Create `src/main/java/com/library/controller/BookController.java`:

```java
package com.library.controller;

import com.library.entity.Book;
import com.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    public ResponseEntity<Book> getBookById(@PathVariable Integer id) {
        Book book = bookService.getBookById(id);
        if (book != null) {
            return ResponseEntity.ok(book);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book created = bookService.createBook(book);
        return ResponseEntity.ok(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Integer id, @RequestBody Book book) {
        Book updated = bookService.updateBook(id, book);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Integer id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok().build();
    }
}
```

### BorrowController.java
Create `src/main/java/com/library/controller/BorrowController.java`:

```java
package com.library.controller;

import com.library.entity.Borrow;
import com.library.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/borrows")
@CrossOrigin(origins = "http://localhost:3001")
public class BorrowController {
    
    @Autowired
    private BorrowService borrowService;
    
    @PostMapping
    public ResponseEntity<Borrow> createBorrow(@RequestBody Borrow borrow) {
        Borrow created = borrowService.createBorrow(borrow);
        return ResponseEntity.ok(created);
    }
    
    @GetMapping
    public List<Borrow> getAllBorrows() {
        return borrowService.getAllBorrows();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Borrow> getBorrowById(@PathVariable Integer id) {
        Borrow borrow = borrowService.getBorrowById(id);
        if (borrow != null) {
            return ResponseEntity.ok(borrow);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/member/{memberId}")
    public List<Borrow> getBorrowsByMember(@PathVariable Integer memberId) {
        return borrowService.getBorrowsByMember(memberId);
    }
    
    @GetMapping("/active")
    public List<Borrow> getActiveBorrows() {
        return borrowService.getActiveBorrows();
    }
    
    @PutMapping("/{id}/return")
    public ResponseEntity<Borrow> returnBorrow(@PathVariable Integer id, @RequestBody Borrow borrow) {
        Borrow returned = borrowService.returnBorrow(id, borrow);
        if (returned != null) {
            return ResponseEntity.ok(returned);
        }
        return ResponseEntity.notFound().build();
    }
}
```

### CategoryController.java
Create `src/main/java/com/library/controller/CategoryController.java`:

```java
package com.library.controller;

import com.library.entity.Book;
import com.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

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

## 7. Main Application Class

Create `src/main/java/com/library/LibraryManagementSystemApplication.java`:

```java
package com.library;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LibraryManagementSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementSystemApplication.class, args);
    }
}
```

---

## 8. Run the Application

```bash
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

---

## 9. Verify with Curl/Postman

```bash
# Get all books
curl http://localhost:8080/api/books

# Get books by category
curl http://localhost:8080/api/books/category/Programming

# Get categories with count
curl http://localhost:8080/api/categories/count

# Register member
curl -X POST http://localhost:8080/api/members/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123","role":"STUDENT"}'
```

---

## Done! ✅

Your Spring Boot backend is ready to serve the React frontend!
