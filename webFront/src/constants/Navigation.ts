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
        link: "/user/board?category=tutorial_moa"
      },
      {
        title: "백설기온라인",
        link: "/user/board?category=tutorial_wsg"
      },
      {
        title: "전체 / 카페",
        link: "/user/board?category=tutorial_all"
      }
    ]
  },
  {
    title: "공지사항",
    data: [
      {
        title: "공지사항",
        link: "/user/board?category=notice"
      },
      {
        title: "업데이트",
        link: "/user/board?category=update"
      },
      {
        title: "이벤트",
        link: "/user/board?category=event"
      },
      {
        title: "후원상품",
        link: "/user/grid?category=donate"
      }
    ]
  },
  {
    title: "커뮤니티",
    data: [
      {
        title: "자유게시판",
        link: "/user/board?category=free"
      },
      {
        title: "사진게시판",
        link: "/user/grid?category=photo"
      },
      {
        title: "꿀팁게시판",
        link: "/user/board?category=tip"
      },
      {
        title: "건의게시판",
        link: "/user/board?category=suggest"
      },
      {
        title: "자유 QnA",
        link: "/user/board?category=qna"
      },
      {
        title: "내그기그",
        link: "/user/grid?category=canvas"
      }
    ]
  },
  {
    title: "신고관리",
    data: [
      {
        title: "버그제보",
        link: "/user/board?category=bug"
      },
      {
        title: "유저신고",
        link: "/user/board?category=report"
      },
      {
        title: "처리완료",
        link: "/user/board?category=done"
      },
      {
        title: "이의신청",
        link: "/user/board?category=opposition"
      },
      {
        title: "사과게시판",
        link: "/user/board?category=apology"
      }
    ]
  },
  {
    title: "기타사항",
    data: [
      {
        title: "후원문의",
        link: "/user/etc/donate"
      },
      {
        title: "1:1 문의",
        link: "/user/etc/inquiry"
      },
      {
        title: "재능기부",
        link: "/user/etc/talent"
      },
      {
        title: "MINI GAME",
        link: "/user/etc/minigame"
      }
    ]
  }
];

export default Navigation;
