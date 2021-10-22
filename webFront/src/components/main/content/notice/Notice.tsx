import BoardList, {
  BoardListProps,
} from "components/common/template/board/BoardList";
import React from "react";

const BoardProps: BoardListProps = {
  title: "공지사항",
  context: "서버 내부, 외부에 관련된 공지를 확인 가능합니다",
  notice: ["1", "2", "3", "4", "5", "6"],
};
interface NoticeProps {}

const Notice: React.FC<NoticeProps> = () => {
  return (
    <BoardList
      title={BoardProps.title}
      context={BoardProps.context}
      notice={BoardProps.notice}
    >
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
    </BoardList>
  );
};

export default Notice;
