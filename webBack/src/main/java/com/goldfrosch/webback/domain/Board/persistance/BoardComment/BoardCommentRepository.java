package com.goldfrosch.webback.domain.Board.persistance.BoardComment;

import com.goldfrosch.webback.domain.Board.domain.BoardComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardCommentRepository  extends JpaRepository<BoardComment, Long> {
}
