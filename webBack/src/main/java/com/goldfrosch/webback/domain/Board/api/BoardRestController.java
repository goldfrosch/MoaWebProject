package com.goldfrosch.webback.domain.Board.api;

import com.goldfrosch.webback.domain.Board.application.BoardService;
import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.goldfrosch.webback.domain.Board.domain.BoardTag;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardDAO;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardSearchType;
import com.goldfrosch.webback.domain.Board.entity.dto.BoardItemDTO;
import com.goldfrosch.webback.domain.Board.entity.dto.BoardListDTO;
import com.goldfrosch.webback.domain.Board.persistance.BoardQueryRepository;
import com.goldfrosch.webback.domain.User.domain.User;
import com.goldfrosch.webback.global.common.response.PagingResponse;
import com.querydsl.core.QueryResults;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
public class BoardRestController {

    private final BoardService boardService;

    private final BoardQueryRepository boardQueryRepository;

    @GetMapping("/boards")
    public PagingResponse getBoardPaging (
        @RequestParam BoardList category,
        @RequestParam int page,
        @RequestParam(required = false, defaultValue = "10") int size,
        @RequestParam(required = false, defaultValue = "TITLE") BoardSearchType type,
        @RequestParam(required = false, defaultValue = "") String query
    ){
        PagingResponse pagingResponse = new PagingResponse(
                boardQueryRepository.getBoardNotice(category, 3),
                boardQueryRepository.getBoardFindbyCategory(category, page, size, type, query)
        );

        return pagingResponse;
    }

    @GetMapping("/boards/{id}")
    public BoardItemDTO getBoardById(@PathVariable Long id) {
        return boardQueryRepository.getBoardById(id);
    }

    @GetMapping("/board/tags/{type}")
    public List<String> getBoardTag(@PathVariable BoardList type) {
        return boardQueryRepository.getBoardTag(type);
    }

    @PostMapping("/board")
    public Boolean postBoard(@RequestBody BoardDAO board, @AuthenticationPrincipal User user) {
        try {
            boardService.postBoard(board, user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @DeleteMapping("/board/{id}")
    public Boolean deleteBoardById(@PathVariable Long id) {
        try {
            boardService.deleteBoardById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
