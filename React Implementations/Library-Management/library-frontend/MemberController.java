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
