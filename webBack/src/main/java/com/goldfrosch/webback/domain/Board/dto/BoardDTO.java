package com.goldfrosch.webback.domain.Board.dto;

import com.goldfrosch.webback.domain.Board.domain.BoardType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardDTO {
    private Long authorId;

    private String title;

    private BoardType type;

    private int tag;

    private String content;

    private Boolean isComment;
}
