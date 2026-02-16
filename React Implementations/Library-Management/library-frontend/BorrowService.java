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
