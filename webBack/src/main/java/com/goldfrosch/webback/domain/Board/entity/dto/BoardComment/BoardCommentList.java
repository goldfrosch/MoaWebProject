package com.goldfrosch.webback.domain.Board.entity.dto.BoardComment;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BoardCommentList {
    private BoardCommentItem comment;

    private List<BoardCommentItem> replyList;
}
