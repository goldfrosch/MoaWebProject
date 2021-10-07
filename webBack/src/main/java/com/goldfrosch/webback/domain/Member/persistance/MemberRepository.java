package com.goldfrosch.webback.domain.Member.persistance;

import com.goldfrosch.webback.domain.Member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
