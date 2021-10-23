package com.goldfrosch.webback.domain.Board.persistance;

import com.goldfrosch.webback.domain.Board.domain.Board;
import com.goldfrosch.webback.domain.Board.domain.BoardDesc;
import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.goldfrosch.webback.domain.Board.domain.QBoard.board;
import static com.goldfrosch.webback.domain.Board.domain.QBoardDesc.boardDesc;

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

    public List<Board> getBoardFindbyCategory(BoardList category, int page, int count) {
        return jpaQueryFactory.selectFrom(board)
                .where(board.category.eq(category))
                .orderBy(board.id.desc())
                .offset(((page - 1) * 10L))
                .limit(count)
                .fetch();
    }

    public BoardDesc getBoardDesc(BoardList category) {
        return jpaQueryFactory.selectFrom(boardDesc)
                .where(boardDesc.category.eq(category))
                .fetchOne();
    }
}
