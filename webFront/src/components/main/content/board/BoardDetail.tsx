import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DateUtils from "utils/DateUtils";

import { IBoardDetail } from "modules/board/type";
import Button from "components/common/items/Button";
import { ThemeColor, ThemeSize } from "styles/Pallete";
import { IProfile } from "modules/auth/type";

import Comment from "components/common/items/Comment";
import { Link } from "react-router-dom";

interface BoardDetailProps {
  data: IBoardDetail;
  profile: IProfile;
  deleteBoard: () => void;
  deleteComment: (id: number) => void;
  postComment: (content: string, parentNum: number) => void;
  putComment: (id: number, context: string) => void;
}

const BoardDetail: React.FC<BoardDetailProps> = ({
  data,
  profile,
  deleteBoard,
  deleteComment,
  postComment,
  putComment
}) => {
  const [datas, setDatas] = useState<IBoardDetail>({ ...data });
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    setDatas({ ...data });
  }, [data]);

  return (
    <BoardDetailBlock>
      {data.detail.id !== 0 ? (
        <>
          <div className="header">
            <div className="text">
              <span className="prefix">
                {datas.detail.prefix !== "" ? (
                  <>[ {datas.detail.prefix} ]</>
                ) : (
                  datas.detail.prefix
                )}
              </span>
              <span className="title">{datas.detail.title}</span>
            </div>
            <div className="profile">
              <img
                src={`https://crafatar.com/renders/head/${datas.detail.uuid}`}
                alt=""
              />
              <span className="nick">{datas.detail.nickName}</span>
              <span className="time">
                {DateUtils.getPrevTime(datas.detail.createdDate)}
              </span>
            </div>
          </div>
          <div
            className="board"
            dangerouslySetInnerHTML={{
              __html: datas.detail.content
            }}
          />
          {datas.detail.isComment && (
            <div className="footer">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "8px"
                }}
              >
                {/* {profile.uuid === data.detail.uuid && (
                  <Link to={`/board/edit${data.detail.id}`}>
                    <Button theme={ThemeColor.first} size={ThemeSize.middle}>
                      수정
                    </Button>
                  </Link>
                )} */}
                <span style={{ margin: "0 4px" }} />
                {(profile.uuid === data.detail.uuid || profile.rank > 4) && (
                  <Button
                    theme={ThemeColor.first}
                    size={ThemeSize.middle}
                    onClick={deleteBoard}
                  >
                    삭제
                  </Button>
                )}
              </div>
              <div className="commentsCount">
                <span>{datas.comments.counts}개의 댓글</span>
              </div>
              <textarea
                value={comment}
                onChange={(e: any) => setComment(e.target.value)}
                placeholder="댓글을 작성해주세요"
              />
              <div className="commentOption">
                <Button
                  theme={ThemeColor.first}
                  size={ThemeSize.large}
                  onClick={() => postComment(comment, 0)}
                >
                  댓글작성
                </Button>
              </div>
            </div>
          )}
          {datas.detail.isComment ? (
            datas.comments.list.map((item, key) => (
              <Comment
                item={item}
                profile={profile}
                deleteComment={deleteComment}
                postComment={postComment}
                putComment={putComment}
                key={key}
              />
            ))
          ) : (
            <div
              className="footer"
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#979797"
              }}
            >
              {/* {profile.uuid === data.detail.uuid && (
                  <Link to={`/board/edit${data.detail.id}`}>
                    <Button theme={ThemeColor.first} size={ThemeSize.middle}>
                      수정
                    </Button>
                  </Link>
                )} */}
              <span style={{ margin: "0 4px" }} />
              {(profile.uuid === data.detail.uuid || profile.rank > 4) && (
                <Button
                  theme={ThemeColor.first}
                  size={ThemeSize.middle}
                  onClick={deleteBoard}
                >
                  삭제
                </Button>
              )}
              <span>댓글 기능을 중지한 게시글입니다</span>
            </div>
          )}
        </>
      ) : (
        <div
          className="footer"
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#979797"
          }}
        >
          <span>존재하지 않는 게시글입니다</span>
        </div>
      )}
    </BoardDetailBlock>
  );
};

const BoardDetailBlock = styled.div`
  height: 100%;
  min-height: 90vh;

  padding: 32px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  textarea {
    width: 100%;

    border: 2px solid #e9e9e9;
    border-radius: 8px;

    padding: 8px;

    resize: none;
  }
  textarea:disabled {
    background-color: white;
  }

  & > .header {
    width: 100%;
    border-bottom: 1px solid #e9e9e9;

    margin-bottom: 24px;

    padding: 24px;

    display: flex;
    justify-content: space-between;
    @media (max-width: 800px) {
      padding: 8px;

      flex-direction: column;
    }
    & > .text {
      padding: 16px 0;
      & > .title {
        max-width: 40%;
        text-overflow: ellipsis;

        font-weight: 600;
        font-size: 24px;
        color: #787878;

        padding: 0 8px;
      }
      & > .prefix {
        font-size: 14px;
      }
    }
    & > .profile {
      display: flex;
      align-items: flex-end;

      padding: 16px 4px;
      & > img {
        width: 24px;
        height: 24px;
      }
      & > .nick {
        font-size: 12px;
        font-weight: 500;

        padding: 0 4px;
      }
      & > .time {
        color: #575757;

        padding-left: 8px;

        font-size: 8px;
        font-weight: 500;
      }
    }
  }
  & > .board {
    width: 100%;

    padding: 16px;
    margin-bottom: 16px;

    overflow: auto;
  }
  & > .footer {
    width: 100%;
    border-top: 1px solid #e9e9e9;
    padding: 16px 0;
    & > .commentsCount {
      margin-bottom: 8px;
      & > span {
        font-weight: 500;
        padding-left: 8px;
      }
    }
    & > textarea {
      width: 100%;
      height: 128px;

      background-color: none;
      border: none;
      border-bottom: 1px solid #e9e9e9;
      font-size: 14px;

      padding: 12px;

      resize: none;
    }
    & > .commentOption {
      width: 100%;

      display: flex;
      align-items: flex-end;
      justify-content: flex-end;

      & > span {
        font-size: 14px;
        font-weight: 500;
        padding-right: 12px;
        padding-bottom: 5px;
      }
    }
  }
  & > .comments {
    width: 100%;
    & > .item {
      & > .profile {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      & > .replyList {
        padding-left: 8px;
        & > span {
          color: #979797;
          cursor: pointer;
        }
        & > .reply {
          padding-left: 24px;
        }
      }
    }
  }
`;
export default BoardDetail;
