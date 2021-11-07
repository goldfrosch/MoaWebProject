package com.goldfrosch.webback.domain.Board.domain;

import com.goldfrosch.webback.domain.User.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class BoardComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String comment;

    @Column(nullable = false)
    private Long boardNum;

    @Column(nullable = false)
    private Boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private BoardComment parentId;

    @Builder.Default
    @OneToMany(mappedBy = "parentId", orphanRemoval = true)
    private List<BoardComment> children = new ArrayList<>();

    @Column
    private LocalDateTime createdDate;
}
