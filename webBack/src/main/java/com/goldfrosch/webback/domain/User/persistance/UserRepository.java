package com.goldfrosch.webback.domain.User.persistance;

import com.goldfrosch.webback.domain.User.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    //<T>의 객체를 포장해주는 Wrapper Class! -> Optional
    //Wrapper class는 기본 자료타입들을 객체처럼 다루기 위해 사용한다(int -> Integer etc...)
    Optional<User> findByEmail(String email);
}
