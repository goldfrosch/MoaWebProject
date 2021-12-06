package com.goldfrosch.webback.domain.Home.api;

import com.goldfrosch.webback.domain.Board.application.BoardService;
import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.goldfrosch.webback.domain.Home.entity.dto.HomeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeRestController {
    private final BoardService boardService;

    @GetMapping("/home")
    public HomeDTO getHomeList() {
        HomeDTO setHome = new HomeDTO();

        setHome.setNoticeList(boardService.getTopBoardList(BoardList.NOTICE, 4));
        setHome.setUpdateList(boardService.getTopBoardList(BoardList.UPDATE, 4));
        setHome.setPhotoList(boardService.getTopBoardList(BoardList.PHOTO, 4));

        return setHome;
    }
}
