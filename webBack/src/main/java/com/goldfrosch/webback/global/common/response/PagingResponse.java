package com.goldfrosch.webback.global.common.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PagingResponse<T> {
    private String title;
    private String context;

    private Long totalCount;

    private List<T> list;
}
