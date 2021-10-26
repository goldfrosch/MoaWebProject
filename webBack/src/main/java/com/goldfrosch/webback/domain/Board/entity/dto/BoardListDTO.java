package com.goldfrosch.webback.domain.Board.entity.dto;

import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class BoardListDTO {
    private Long id;

    private String title;

    private BoardList category;

    private String prefix;

    private LocalDateTime createdDate;

    private int count;

    private String nickName;

    private int rank;

    private String uuid;

    private Long isLove;

    @QueryProjection
    public BoardListDTO(
            Long id,
            String title,
            BoardList category,
            String prefix,
            LocalDateTime createdDate,
            int count,
            String nickName,
            int rank,
            String uuid,
            Long isLove
            ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.prefix = prefix;
        this.createdDate = createdDate;
        this.count = count;
        this.nickName = nickName;
        this.rank = rank;
        this.uuid = uuid;
        this.isLove = isLove;
    }
}
