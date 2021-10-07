package com.goldfrosch.webback.domain.Member.application;

import com.goldfrosch.webback.domain.Member.domain.Member;
import com.goldfrosch.webback.domain.Member.persistance.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MemberService {
    private final MemberRepository repository;

    public MemberService(MemberRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public List<Member> addUser() {
        Member member = Member.builder()
                .email("test@naver.com")
                .password("test1234")
                .nickname("GoldFrosch")
                .birthday(LocalDateTime.now())
                .gender("MALE")
                .age(24)
                .build();

        repository.save(member);

        return repository.findAll();
    }
}
