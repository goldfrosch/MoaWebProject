package com.goldfrosch.webback.domain.Board.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QBoardDesc is a Querydsl query type for BoardDesc
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBoardDesc extends EntityPathBase<BoardDesc> {

    private static final long serialVersionUID = -1638064640L;

    public static final QBoardDesc boardDesc = new QBoardDesc("boardDesc");

    public final StringPath category = createString("category");

    public final StringPath context = createString("context");

    public final StringPath title = createString("title");

    public QBoardDesc(String variable) {
        super(BoardDesc.class, forVariable(variable));
    }

    public QBoardDesc(Path<? extends BoardDesc> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBoardDesc(PathMetadata metadata) {
        super(BoardDesc.class, metadata);
    }

}

