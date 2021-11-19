import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DateUtils from "utils/DateUtils";

import { IBoardDetail } from "modules/board/type";
import Button from "components/common/items/Button";
import { ThemeColor, ThemeSize } from "styles/Pallete";
import { IProfile } from "modules/auth/type";

import Comment from "components/common/items/Comment";

interface BoardDetailProps {
  data: IBoardDetail;
  profile: IProfile;
  deleteComment: (id: number) => void;
  postComment: (content: string, parentNum: number) => void;
}

const BoardDetail: React.FC<BoardDetailProps> = ({
  data,
  profile,
  deleteComment,
  postComment
}) => {
  const [datas, setDatas] = useState<IBoardDetail>({ ...data });
  const [comment, setComment] = useState<string>("");

  const seeReplyList = (id: number) => {
    let dataList: IBoardDetail = datas;

    dataList.comments.list[id].isShowReply =
      !dataList.comments.list[id].isShowReply;

    setDatas({ ...dataList });
  };

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
                  작성
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
              <span>댓글 기능을 중지한 게시글입니다</span>
            </div>
          )}
          {/* {datas.detail.isComment ? (
            <div className="comments">
              {datas.comments.list.map((item, key) => (
                <div className="item" key={key}>
                  <div className="profile">
                    {item.comment.isDeleted ? (
                      <BoardProfile
                        nickName={"삭제됨"}
                        uuid={"7b216089b1f644a4ac76bf711009df0e"}
                        createdDate={item.comment.createdDate}
                      />
                    ) : (
                      <>
                        <BoardProfile
                          nickName={item.comment.nickName}
                          uuid={item.comment.uuid}
                          createdDate={item.comment.createdDate}
                        />
                        <div>
                          {item.comment.uuid === profile.uuid && (
                            <Button
                              theme={ThemeColor.first}
                              size={ThemeSize.small}
                            >
                              수정
                            </Button>
                          )}
                          <span> </span>
                          {(item.comment.uuid === profile.uuid ||
                            profile.rank >= 5) && (
                            <Button
                              theme={ThemeColor.first}
                              size={ThemeSize.small}
                              onClick={() => deleteComment(item.comment.id)}
                            >
                              삭제
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  {item.comment.isDeleted ? (
                    <textarea
                      value="삭제된 게시글 입니다"
                      disabled={true}
                      style={{ color: "gray" }}
                    />
                  ) : (
                    <textarea
                      defaultValue={item.comment.comment}
                      disabled={true}
                    />
                  )}
                  <div className="replyList">
                    <span onClick={() => seeReplyList(key)}>답글보기</span>
                    {item.isShowReply === true && (
                      <>
                        {item.replyList.map((reply, index) => (
                          <div className="reply" key={index}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "space-between"
                              }}
                            >
                              {reply.isDeleted ? (
                                <BoardProfile
                                  nickName={"삭제됨"}
                                  uuid={"7b216089b1f644a4ac76bf711009df0e"}
                                  createdDate={item.comment.createdDate}
                                />
                              ) : (
                                <>
                                  <BoardProfile
                                    nickName={reply.nickName}
                                    uuid={reply.uuid}
                                    createdDate={reply.createdDate}
                                  />
                                  <div>
                                    {reply.uuid === profile.uuid && (
                                      <Button
                                        theme={ThemeColor.first}
                                        size={ThemeSize.small}
                                      >
                                        수정
                                      </Button>
                                    )}
                                    <span> </span>
                                    {(reply.uuid === profile.uuid ||
                                      profile.rank >= 5) && (
                                      <Button
                                        theme={ThemeColor.first}
                                        size={ThemeSize.small}
                                        onClick={() => deleteComment(reply.id)}
                                      >
                                        삭제
                                      </Button>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                            {reply.isDeleted ? (
                              <textarea
                                defaultValue={"삭제된 댓글 입니다"}
                                disabled={!reply.isEdit}
                                style={{ color: "gray" }}
                              />
                            ) : (
                              <textarea
                                defaultValue={reply.comment}
                                disabled={true}
                              />
                            )}
                          </div>
                        ))}
                        <div
                          style={{
                            marginTop: "16px",
                            marginBottom: "4px",
                            paddingLeft: "24px"
                          }}
                        >
                          <textarea
                            style={{ margin: "8px 0" }}
                            value={datas.comments.list[key].replyComment || ""}
                            onChange={(e: any) => {
                              let replyItem = datas.comments.list;
                              replyItem[key].replyComment = e.target.value;
                              setDatas({
                                ...datas,
                                comments: {
                                  ...datas.comments,
                                  list: [...replyItem]
                                }
                              });
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end"
                            }}
                          >
                            <span style={{ paddingRight: "8px" }}>
                              새 답글 달기:
                            </span>
                            <Button
                              theme={ThemeColor.first}
                              size={ThemeSize.small}
                              onClick={() =>
                                postComment(
                                  datas.comments.list[key].replyComment !==
                                    undefined
                                    ? String(
                                        datas.comments.list[key].replyComment
                                      )
                                    : "",
                                  item.comment.id
                                )
                              }
                            >
                              등록
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
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
          )} */}
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
        font-weight: 600;
        font-size: 32px;
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
