package com.goldfrosch.webback.domain.User.api;

import com.goldfrosch.webback.domain.User.application.UserService;
import com.goldfrosch.webback.domain.User.domain.User;
import com.goldfrosch.webback.domain.User.entity.dao.LoginDAO;
import com.goldfrosch.webback.domain.User.entity.dao.PasswordDAO;
import com.goldfrosch.webback.domain.User.entity.dao.RegisterDAO;
import com.goldfrosch.webback.domain.User.entity.dto.UserDTO;
import com.goldfrosch.webback.domain.User.persistance.UserQueryRepository;
import com.goldfrosch.webback.domain.User.persistance.UserRepository;
import com.goldfrosch.webback.global.component.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDateTime;
import java.util.Collections;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserRestController {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    private final UserQueryRepository userQueryRepository;
    private final UserService userService;

    @GetMapping("/profile")
    public UserDTO getUser(@ApiIgnore @AuthenticationPrincipal User user) {
        return userService.getUserService(user);
    }


    // 회원가입
    // 암호화된 비밀번호를 넣어주기 때문에 비밀번호 찾기가 아닌
    // 특정 정답을 맞춘 뒤 비밀번호 변경을 넣어야할 듯 함
    @PostMapping("/register")
    public Long join(@RequestBody RegisterDAO user) {
        return userRepository.save(User.builder()
                .email(user.getEmail())
                .password(passwordEncoder.encode(user.getPassword()))
                .nickName(user.getNickName())
                .uuid(user.getUuid())
                .birthday(user.getBirthday())
                .gender(user.getGender())
                .age(user.getAge())
                .rank(1)
                .createdDate(LocalDateTime.now())
                .roles(Collections.singletonList("ROLE_USER")) // 최초 가입시 USER 로 설정
                .build()
        ).getId();
    }

    // 로그인
    @PostMapping("/login")
    public String login(@RequestBody LoginDAO user) {
        User member = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 E-MAIL 입니다."));

        if (!passwordEncoder.matches(user.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        return jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
    }

    //중복 유저 이메일 찾기
    @GetMapping("/find/email")
    public String findEmail(@RequestParam String email) {
        return userQueryRepository.findOverlapEmail(email);
    }

    //중복 유저 닉네임 찾기
    @GetMapping("/find/nickname")
    public String findNickname(@RequestParam String nickName) {
        return userQueryRepository.findOverlapNickName(nickName);
    }

    @GetMapping("/find/uuid")
    public String findUuid(@RequestParam String uuid) {
        return userQueryRepository.findOverlapUUID(uuid);
    }

    @CrossOrigin("*")
    @PutMapping("/update/pass")
    public String updatePassword(@ApiIgnore @AuthenticationPrincipal User user,@RequestBody PasswordDAO pass) {
//        if (!passwordEncoder.matches(user.getPassword(), pass.getNowPass())) {
//            throw new IllegalArgumentException("다른 비밀번호입니다.");
//        }
        String newPassword = passwordEncoder.encode(pass.getNewPass());
        return userService.updateUserPassword(newPassword, user);
    }

    @CrossOrigin("*")
    @PutMapping("/profile")
    public String updateProfile(
            @ApiIgnore @AuthenticationPrincipal User user,
            @RequestPart(required = false, value = "file") MultipartFile file,
            @RequestPart(value = "data") Boolean isDelete
    ) {
        return userService.updateUserProfile(user, file, isDelete);
    }

    @CrossOrigin("*")
    @PutMapping("/reset/pass")
    public String resetPassword(@RequestParam String email) {
        return userService.resetPassword(email, passwordEncoder);
    }
}