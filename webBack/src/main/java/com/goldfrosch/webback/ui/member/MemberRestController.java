package com.goldfrosch.webback.ui.member;

import com.goldfrosch.webback.application.member.MemberService;
import com.goldfrosch.webback.domain.member.Member;
import com.goldfrosch.webback.ui.member.VO.RegisterVO;
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
