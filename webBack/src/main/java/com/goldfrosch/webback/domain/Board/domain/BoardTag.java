package com.goldfrosch.webback.domain.Board.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class BoardTag {
    @Id
    private Long id;

    @Enumerated(EnumType.STRING)
    private BoardList category;

    @Column(nullable = false)
    private String tag;
}
