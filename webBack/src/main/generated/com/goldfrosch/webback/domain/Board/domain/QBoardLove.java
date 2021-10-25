package com.goldfrosch.webback.domain.Board.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoardLove is a Querydsl query type for BoardLove
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBoardLove extends EntityPathBase<BoardLove> {

    private static final long serialVersionUID = -1637816607L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoardLove boardLove = new QBoardLove("boardLove");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isLove = createBoolean("isLove");

    public final NumberPath<Long> num = createNumber("num", Long.class);

    public final com.goldfrosch.webback.domain.User.domain.QUser user;

    public QBoardLove(String variable) {
        this(BoardLove.class, forVariable(variable), INITS);
    }

    public QBoardLove(Path<? extends BoardLove> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoardLove(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoardLove(PathMetadata metadata, PathInits inits) {
        this(BoardLove.class, metadata, inits);
    }

    public QBoardLove(Class<? extends BoardLove> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.goldfrosch.webback.domain.User.domain.QUser(forProperty("user")) : null;
    }

}

