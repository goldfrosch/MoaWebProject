package com.goldfrosch.webback.domain.Board.application;

import com.goldfrosch.webback.domain.Board.domain.Board;
import com.goldfrosch.webback.domain.Board.dto.BoardDTO;
import com.goldfrosch.webback.domain.Board.persistance.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    @Transactional
    public void postBoard(BoardDTO board) {
        Board newBoard = Board.builder()
                .authorId(board.getAuthorId())
                .category(board.getType())
                .content(board.getContent())
                .createdDate(LocalDateTime.now())
                .isComment(board.getIsComment())
                .tag(board.getTag())
                .title(board.getTitle())
                .build();
        boardRepository.save(newBoard);
    }

}
