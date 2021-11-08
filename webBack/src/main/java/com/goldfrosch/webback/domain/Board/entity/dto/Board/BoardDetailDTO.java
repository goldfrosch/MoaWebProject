package com.goldfrosch.webback.domain.Board.entity.dto.Board;

import com.goldfrosch.webback.domain.Board.entity.dto.BoardComment.BoardCommentDTO;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BoardDetailDTO {
    private BoardItemDTO detail;

    private BoardCommentDTO comments;
}
