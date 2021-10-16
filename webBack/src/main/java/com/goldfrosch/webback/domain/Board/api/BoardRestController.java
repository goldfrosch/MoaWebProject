package com.goldfrosch.webback.domain.Board.api;

import com.goldfrosch.webback.domain.Board.application.BoardService;
import com.goldfrosch.webback.domain.Board.domain.Board;
import com.goldfrosch.webback.domain.Board.dto.BoardDTO;
import com.goldfrosch.webback.domain.User.domain.User;
import com.goldfrosch.webback.global.common.response.ApiResponse;
import com.goldfrosch.webback.global.common.response.PagingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

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
    public ApiResponse<String> postBoard(@RequestBody BoardDTO board) {
        boardService.postBoard(board);
        return new ApiResponse<>(HttpStatus.OK,"완료");
    }
}
