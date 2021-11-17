package com.goldfrosch.webback.domain.Admin.Banner.application;

import com.goldfrosch.webback.domain.Admin.Banner.domain.Banner;
import com.goldfrosch.webback.domain.Admin.Banner.persistance.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BannerService {
    private final BannerRepository bannerRepository;

    public List<Banner> getBanners() {
        return bannerRepository.findAll();
    }
}
