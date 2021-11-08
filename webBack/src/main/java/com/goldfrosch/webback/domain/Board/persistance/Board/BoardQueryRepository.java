package com.goldfrosch.webback.domain.Board.persistance.Board;

import com.goldfrosch.webback.domain.Board.domain.Board;
import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardSearchType;
import com.goldfrosch.webback.domain.Board.entity.dto.Board.BoardItemDTO;
import com.goldfrosch.webback.domain.Board.entity.dto.Board.BoardListDTO;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.goldfrosch.webback.domain.Board.domain.QBoard.board;
import static com.goldfrosch.webback.domain.Board.domain.QBoardLove.boardLove;
import static com.goldfrosch.webback.domain.Board.domain.QBoardTag.boardTag;

@Repository
public class BoardQueryRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    public BoardQueryRepository(JPAQueryFactory jpaQueryFactory) {
        super(Board.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<String> getBoardTag(BoardList category) {
        return jpaQueryFactory.select(boardTag.tag).from(boardTag).where(boardTag.category.eq(category)).fetch();
    }

    public List<BoardListDTO> getBoardList(BoardList category, int limit) {
        return jpaQueryFactory.select(Projections.constructor(BoardListDTO.class,board.id,
            board.title,
            board.category,
            board.prefix,
            board.thumbnail,
            board.createdDate,
            board.count,
            board.user.nickName,
            board.user.rank,
            board.user.uuid,
            jpaQueryFactory.select(boardLove.count()).from(boardLove).where(boardLove.id.eq(board.id))
        )).from(board)
        .where(board.category.eq(category))
        .orderBy(board.id.desc())
        .limit(limit)
        .fetch();
    }

    public QueryResults<BoardListDTO> getBoardFindbyCategory(BoardList category, int page, int count, BoardSearchType type, String query) {
        if(type.equals(BoardSearchType.TITLE)) {
            return jpaQueryFactory.select(Projections.constructor(BoardListDTO.class,
                    board.id,
                    board.title,
                    board.category,
                    board.prefix,
                    board.thumbnail,
                    board.createdDate,
                    board.count,
                    board.user.nickName,
                    board.user.rank,
                    board.user.uuid,
                    jpaQueryFactory.select(boardLove.count()).from(boardLove).where(boardLove.id.eq(board.id))
                )
            )
            .from(board)
            .where(board.category.eq(category))
            .where(board.title.contains(query))
            .orderBy(board.id.desc())
            .offset(((page - 1) * 10L))
            .limit(count)
            .fetchResults();
        }
        else {
            return jpaQueryFactory.select(Projections.constructor(BoardListDTO.class,
                    board.id,
                    board.title,
                    board.category,
                    board.prefix,
                    board.thumbnail,
                    board.createdDate,
                    board.count,
                    board.user.nickName,
                    board.user.rank,
                    board.user.uuid,
                    jpaQueryFactory.select(boardLove.count()).from(boardLove).where(boardLove.id.eq(board.id))
                )
            )
            .from(board)
            .where(board.category.eq(category))
            .where(board.user.nickName.contains(query))
            .orderBy(board.id.desc())
            .offset(((page - 1) * 10L))
            .limit(count)
            .fetchResults();
        }

    }

    public BoardItemDTO getBoardById(Long number) {
        return jpaQueryFactory.select(Projections.constructor(BoardItemDTO.class,
            board.id,
            board.title,
            board.category,
            board.prefix,
            board.content,
            board.createdDate,
            board.count,
            board.user.nickName,
            board.user.rank,
            board.user.uuid,board.isComment,
            jpaQueryFactory.
                select(boardLove.count()).
                from(boardLove).
                where(boardLove.id.eq(board.id))
            )
        )
        .from(board)
        .where(board.id.eq(number))
        .fetchOne();
    }
}
