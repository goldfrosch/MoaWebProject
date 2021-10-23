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
public class BoardDesc {
    @Id
    private String category;

    @Column
    private String title;

    @Column
    private String context;
}
