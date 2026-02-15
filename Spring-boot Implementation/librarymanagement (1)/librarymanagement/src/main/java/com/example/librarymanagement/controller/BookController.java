package com.example.librarymanagement.controller;

import com.example.librarymanagement.entity.Book;
import com.example.librarymanagement.enums.BookStatus;
import com.example.librarymanagement.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/category/{category}")
    public List<Book> getBooksByCategory(@PathVariable String category) {
        return bookService.getAllBooks().stream()
                .filter(book -> book.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getAllBooks().stream()
                .filter(book -> book.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    @PostMapping
    public Book addBook(@RequestBody Book book,
                        @RequestHeader(value = "X-User-Role", required = false) String role) {
        if (!"LIBRARIAN".equals(role)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only librarians can add books");
        }
        book.setStatus(BookStatus.AVAILABLE);
        return bookService.addBook(book);
    }

    @PutMapping("/{id}/status")
    public Book updateBookStatus(@PathVariable Long id,
                                 @RequestBody Map<String, String> request,
                                 @RequestHeader(value = "X-User-Role", required = false) String role) {
        if (!"LIBRARIAN".equals(role)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only librarians can update book status");
        }
        String status = request.get("status");
        if (status == null || status.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status is required");
        }
        try {
            BookStatus bookStatus = BookStatus.valueOf(status.toUpperCase());
            return bookService.updateBookStatus(id, bookStatus);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid status. Must be one of: " + Arrays.toString(BookStatus.values()));
        }
    }

    @DeleteMapping("/{id}")
    public Map<String, String> deleteBook(@PathVariable Long id,
                                          @RequestHeader(value = "X-User-Role", required = false) String role) {
        if (!"LIBRARIAN".equals(role)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only librarians can delete books");
        }
        bookService.deleteBook(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Book deleted successfully");
        return response;
    }

    @GetMapping("/status/{status}")
    public List<Book> getBooksByStatus(@PathVariable String status) {
        try {
            BookStatus bookStatus = BookStatus.valueOf(status.toUpperCase());
            return bookService.searchByStatus(bookStatus);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status value");
        }
    }

    @GetMapping("/categories/count")
    public List<Map<String, Object>> getCategoriesWithCount() {
        return bookService.getAllBooks().stream()
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
}
