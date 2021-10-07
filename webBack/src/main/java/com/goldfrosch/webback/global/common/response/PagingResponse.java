package com.goldfrosch.webback.global.common.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PagingResponse<T> {

    private int currentPage;
    private int totalPage;
    private Long totalCount;
    private List<T> list;




}
