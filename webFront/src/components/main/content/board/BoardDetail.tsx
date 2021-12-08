import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DateUtils from "utils/DateUtils";

import { IBoardDetail } from "modules/board/type";
import Button from "components/common/items/Button";
import { Palette, ThemeColor, ThemeSize } from "styles/Pallete";
import { IProfile } from "modules/auth/type";

import Comment from "components/common/items/comment/Comment";
import { Link } from "react-router-dom";
import OptionList from "components/common/items/optionMenu/Option";
import OptionItem from "components/common/items/optionMenu/OptionItem";

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
              <div className="item">
                <img
                  src={`https://crafatar.com/renders/head/${
                    datas.detail.uuid !== ""
                      ? datas.detail.uuid
                      : "ec561538-f3fd-461d-aff5-086b22154bce"
                  }`}
                  alt=""
                />
                <span className="nick">{datas.detail.nickName}</span>
                <span className="time">
                  {DateUtils.getPrevTime(datas.detail.createdDate)}
                </span>
              </div>
              {(profile.uuid === data.detail.uuid || profile.rank > 4) && (
                <OptionList>
                  {profile.uuid === data.detail.uuid && (
                    <Link to={`/board/edit/${data.detail.id}`}>
                      <OptionItem>
                        <span>수정</span>
                      </OptionItem>
                    </Link>
                  )}
                  <OptionItem onClick={deleteBoard}>
                    <span>삭제</span>
                  </OptionItem>
                </OptionList>
              )}
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
              <div className="commentsCount">
                <span>{datas.comments.counts}개의 댓글</span>
              </div>
              <textarea
                value={comment}
                onChange={(e: any) => {
                  if (e.target.value.length <= 300) {
                    setComment(e.target.value);
                  }
                }}
                placeholder="댓글을 작성해주세요"
              />
              <div className="commentOption">
                <span>글자 수 제한: {comment.length} / 300</span>
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
            <div className="footer">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              ></div>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#979797"
                }}
              >
                댓글 기능을 중지한 게시글입니다
              </span>
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
    min-height: 96px;
    border: 2px solid ${Palette.borderGray};
    border-radius: 8px;

    padding: 8px;

    resize: none;
  }
  textarea:disabled {
    background-color: white;
  }

  & > .header {
    width: 100%;
    border-bottom: 1px solid ${Palette.borderGray};

    margin-bottom: 24px;

    padding: 24px;

    display: flex;
    justify-content: space-between;
    @media (max-width: 800px) {
      padding: 8px;

      flex-direction: column;
    }
    & > .text {
      flex: 1;
      padding: 16px 0;
      & > .title {
        max-width: 40%;

        font-weight: 600;
        font-size: 24px;
        color: #787878;

        padding: 0 8px;
      }
      & > .prefix {
        font-size: 14px;
      }
      @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        & > .title {
          max-width: 100%;
          font-size: 4.5vw;

          padding: 0;
        }
        & > .prefix {
          font-size: 2vw;
        }
      }
    }
    & > .profile {
      display: flex;
      align-items: center;

      padding: 16px 4px;
      & > .item {
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
      @media (max-width: 768px) {
        justify-content: space-between;
      }
    }
  }
  & > .board {
    width: 100%;
    min-height: 50vh;

    padding: 16px;
    margin-bottom: 16px;

    overflow: auto;
  }
  & > .footer {
    width: 100%;
    border-top: 1px solid ${Palette.borderGray};
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
      min-height: 144px;

      background-color: none;
      border: none;
      border-bottom: 1px solid ${Palette.borderGray};
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
