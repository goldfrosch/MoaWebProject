export interface IDescProps {
  title: string;
  context: string;
}

// 이렇게 말고 DB에 넣어서 불러오는 방안도 고려
const DescData = {
  notice: {
    title: "공지사항",
    context: "서버 내의 공지를 확인하는 게시판"
  },
  update: {
    title: "업데이트",
    context: "서버 내의 업데이트 사항을 확인하는 게시판"
  },
  event: {
    title: "이벤트",
    context: "서버 내의 진행 중인 이벤트를 확인 가능합니다"
  },
  donate: {
    title: "후원상품",
    context: "서버의 후원상품을 확인 가능합니다"
  },

  free: {
    title: "자유게시판",
    context: "규칙 위반을 제외하고 자유롭게 글을 쓰는 게시판"
  },
  photo: {
    title: "사진게시판",
    context: "서버 내에서 잘 찍은 사진을 업로드합시다"
  },
  tip: {
    title: "꿀팁게시판",
    context: "서버 내에서 남모르는 꿀팁을 배포합시다"
  },
  suggest: {
    title: "건의게시판",
    context: "서버 내의 추가사항을 건의합시다"
  },
  qna: {
    title: "자유 QnA",
    context: "자유롭게 qna로 질의응답을 받습니다"
  },
  canvas: {
    title: "내가 그린 기린 그림",
    context: "직접 캔버스에 그림을 그리고 자랑하는 곳!"
  }
};

export default DescData;
