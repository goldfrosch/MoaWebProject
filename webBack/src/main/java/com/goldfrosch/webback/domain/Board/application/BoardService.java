package com.goldfrosch.webback.domain.Board.application;

import com.goldfrosch.webback.domain.Board.domain.Board;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardDAO;
import com.goldfrosch.webback.domain.Board.persistance.BoardRepository;
import com.goldfrosch.webback.domain.User.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;


    //Transactional 어노테이션이 설정된 메소드의 sql query 들이 전부 성공되어야만 실행된다.
    //Transactional 만 쓰면 롤백이 안되고 (rollbackFor = Exception.class)를 붙이면 롤백 예외처리가 실행된다.
    @Transactional
    public void postBoard(BoardDAO board, User user) {
        Board newBoard = Board.builder()
                .authorId(user.getId())
                .category(board.getCategory())
                .content(board.getContent())
                .createdDate(LocalDateTime.now())
                .isComment(board.getIsComment())
                .prefix(board.getPrefix())
                .title(board.getTitle())
                .build();
        boardRepository.save(newBoard);
    }
}
