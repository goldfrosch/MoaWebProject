package com.goldfrosch.webback.domain.Board.api;

import com.goldfrosch.webback.domain.Board.application.BoardService;
import com.goldfrosch.webback.domain.Board.entity.dao.BoardDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class BoardRestController {

    private final BoardService boardService;
//    @GetMapping("/boards")
//    public PagingResponse<String> getBoardPaging(
//                @RequestParam(required = false, defaultValue = "1") int page,
//                @RequestParam(required = false, defaultValue = "10") int size,
//                @RequestParam(required = false) String query,
//                @AuthenticationPrincipal User principal
//            )
//    {
//
//    }
    @PostMapping("/board")
    public String postBoard(@RequestBody BoardDAO board) {
        boardService.postBoard(board);
        return "완료";
    }
}
