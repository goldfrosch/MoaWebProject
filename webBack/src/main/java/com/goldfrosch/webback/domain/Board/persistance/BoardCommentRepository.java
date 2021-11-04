package com.goldfrosch.webback.domain.Board.persistance;

import com.goldfrosch.webback.domain.Board.domain.BoardComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardCommentRepository  extends JpaRepository<BoardComment, Long> {
}
