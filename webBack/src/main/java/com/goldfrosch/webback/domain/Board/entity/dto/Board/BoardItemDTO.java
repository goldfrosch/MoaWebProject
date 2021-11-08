package com.goldfrosch.webback.domain.Board.entity.dto.Board;

import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BoardItemDTO {
    private Long id;

    private String title;

    private BoardList category;

    private String prefix;

    private String content;

    private LocalDateTime createdDate;

    private int count;

    private String nickName;

    private int rank;

    private String uuid;

    private Long isLove;

    private Boolean isComment;

    @QueryProjection
    public BoardItemDTO(
            Long id,
            String title,
            BoardList category,
            String prefix,
            String content,
            LocalDateTime createdDate,
            int count,
            String nickName,
            int rank,
            String uuid,
            Boolean isComment,
            Long isLove
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.prefix = prefix;
        this.content = content;
        this.createdDate = createdDate;
        this.count = count;
        this.nickName = nickName;
        this.rank = rank;
        this.uuid = uuid;
        this.isComment = isComment;
        this.isLove = isLove;
    }
}
