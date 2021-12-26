package com.goldfrosch.webback.domain.Board.application;

import com.goldfrosch.webback.domain.Board.domain.Board;
import com.goldfrosch.webback.domain.Board.domain.BoardList;
import com.goldfrosch.webback.domain.Board.entity.dao.Board.BoardDAO;
import com.goldfrosch.webback.domain.Board.entity.dto.Board.BoardListDTO;
import com.goldfrosch.webback.domain.Board.persistance.Board.BoardQueryRepository;
import com.goldfrosch.webback.domain.Board.persistance.Board.BoardRepository;
import com.goldfrosch.webback.domain.User.domain.User;
import com.goldfrosch.webback.global.utils.FileUpload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final BoardQueryRepository boardQueryRepository;


    //Transactional 어노테이션이 설정된 메소드의 sql query 들이 전부 성공되어야만 실행된다.
    //Transactional 만 쓰면 롤백이 안되고 (rollbackFor = Exception.class)를 붙이면 롤백 예외처리가 실행된다.
    @Transactional
    public void postBoard(BoardDAO board, MultipartFile file, User user) {
        Board newBoard = Board.builder()
                .user(user)
                .category(board.getCategory())
                .content(board.getContent())
                .createdDate(LocalDateTime.now())
                .modifiedDate(LocalDateTime.now())
                .isComment(board.getIsComment())
                .prefix(board.getPrefix())
                .thumbnail(file == null ? "" : FileUpload.uploadImage(file, user.getUuid()))
                .title(board.getTitle())
                .build();
        boardRepository.save(newBoard);
    }

    @Transactional
    public List<BoardListDTO> getTopBoardList(BoardList category, int limit) {
        return boardQueryRepository.getBoardList(category, limit);
    }

    @Transactional
    public void updateBoard(Long id, BoardDAO board) {
        boardQueryRepository.updateBoard(id, board);
    }

    @Transactional
    public void addViewCountBoard(Long id, HttpServletRequest req, HttpServletResponse res) {
        Cookie oldCookie = null;
        Cookie[] cookies = req.getCookies();

        Board board = boardRepository.getOne(id);

        if(cookies != null) {
            log.info(String.valueOf(cookies));
            for(Cookie cookie: cookies) {
                if(cookie.getName().equals("boardView")) {
                    oldCookie = cookie;
                }
            }
        }

        if(oldCookie != null) {
            if (!oldCookie.getValue().contains("[" + id + "]")) {
                board.setCount(board.getCount() + 1);

                oldCookie.setValue(oldCookie.getValue() + "_[" + id + "]");
                oldCookie.setPath("/");
                oldCookie.setMaxAge(60 * 60 * 24);

                res.addCookie(oldCookie);
            }
        }
        else {
            board.setCount(board.getCount() + 1);

            Cookie newCookie = new Cookie("boardView", "[" + id + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);

            res.addCookie(newCookie);
        }
    }

    @Transactional
    public void deleteBoardById(Long id) {
        boardRepository.deleteById(id);
    }
}
