package com.goldfrosch.webback.domain.Board.entity.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * com.goldfrosch.webback.domain.Board.entity.dto.QBoardListDTO is a Querydsl Projection type for BoardListDTO
 */
@Generated("com.querydsl.codegen.ProjectionSerializer")
public class QBoardListDTO extends ConstructorExpression<BoardListDTO> {

    private static final long serialVersionUID = 387643778L;

    public QBoardListDTO(com.querydsl.core.types.Expression<String> title, com.querydsl.core.types.Expression<com.goldfrosch.webback.domain.Board.domain.BoardList> category, com.querydsl.core.types.Expression<String> prefix, com.querydsl.core.types.Expression<java.time.LocalDateTime> createdDate, com.querydsl.core.types.Expression<Integer> count, com.querydsl.core.types.Expression<String> nickName, com.querydsl.core.types.Expression<Integer> rank, com.querydsl.core.types.Expression<String> uuid, com.querydsl.core.types.Expression<Long> isLove) {
        super(BoardListDTO.class, new Class<?>[]{String.class, com.goldfrosch.webback.domain.Board.domain.BoardList.class, String.class, java.time.LocalDateTime.class, int.class, String.class, int.class, String.class, long.class}, title, category, prefix, createdDate, count, nickName, rank, uuid, isLove);
    }

}

