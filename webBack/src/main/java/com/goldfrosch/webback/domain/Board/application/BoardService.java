package com.goldfrosch.webback.domain.Board.application;

import com.goldfrosch.webback.domain.Board.persistance.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
}
