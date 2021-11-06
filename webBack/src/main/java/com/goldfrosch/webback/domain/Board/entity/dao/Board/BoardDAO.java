package com.goldfrosch.webback.domain.Board.entity.dao.Board;

import com.goldfrosch.webback.domain.Board.domain.BoardList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardDAO {
    private String title;

    private BoardList category;

    private String prefix;

    private String content;

    private Boolean isComment;
}
