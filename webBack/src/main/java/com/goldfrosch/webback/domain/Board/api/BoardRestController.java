package com.goldfrosch.webback.domain.Board.api;

import com.goldfrosch.webback.domain.Board.application.BoardService;
import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardDAO;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardSearchType;
import com.goldfrosch.webback.domain.Board.entity.dto.BoardListDTO;
import com.goldfrosch.webback.domain.Board.persistance.BoardQueryRepository;
import com.goldfrosch.webback.domain.User.domain.User;
import com.querydsl.core.QueryResults;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
public class BoardRestController {

    private final BoardService boardService;

    private final BoardQueryRepository boardQueryRepository;

    @GetMapping("/boards")
    public QueryResults<BoardListDTO> getBoardPaging (
        @RequestParam(defaultValue = "ALL") BoardList category,
        @RequestParam(required = false, defaultValue = "1") int page,
        @RequestParam(required = false, defaultValue = "10") int size,
        @RequestParam(required = false, defaultValue = "TITLE") BoardSearchType type,
        @RequestParam(required = false, defaultValue = "") String query
    ){
        return boardQueryRepository.getBoardFindbyCategory(category, page, size, type, query);
    }

    @GetMapping("/board/{id}")
    public BoardListDTO getBoardById(@PathVariable Long id) {
        return boardQueryRepository.getBoardById(id);
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
