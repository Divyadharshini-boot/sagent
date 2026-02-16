package com.example.librarymanagement.service;

import com.example.librarymanagement.entity.Member;
import com.example.librarymanagement.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class MemberService {

    private static final Logger logger = LoggerFactory.getLogger(MemberService.class);
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
        logger.info("LOGIN ATTEMPT - Email: {}, Password: {}", email, password);
        Member member = memberRepository.findByEmail(email);
        logger.info("MEMBER FOUND: {}", member != null ? "Yes" : "No");
        if (member != null) {
            logger.info("DATABASE PASSWORD: '{}', INPUT PASSWORD: '{}'", member.getPassword(), password);
            logger.info("PASSWORDS EQUAL: {}", member.getPassword().equals(password));
        }
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
