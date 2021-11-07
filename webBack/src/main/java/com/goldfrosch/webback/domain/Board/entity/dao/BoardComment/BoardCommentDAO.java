package com.goldfrosch.webback.domain.Board.entity.dao.BoardComment;

import com.goldfrosch.webback.domain.Board.domain.BoardComment;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardCommentDAO {
    private String comment;

    private Long boardNum;

    private Long parentNum;
}
