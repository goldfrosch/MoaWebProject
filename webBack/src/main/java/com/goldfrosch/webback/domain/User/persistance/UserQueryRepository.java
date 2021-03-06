package com.goldfrosch.webback.domain.User.persistance;

import com.goldfrosch.webback.domain.Board.domain.Board;
import com.goldfrosch.webback.domain.User.domain.User;
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

    public String findOverlapUUID(String uuid) {
        return jpaQueryFactory.select(user.uuid).from(user)
                .where(user.uuid.like(uuid))
                .fetchOne();
    }

    public String findOverlapPassword(Long id) {
        return jpaQueryFactory.select(user.password).from(user)
                .where(user.id.eq(id))
                .fetchOne();
    }
    public void updatePassword(String password, Long id) {
        update(user)
        .set(user.password, password)
        .where(user.id.eq(id))
        .execute();
    }

    public void updateProfile(String profile, Long id) {
        update(user)
                .set(user.profile, profile)
                .where(user.id.eq(id))
                .execute();
    }
}