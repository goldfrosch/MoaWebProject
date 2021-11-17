package com.goldfrosch.webback.domain.Main.entity.dto;

import com.goldfrosch.webback.domain.Admin.Banner.domain.Banner;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MainDTO {
    private List<Banner> banners;
}
