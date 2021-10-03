package com.goldfrosch.webback.domain.member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long member_id;

    //필수정보
    @Column(nullable = false, length = 50)
    private String email;
    @Column(nullable = false, length = 15)
    private String password;
    @Column(nullable = false, length = 20)
    private String nickname;
    @ColumnDefault("0")
    //관리자 등급제 (카페라는 가정하에 일반 유저부터 각 등급이 존재해
    //특정 등급 이상되어야만 글을 작성하는 방식으로 진행하기에
    //숫자로 값을 넣어버린다
    private int role;

    //선택정보 (프론트에서는 필수로는 들어감)
    @Column(nullable = false)
    private LocalDateTime birthday;
    @Column(nullable = false)
    private String gender;
    @Column(nullable = false)
    private int age;
    @Column(nullable = true)
    private String profileImage;

    //자동정보
    @CreationTimestamp //생성시 시간 자동 입력
    private LocalDateTime createdDate;

    @Builder
    public Member(String email, String password, String nickname, LocalDateTime birthday, String gender, int age) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.birthday = birthday;
        this.gender = gender;
        this.age = age;
    }

    public void editPassword(String newPassword) {
        this.password = newPassword;
    }
}
