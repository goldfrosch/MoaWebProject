package com.goldfrosch.webback.domain.Board.entity.dao;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardDAO {
    private Long authorId;

    private String title;

    private String type;

    private String prefix;

    private String content;

    private Boolean isComment;
}
