package com.goldfrosch.webback.ui.member;

import com.goldfrosch.webback.application.member.MemberService;
import com.goldfrosch.webback.domain.member.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/member")
public class MemberRestController {
    private final MemberService service;

    public MemberRestController(MemberService service) {
        this.service = service;
    }

    @GetMapping("/register")
    public ResponseEntity<List<Member>> register() {
        return ResponseEntity.ok(service.addUser());
    }
}
