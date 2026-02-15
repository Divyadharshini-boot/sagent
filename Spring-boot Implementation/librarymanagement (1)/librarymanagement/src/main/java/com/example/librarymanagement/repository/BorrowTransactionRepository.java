package com.example.librarymanagement.repository;

import com.example.librarymanagement.entity.BorrowTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowTransactionRepository
        extends JpaRepository<BorrowTransaction, Long> {
}
