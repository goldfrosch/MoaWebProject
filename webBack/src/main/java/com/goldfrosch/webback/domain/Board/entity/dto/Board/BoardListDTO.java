package com.goldfrosch.webback.domain.Board.entity.dto.Board;

import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class BoardListDTO {
    private Long id;

    private String title;

    private BoardList category;

    private String prefix;

    private String profile;

    private String thumbnail;

    private LocalDateTime createdDate;

    private int count;

    private Long commentCount;

    private String nickName;

    private int rank;

    private String uuid;

    private Long isLove;

    @QueryProjection
    public BoardListDTO(
            Long id,
            String title,
            BoardList category,
            String prefix,
            String profile,
            String thumbnail,
            LocalDateTime createdDate,
            int count,
            Long commentCount,
            String nickName,
            int rank,
            String uuid,
            Long isLove
            ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.prefix = prefix;
        this.profile = profile;
        this.thumbnail = thumbnail;
        this.createdDate = createdDate;
        this.count = count;
        this.commentCount = commentCount;
        this.nickName = nickName;
        this.rank = rank;
        this.uuid = uuid;
        this.isLove = isLove;
    }
}
