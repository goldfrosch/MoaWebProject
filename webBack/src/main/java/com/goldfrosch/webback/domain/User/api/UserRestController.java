package com.goldfrosch.webback.domain.User.api;

import com.goldfrosch.webback.domain.User.domain.User;
import com.goldfrosch.webback.domain.User.dto.LoginDTO;
import com.goldfrosch.webback.domain.User.dto.RegisterDTO;
import com.goldfrosch.webback.domain.User.persistance.UserRepository;
import com.goldfrosch.webback.global.component.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Collections;

@RequiredArgsConstructor
@RestController
public class UserRestController {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    // 회원가입
    // 암호화된 비밀번호를 넣어주기 때문에 비밀번호 찾기가 아닌
    // 특정 정답을 맞춘 뒤 비밀번호 변경을 넣어야할 듯 함
    @PostMapping("/register")
    public Long join(@RequestBody RegisterDTO user) {
        return userRepository.save(User.builder()
                .email(user.getEmail())
                .password(passwordEncoder.encode(user.getPassword()))
                .birthday(user.getBirthday())
                .gender(user.getGender())
                .age(user.getAge())
                .rank(0)
                .createdDate(LocalDateTime.now())
                .roles(Collections.singletonList("ROLE_USER")) // 최초 가입시 USER 로 설정
                .build()
        ).getId();
    }

    // 로그인
    @PostMapping("/login")
    public String login(@RequestBody LoginDTO user) {
        User member = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 E-MAIL 입니다."));
        if (!passwordEncoder.matches(user.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        return jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
    }
}