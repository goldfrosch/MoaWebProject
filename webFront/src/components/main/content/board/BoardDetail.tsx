import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DateUtils from "utils/DateUtils";

import { IBoardDetail } from "modules/board/type";
import Button from "components/common/items/Button";
import { ThemeColor, ThemeSize } from "styles/Pallete";
import { IProfile } from "modules/auth/type";
import BoardProfile from "components/common/items/BoardProfile";
interface BoardDetailProps {
  data: IBoardDetail;
  profile: IProfile;
}
const BoardDetail: React.FC<BoardDetailProps> = ({ data, profile }) => {
  const [datas, setDatas] = useState<IBoardDetail>({ ...data });
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    setDatas({ ...data });
  }, [data]);

  return (
    <BoardDetailBlock>
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
            src={`https://mc-heads.net/avatar/${datas.detail.uuid}`}
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
      ></div>
      {datas.detail.isComment && (
        <div className="footer">
          <div className="commentsCount">
            <span>{datas.comments.counts}개의 댓글</span>
          </div>
          <textarea
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            placeholder="댓글을 작성해주세요"
          />
          <div className="commentOption">
            <Button theme={ThemeColor.first} size={ThemeSize.large}>
              작성
            </Button>
          </div>
        </div>
      )}
      {datas.detail.isComment ? (
        <div className="comments">
          {datas.comments.list.map((item, key) => (
            <div className="item" key={key}>
              <div className="profile">
                <BoardProfile
                  nickName={item.comment.nickName}
                  uuid={item.comment.uuid}
                  createdDate={item.comment.createdDate}
                />
                {item.comment.uuid === profile.uuid && (
                  <div>
                    <Button theme={ThemeColor.first} size={ThemeSize.small}>
                      수정
                    </Button>
                    <span> </span>
                    <Button theme={ThemeColor.first} size={ThemeSize.small}>
                      삭제
                    </Button>
                  </div>
                )}
              </div>
              <textarea defaultValue={item.comment.comment} disabled={true} />
              {item.replyList.length > 0 && (
                <div className="replyList">
                  <span>답글보기</span>
                  {item.replyList.map((reply, index) => (
                    <div className="reply" key={index}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "space-between"
                        }}
                      >
                        <BoardProfile
                          nickName={reply.nickName}
                          uuid={reply.uuid}
                          createdDate={reply.createdDate}
                        />
                        {reply.uuid === profile.uuid && (
                          <div>
                            <Button
                              theme={ThemeColor.first}
                              size={ThemeSize.small}
                            >
                              수정
                            </Button>
                            <span> </span>
                            <Button
                              theme={ThemeColor.first}
                              size={ThemeSize.small}
                            >
                              삭제
                            </Button>
                          </div>
                        )}
                      </div>

                      <textarea defaultValue={reply.comment} disabled={true} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="footer"
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#979797"
          }}
        >
          <span>댓글 기능을 중지한 게시글입니다</span>
        </div>
      )}
    </BoardDetailBlock>
  );
};

const BoardDetailBlock = styled.div`
  padding: 32px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
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
        font-weight: 600;
        font-size: 20px;
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
        width: 16px;
        height: 16px;
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
      & > textarea {
        width: 100%;

        border: 2px solid #e9e9e9;
        border-radius: 8px;

        padding: 8px;

        resize: none;
      }
      & > textarea:disabled {
        background-color: white;
      }

      & > .replyList {
        padding-left: 8px;
        & > span {
          color: #979797;
          cursor: pointer;
        }
        & > .reply {
          padding-left: 24px;
          & > textarea {
            width: 100%;

            border: 2px solid #e9e9e9;
            border-radius: 8px;

            padding: 8px;

            resize: none;
          }
          & > textarea:disabled {
            background-color: white;
          }
        }
      }
    }
  }
`;
export default BoardDetail;
