package com.goldfrosch.webback.domain.Board.application;

import com.goldfrosch.webback.domain.Board.domain.BoardComment;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardCommentDAO;
import com.goldfrosch.webback.domain.Board.persistance.BoardCommentRepository;
import com.goldfrosch.webback.domain.User.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BoardCommentService {
    private final BoardCommentRepository boardCommentRepository;

    @Transactional
    public void postBoardComment(BoardCommentDAO boardComment, User user) {
        BoardComment newBoardComment = BoardComment.builder()
                .user(user)
                .comment(boardComment.getComment())
                .boardNum(boardComment.getBoardNum())
                .parentNum(boardComment.getParentNum())
                .createdDate(LocalDateTime.now())
                .build();
        boardCommentRepository.save(newBoardComment);
    }

    @Transactional
    public void deleteBoardCommentById(Long id) {
        boardCommentRepository.deleteById(id);
    }
}
