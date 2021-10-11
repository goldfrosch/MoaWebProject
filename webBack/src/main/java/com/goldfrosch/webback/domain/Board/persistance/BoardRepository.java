package com.goldfrosch.webback.domain.Board.persistance;

import com.goldfrosch.webback.domain.Board.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
