package com.goldfrosch.webback.domain.Board.entity.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * com.goldfrosch.webback.domain.Board.entity.dto.QBoardItemDTO is a Querydsl Projection type for BoardItemDTO
 */
@Generated("com.querydsl.codegen.ProjectionSerializer")
public class QBoardItemDTO extends ConstructorExpression<BoardItemDTO> {

    private static final long serialVersionUID = -1973084435L;

    public QBoardItemDTO(com.querydsl.core.types.Expression<Long> id, com.querydsl.core.types.Expression<String> title, com.querydsl.core.types.Expression<com.goldfrosch.webback.domain.Board.domain.BoardList> category, com.querydsl.core.types.Expression<String> prefix, com.querydsl.core.types.Expression<String> content, com.querydsl.core.types.Expression<java.time.LocalDateTime> createdDate, com.querydsl.core.types.Expression<Integer> count, com.querydsl.core.types.Expression<String> nickName, com.querydsl.core.types.Expression<Integer> rank, com.querydsl.core.types.Expression<String> uuid, com.querydsl.core.types.Expression<Long> isLove) {
        super(BoardItemDTO.class, new Class<?>[]{long.class, String.class, com.goldfrosch.webback.domain.Board.domain.BoardList.class, String.class, String.class, java.time.LocalDateTime.class, int.class, String.class, int.class, String.class, long.class}, id, title, category, prefix, content, createdDate, count, nickName, rank, uuid, isLove);
    }

}

