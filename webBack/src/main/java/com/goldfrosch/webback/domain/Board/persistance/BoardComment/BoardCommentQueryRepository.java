package com.goldfrosch.webback.domain.Board.persistance.BoardComment;

import com.goldfrosch.webback.domain.Board.domain.Board;
import com.goldfrosch.webback.domain.Board.domain.BoardComment;
import com.goldfrosch.webback.domain.Board.entity.dto.BoardComment.BoardCommentItem;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;


import java.util.List;

import static com.goldfrosch.webback.domain.Board.domain.QBoardComment.boardComment;


@Repository
public class BoardCommentQueryRepository extends QuerydslRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;

    public BoardCommentQueryRepository(JPAQueryFactory jpaQueryFactory) {
        super(Board.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public BoardComment getCommentByBoardId(Long id) {
        return jpaQueryFactory.
            selectFrom(boardComment).
            where(boardComment.id.eq(id)).
            fetchOne();
    }

    public Long getCommentsCountByBoardId(Long id) {
        return jpaQueryFactory.selectFrom(boardComment)
                .where(boardComment.boardNum.eq(id))
                .fetchCount();
    }

    public List<BoardCommentItem> getCommentsByBoardId(Long id) {
        return jpaQueryFactory.select(Projections.constructor(BoardCommentItem.class,
                boardComment.id,
                boardComment.comment,
                boardComment.isDeleted,
                boardComment.boardNum,
                boardComment.parentId.id,
                boardComment.createdDate,
                boardComment.user.nickName,
                boardComment.user.rank,
                boardComment.user.uuid
            )
        ).from(boardComment)
        .where(boardComment.boardNum.eq(id))
        .where(boardComment.parentId.isNull())
        .orderBy(boardComment.createdDate.desc())
        .fetch();
    }

    public List<BoardCommentItem> getReplyList(Long id, Long parentId) {
        return jpaQueryFactory.select(Projections.constructor(BoardCommentItem.class,
                    boardComment.id,
                    boardComment.comment,
                    boardComment.isDeleted,
                    boardComment.boardNum,
                    boardComment.parentId.id,
                    boardComment.createdDate,
                    boardComment.user.nickName,
                    boardComment.user.rank,
                    boardComment.user.uuid
                )
            ).from(boardComment)
            .where(boardComment.boardNum.eq(id))
            .where(boardComment.parentId.id.eq(parentId))
            .orderBy(boardComment.createdDate.desc())
            .fetch();
    }
}
