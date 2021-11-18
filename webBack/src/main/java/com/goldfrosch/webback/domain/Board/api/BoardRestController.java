package com.goldfrosch.webback.domain.Board.api;

import com.goldfrosch.webback.domain.Board.application.BoardCommentService;
import com.goldfrosch.webback.domain.Board.application.BoardService;
import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardComment.BoardCommentDAO;
import com.goldfrosch.webback.domain.Board.entity.dao.Board.BoardDAO;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardComment.BoardCommentUpdateDAO;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardSearchType;
import com.goldfrosch.webback.domain.Board.entity.dto.Board.BoardDetailDTO;
import com.goldfrosch.webback.domain.Board.persistance.Board.BoardQueryRepository;
import com.goldfrosch.webback.domain.User.domain.User;
import com.goldfrosch.webback.global.common.response.PagingResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
public class BoardRestController {

    private final BoardService boardService;

    private final BoardCommentService boardCommentService;

    private final BoardQueryRepository boardQueryRepository;

    //보드형 리스트 관련 api
    @GetMapping("/boards")
    public PagingResponse getBoardPaging (
        @RequestParam BoardList category,
        @RequestParam int page,
        @RequestParam(required = false, defaultValue = "10") int size,
        @RequestParam(required = false, defaultValue = "TITLE") BoardSearchType type,
        @RequestParam(required = false, defaultValue = "") String query
    ){
        PagingResponse pagingResponse = new PagingResponse(
                boardQueryRepository.getBoardList(BoardList.NOTICE, 3),
                boardQueryRepository.getBoardFindbyCategory(category, page, size, type, query)
        );

        return pagingResponse;
    }

    //특정 보드 데이터 가져오기
    @GetMapping("/boards/{id}")
    public BoardDetailDTO getBoardById(@PathVariable Long id) {
        BoardDetailDTO result = new BoardDetailDTO();

        result.setDetail(boardQueryRepository.getBoardById(id));
        result.setComments(boardCommentService.getBoardComments(id));

        return result;
    }

    //보드별 태그 리스트 가져오기
    @GetMapping("/board/tags/{type}")
    public List<String> getBoardTag(@PathVariable BoardList type) {
        return boardQueryRepository.getBoardTag(type);
    }

    //보드 업로드
    @PostMapping("/board")
    public void postBoard(
            @RequestPart(required = false, value = "file") MultipartFile file,
            @RequestPart(value = "data") BoardDAO board,
            @AuthenticationPrincipal User user
    ) {
        boardService.postBoard(board, file, user);
    }

    //보드 데이터 제거
    @CrossOrigin("*")
    @DeleteMapping("/board/{id}")
    public void deleteBoardById(@PathVariable Long id) {
        boardService.deleteBoardById(id);
    }

    //보드 댓글 관련 api
    @PostMapping("/board/comment")
    public void postBoardComment(@RequestBody BoardCommentDAO boardComment, @AuthenticationPrincipal User user) {
        boardCommentService.postBoardComment(boardComment, user);
    }

    @CrossOrigin("*")
    @PutMapping("/board/comment")
    public void updateBoardComment(@RequestBody BoardCommentUpdateDAO comments) {
        boardCommentService.updateBoardCommentById(comments.getId(), comments.getContext());
    }

    @CrossOrigin("*")
    @DeleteMapping("/board/comment/{id}")
    public void deleteBoardCommentById(@PathVariable Long id) {
        boardCommentService.deleteBoardCommentById(id);
    }
}

