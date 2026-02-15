package com.example.librarymanagement.service;

import com.example.librarymanagement.entity.BorrowTransaction;
import com.example.librarymanagement.entity.Book;
import com.example.librarymanagement.entity.Member;
import com.example.librarymanagement.repository.BorrowTransactionRepository;
import com.example.librarymanagement.repository.BookRepository;
import com.example.librarymanagement.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowService {

    private final BorrowTransactionRepository borrowTransactionRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;

    public BorrowService(BorrowTransactionRepository borrowTransactionRepository,
                         BookRepository bookRepository,
                         MemberRepository memberRepository) {
        this.borrowTransactionRepository = borrowTransactionRepository;
        this.bookRepository = bookRepository;
        this.memberRepository = memberRepository;
    }

    public BorrowTransaction borrowBook(Long memberId, Long bookId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (!book.getStatus().equals(com.example.librarymanagement.enums.BookStatus.AVAILABLE)) {
            throw new RuntimeException("Book is not available for borrowing");
        }

        BorrowTransaction borrow = new BorrowTransaction();
        borrow.setMember(member);
        borrow.setBook(book);
        borrow.setBorrowDate(LocalDate.now());
        borrow.setDueDate(LocalDate.now().plusDays(14)); // 2 weeks

        book.setStatus(com.example.librarymanagement.enums.BookStatus.NOT_AVAILABLE);
        bookRepository.save(book);

        return borrowTransactionRepository.save(borrow);
    }

    public BorrowTransaction returnBook(Long transactionId) {
        BorrowTransaction transaction = borrowTransactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Borrow transaction not found"));

        transaction.setReturnDate(LocalDate.now());
        Book book = transaction.getBook();
        book.setStatus(com.example.librarymanagement.enums.BookStatus.AVAILABLE);
        bookRepository.save(book);

        return borrowTransactionRepository.save(transaction);
    }

    public List<BorrowTransaction> getAllBorrows() {
        return borrowTransactionRepository.findAll();
    }

    public List<BorrowTransaction> getBorrowsByMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        return borrowTransactionRepository.findAll()
                .stream()
                .filter(b -> b.getMember().getMemberId().equals(member.getMemberId()))
                .toList();
    }
}
