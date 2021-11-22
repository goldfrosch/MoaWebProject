package com.goldfrosch.webback.domain.Home.entity.dto;

import com.goldfrosch.webback.domain.Board.entity.dto.Board.BoardListDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class HomeDTO {
    private List<BoardListDTO> noticeList;

    private List<BoardListDTO> updateList;

    private List<BoardListDTO> photoList;
}
