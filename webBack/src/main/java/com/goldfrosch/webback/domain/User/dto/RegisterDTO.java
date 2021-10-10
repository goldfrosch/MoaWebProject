package com.goldfrosch.webback.domain.User.dto;

import com.goldfrosch.webback.domain.User.domain.Gender;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RegisterDTO {
    private String email;
    private String password;
    private LocalDateTime birthday;
    private Gender gender;
    private int age;
}
