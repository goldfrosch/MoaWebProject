package com.goldfrosch.webback.domain.Board.application;

import com.goldfrosch.webback.domain.Board.domain.BoardComment;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardComment.BoardCommentDAO;
import com.goldfrosch.webback.domain.Board.entity.dto.BoardComment.BoardCommentDTO;
import com.goldfrosch.webback.domain.Board.entity.dto.BoardComment.BoardCommentItem;
import com.goldfrosch.webback.domain.Board.entity.dto.BoardComment.BoardCommentList;
import com.goldfrosch.webback.domain.Board.persistance.BoardComment.BoardCommentQueryRepository;
import com.goldfrosch.webback.domain.Board.persistance.BoardComment.BoardCommentRepository;
import com.goldfrosch.webback.domain.User.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardCommentService {
    private final BoardCommentRepository boardCommentRepository;
    private final BoardCommentQueryRepository boardCommentQueryRepository;

    @Transactional
    public BoardCommentDTO getBoardComments(Long id) {
        List<BoardCommentItem> commentsList = boardCommentQueryRepository.getCommentsByBoardId(id);
        List<BoardCommentList> comments = new ArrayList<>();

        for(BoardCommentItem comment: commentsList) {
            BoardCommentList data = new BoardCommentList();

            data.setComment(comment);
            data.setReplyList(boardCommentQueryRepository.getReplyList(id, comment.getId()));
            comments.add(data);
        }
        Long count = boardCommentQueryRepository.getCommentsCountByBoardId(id);

        BoardCommentDTO result = new BoardCommentDTO();
        result.setList(comments);
        result.setCounts(count);

        return result;
    }

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
