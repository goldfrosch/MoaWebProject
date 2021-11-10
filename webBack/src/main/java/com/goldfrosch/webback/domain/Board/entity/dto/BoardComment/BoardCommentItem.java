package com.goldfrosch.webback.domain.Board.entity.dto.BoardComment;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BoardCommentItem {
    private Long id;

    private String comment;

    private Boolean isDeleted;

    private Long boardNum;

    private Long parentNum;

    private LocalDateTime createdDate;

    private String nickName;

    private int rank;

    private String uuid;

    @QueryProjection
    public BoardCommentItem(
            Long id,
            String comment,
            Boolean isDeleted,
            Long boardNum,
            Long parentNum,
            LocalDateTime createdDate,
            String nickName,
            int rank,
            String uuid
    ) {
        this.id = id;
        this.comment = comment;
        this.isDeleted = isDeleted;
        this.boardNum = boardNum;
        this.parentNum = parentNum;
        this.createdDate = createdDate;
        this.nickName = nickName;
        this.rank = rank;
        this.uuid = uuid;
    }
}
