package com.goldfrosch.webback.domain.Main.api;

import com.goldfrosch.webback.domain.Admin.Banner.application.BannerService;
import com.goldfrosch.webback.domain.Board.application.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MainRestController {
    private final BannerService bannerService;
    private final BoardService boardService;

    @GetMapping("/main")
    public String test() {
        return "test";
    }
}
