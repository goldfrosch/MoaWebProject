package com.goldfrosch.webback.domain.Member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RegisterVO {
    private String email;
    private String password;
    private LocalDateTime birthday;
    private String gender;
    private int age;

    @Override
    public String toString() {
        return "{"
                + "email='"
                + email
                + '\''
                + ", password='"
                + password
                + '\''
                + ", birthday='"
                + birthday
                + '\''
                + ", gender='"
                + gender
                + '\''
                + ", age='"
                + age
                + '}';
    }
}
