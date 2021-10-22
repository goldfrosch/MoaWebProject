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
        link: "/board?type=tutorial&query=moa"
      },
      {
        title: "백설기온라인",
        link: "/board?type=tutorial&query=wsg"
      }
    ]
  },
  {
    title: "공지사항",
    data: [
      {
        title: "공지사항",
        link: "/board?type=notice"
      },
      {
        title: "업데이트",
        link: "/board?type=update"
      },
      {
        title: "이벤트",
        link: "/board?type=event"
      }
    ]
  },
  {
    title: "커뮤니티",
    data: [
      {
        title: "자유게시판",
        link: "/board?type=free"
      },
      {
        title: "사진게시판",
        link: "/grid?type=photo"
      },
      {
        title: "꿀팁게시판",
        link: "/board?type=tip"
      },
      {
        title: "건의게시판",
        link: "/board?type=suggest"
      },
      {
        title: "Q&A",
        link: "/board?type=qna"
      },
      {
        title: "내그기그",
        link: "/grid?type=canvas"
      }
    ]
  },
  {
    title: "신고관리",
    data: [
      {
        title: "버그제보",
        link: "/board?type=bug"
      },
      {
        title: "유저신고",
        link: "/board?type=report"
      },
      {
        title: "처리완료",
        link: "/board?type=done"
      },
      {
        title: "이의신청",
        link: "/board?type=opposition"
      },
      {
        title: "사과게시판",
        link: "/board?type=apology"
      }
    ]
  },
  {
    title: "기타사항",
    data: [
      {
        title: "후원문의",
        link: "/etc/donate"
      },
      {
        title: "1:1 문의",
        link: "/etc/inquiry"
      },
      {
        title: "재능기부",
        link: "/etc/talent"
      },
      {
        title: "MINI GAME",
        link: "/etc/minigame"
      }
    ]
  }
];

export default Navigation;
