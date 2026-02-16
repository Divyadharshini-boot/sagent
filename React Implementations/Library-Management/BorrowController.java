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
