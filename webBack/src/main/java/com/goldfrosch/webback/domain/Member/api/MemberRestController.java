package com.goldfrosch.webback.domain.Member.api;

import com.goldfrosch.webback.domain.Member.application.MemberService;
import com.goldfrosch.webback.domain.Member.domain.Member;
import com.goldfrosch.webback.domain.Member.dto.RegisterVO;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @ApiOperation(value="Member Test", notes="그냥 테스트라고")
    @PostMapping("/test")
    public ResponseEntity<List<Member>> register() {
        return ResponseEntity.ok(service.addUser());
    }

    @ApiOperation(value="Member Register")
    @PostMapping("/register")
    public String register(@RequestBody RegisterVO registerVO) {
        return registerVO.toString();
    }
}
