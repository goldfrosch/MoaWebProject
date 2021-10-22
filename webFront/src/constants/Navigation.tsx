export interface ILinkData {
  title: string;
  link: string;
}

export interface INavigation {
  title: string;
  data: ILinkData[];
}

const Navigation: INavigation[] = [
  {
    title: "튜토리얼",
    data: [
      {
        title: "모아서버",
        link: "/tutorial/moa",
      },
      {
        title: "백설기온라인",
        link: "/tutorial/wsg",
      },
    ],
  },
  {
    title: "공지사항",
    data: [
      {
        title: "공지사항",
        link: "/notice/notice",
      },
      {
        title: "업데이트",
        link: "/notice/update",
      },
      {
        title: "이벤트",
        link: "/notice/event",
      },
    ],
  },
  {
    title: "커뮤니티",
    data: [
      {
        title: "자유게시판",
        link: "/community/free",
      },
      {
        title: "사진게시판",
        link: "/community/photo",
      },
      {
        title: "꿀팁게시판",
        link: "/community/tip",
      },
      {
        title: "건의게시판",
        link: "/community/suggest",
      },
      {
        title: "자유 QnA",
        link: "/community/qna",
      },
      {
        title: "내그기그",
        link: "/community/canvas",
      },
    ],
  },
  {
    title: "신고관리",
    data: [
      {
        title: "버그제보",
        link: "/report/bug",
      },
      {
        title: "유저신고",
        link: "/report/user",
      },
      {
        title: "처리완료",
        link: "/report/done",
      },
      {
        title: "이의신청",
        link: "/report/opposition",
      },
      {
        title: "사과게시판",
        link: "/report/apology",
      },
    ],
  },
  {
    title: "기타사항",
    data: [
      {
        title: "후원문의",
        link: "/etc/donate",
      },
      {
        title: "1:1 문의",
        link: "/etc/inquiry",
      },
      {
        title: "재능기부",
        link: "/etc/talent",
      },
      {
        title: "MINI GAME",
        link: "/etc/minigame",
      },
    ],
  },
];

export default Navigation;
