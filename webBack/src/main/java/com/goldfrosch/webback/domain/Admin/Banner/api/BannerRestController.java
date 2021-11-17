package com.goldfrosch.webback.domain.Admin.Banner.api;

import com.goldfrosch.webback.domain.Admin.Banner.application.BannerService;
import com.goldfrosch.webback.domain.Admin.Banner.domain.Banner;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
//RequestMapping -> 사전 api링크 설정
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BannerRestController {
    private final BannerService bannerService;

    @GetMapping("/banners")
    public List<Banner> getBanners() {
        return bannerService.getBanners();
    }
}
