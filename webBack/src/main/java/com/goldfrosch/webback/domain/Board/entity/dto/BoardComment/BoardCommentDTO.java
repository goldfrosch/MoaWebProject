package com.goldfrosch.webback.domain.Board.entity.dto.BoardComment;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BoardCommentDTO {
    private BoardCommentItem comments;

    private List<BoardCommentItem> replyList;
}
