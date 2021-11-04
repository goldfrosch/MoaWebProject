package com.goldfrosch.webback.domain.Board.entity.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BoardCommentDTO {
    private BoardCommentItem comment;

    private List<BoardCommentItem> replyList;

    @QueryProjection
    public BoardCommentDTO(BoardCommentItem comment, List<BoardCommentItem> replyList) {
        this.comment = comment;
        this.replyList = replyList;
    }
}

class BoardCommentItem {
    private Long id;

    private String comment;

    private LocalDateTime createdDate;

    private Long parentNum;

    private Long boardNum;

    private String nickName;

    private int rank;

    private String uuid;
}

