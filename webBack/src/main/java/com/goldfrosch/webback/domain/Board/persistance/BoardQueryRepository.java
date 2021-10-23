package com.goldfrosch.webback.domain.Board.persistance;

import com.goldfrosch.webback.domain.Board.domain.Board;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.goldfrosch.webback.domain.Board.domain.QBoard.board;

@Repository
public class BoardQueryRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    public BoardQueryRepository(JPAQueryFactory jpaQueryFactory) {
        super(Board.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<Board> getBoardFindAll(int page, int count) {
        return jpaQueryFactory.selectFrom(board)
                .orderBy(board.id.desc())
                .offset(((page - 1) * 10L))
                .limit(count)
                .fetch();
    }

    public List<Board> getBoardFindbyCategory(String category, int page, int count) {
        return jpaQueryFactory.selectFrom(board)
                .where(board.category.like(category))
                .orderBy(board.id.desc())
                .offset(((page - 1) * 10L))
                .limit(count)
                .fetch();
    }

}
