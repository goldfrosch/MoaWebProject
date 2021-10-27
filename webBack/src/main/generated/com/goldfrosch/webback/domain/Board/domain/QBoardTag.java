package com.goldfrosch.webback.domain.Board.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QBoardTag is a Querydsl query type for BoardTag
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBoardTag extends EntityPathBase<BoardTag> {

    private static final long serialVersionUID = 1055553099L;

    public static final QBoardTag boardTag = new QBoardTag("boardTag");

    public final EnumPath<BoardList> category = createEnum("category", BoardList.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath tag = createString("tag");

    public QBoardTag(String variable) {
        super(BoardTag.class, forVariable(variable));
    }

    public QBoardTag(Path<? extends BoardTag> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBoardTag(PathMetadata metadata) {
        super(BoardTag.class, metadata);
    }

}

