package com.goldfrosch.webback.domain.User.entity.dao;

import com.goldfrosch.webback.domain.User.domain.Gender;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RegisterDAO {
    private String email;

    private String password;

    private String nickName;

    private LocalDateTime birthday;

    private Gender gender;

    private int age;
}
