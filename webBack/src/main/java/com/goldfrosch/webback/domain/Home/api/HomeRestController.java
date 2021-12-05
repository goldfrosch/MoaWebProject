package com.goldfrosch.webback.domain.Home.api;

import com.goldfrosch.webback.domain.Board.application.BoardService;
import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.goldfrosch.webback.domain.Home.entity.dto.HomeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeRestController {
    private final BoardService boardService;

    @GetMapping("/home")
    public HomeDTO getHomeList(HttpServletResponse response) {
        HomeDTO setHome = new HomeDTO();

        setHome.setNoticeList(boardService.getTopBoardList(BoardList.NOTICE, 4));
        setHome.setUpdateList(boardService.getTopBoardList(BoardList.UPDATE, 4));
        setHome.setPhotoList(boardService.getTopBoardList(BoardList.PHOTO, 4));

        Cookie cookie = new Cookie("view", null);
        cookie.setComment("게시글 조회");
        cookie.setMaxAge(60 * 60 * 24);

        response.addCookie(cookie);

        return setHome;
    }
}
