package com.goldfrosch.webback.domain.Board.application;

import com.goldfrosch.webback.domain.Board.domain.BoardComment;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardComment.BoardCommentDAO;
import com.goldfrosch.webback.domain.Board.persistance.BoardComment.BoardCommentQueryRepository;
import com.goldfrosch.webback.domain.Board.persistance.BoardComment.BoardCommentRepository;
import com.goldfrosch.webback.domain.User.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardCommentService {
    private final BoardCommentRepository boardCommentRepository;
    private final BoardCommentQueryRepository boardCommentQueryRepository;

    @Transactional
    public void postBoardComment(BoardCommentDAO boardComment, User user) {
        BoardComment newBoardComment = BoardComment.builder()
                .user(user)
                .comment(boardComment.getComment())
                .isDeleted(false)
                .parentId(boardCommentQueryRepository.getCommentByBoardId(boardComment.getParentNum()))
                .boardNum(boardComment.getBoardNum())
                .createdDate(LocalDateTime.now())
                .build();
        boardCommentRepository.save(newBoardComment);
    }

    @Transactional
    public void deleteBoardCommentById(Long id) {
        boardCommentRepository.deleteById(id);
    }
}
