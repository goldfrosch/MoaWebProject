package com.goldfrosch.webback.domain.Board.api;

import com.goldfrosch.webback.domain.Board.application.BoardService;
import com.goldfrosch.webback.domain.Board.domain.Board;
import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardDAO;
import com.goldfrosch.webback.domain.Board.persistance.BoardQueryRepository;
import com.goldfrosch.webback.domain.User.domain.User;
import com.goldfrosch.webback.global.common.response.PagingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardRestController {

    private final BoardService boardService;

    private final BoardQueryRepository boardQueryRepository;

    @GetMapping("/boards")
    public List<Board> getBoardPaging (
        @RequestParam(defaultValue = "") BoardList category,
        @RequestParam(required = false, defaultValue = "1") int page,
        @RequestParam(required = false, defaultValue = "10") int size,
        @RequestParam(required = false) String query
    ){
        if(category.equals("")) {
            return boardQueryRepository.getBoardFindAll(page, size);
        }
        else {
            return boardQueryRepository.getBoardFindbyCategory(category, page, size);
        }
    }

//    @GetMapping("/board/{id}")
//    public String postBoard(@PathVariable Long id) {
//        boardService.postBoard(board);
//        return "완료";
//    }

    @PostMapping("/board")
    public String postBoard(@RequestBody BoardDAO board, @AuthenticationPrincipal User user) {
        boardService.postBoard(board, user);
        return "완료";
    }
}
