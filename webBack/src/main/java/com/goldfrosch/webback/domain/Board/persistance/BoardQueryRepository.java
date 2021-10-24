package com.goldfrosch.webback.domain.Board.persistance;

import com.goldfrosch.webback.domain.Board.domain.Board;
import com.goldfrosch.webback.domain.Board.domain.BoardDesc;
import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardSearchType;
import com.goldfrosch.webback.domain.Board.entity.dto.BoardListDTO;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
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

    public List<BoardListDTO> getBoardFindbyCategory(BoardList category, int page, int count, BoardSearchType type, String query) {
            return jpaQueryFactory.select(Projections.constructor(BoardListDTO.class,
                            board.title,
                            board.category,
                            board.prefix,
                            board.createdDate,
                            board.count,
                            board.user.nickName,
                            board.user.rank,
                            board.user.uuid)
                    )
                    .from(board)
                    .where(board.category.eq(category))
                    .where(board.title.contains(query))
                    .orderBy(board.id.desc())
                    .offset(((page - 1) * 10L))
                    .limit(count)
                    .fetch();
    }
    public BoardListDTO getBoardById(Long number) {
        return jpaQueryFactory.select(Projections.constructor(BoardListDTO.class,
                        board.title,
                        board.category,
                        board.prefix,
                        board.createdDate,
                        board.count,
                        board.user.nickName,
                        board.user.rank,
                        board.user.uuid)
                )
                .from(board)
                .where(board.id.eq(number))
                .fetchOne();
    }
    public BoardDesc getBoardDesc(BoardList category) {
        return jpaQueryFactory.selectFrom(boardDesc)
                .where(boardDesc.category.eq(category))
                .fetchOne();
    }
}
