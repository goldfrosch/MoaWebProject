package com.goldfrosch.webback.domain.Board.api;

import com.goldfrosch.webback.domain.User.domain.User;
import com.goldfrosch.webback.global.common.response.PagingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class BoardRestController {

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
}
