package com.goldfrosch.webback.global.common.response;

import com.goldfrosch.webback.domain.Board.entity.dto.BoardListDTO;
import com.querydsl.core.QueryResults;
import lombok.*;

import java.util.List;

@Getter
@Setter
public class PagingResponse {
    private List<BoardListDTO> newNotice;
    private QueryResults<BoardListDTO> list;

    public PagingResponse(List<BoardListDTO> newNotice, QueryResults<BoardListDTO> list) {
        this.newNotice = newNotice;
        this.list = list;
    }
}
