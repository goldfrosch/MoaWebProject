package com.goldfrosch.webback.domain.Admin.Banner.persistance;

import com.goldfrosch.webback.domain.Admin.Banner.domain.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepository extends JpaRepository<Banner, Long> {
}
