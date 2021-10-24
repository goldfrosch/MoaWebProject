package com.goldfrosch.webback.domain.User.persistance;

import com.goldfrosch.webback.domain.Board.domain.Board;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import static com.goldfrosch.webback.domain.User.domain.QUser.user;

@Repository
public class UserQueryRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    public UserQueryRepository(JPAQueryFactory jpaQueryFactory) {
        super(Board.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public String findOverlapEmail(String email) {
        return jpaQueryFactory.select(user.email).from(user)
                .where(user.email.like(email))
                .fetchOne();
    }

    public String findOverlapNickName(String nickName) {
        return jpaQueryFactory.select(user.nickName).from(user)
                .where(user.nickName.like(nickName))
                .fetchOne();
    }
}