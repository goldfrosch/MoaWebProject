package com.goldfrosch.webback.infra.member;

import com.goldfrosch.webback.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
