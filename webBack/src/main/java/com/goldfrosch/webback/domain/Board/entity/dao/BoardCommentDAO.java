package com.goldfrosch.webback.domain.Board.entity.dao;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardCommentDAO {
    private String comment;

    private Long parentNum;

    private Long boardNum;
}
