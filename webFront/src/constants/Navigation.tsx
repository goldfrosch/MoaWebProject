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
    data: [],
  },
  {
    title: "게시판",
    data: [
      {
        title: "공지사항",
        link: "/notice",
      },
      {
        title: "자유게시판",
        link: "/notice",
      },
      {
        title: "사진게시판",
        link: "/notice",
      },
    ],
  },
  {
    title: "공지사항",
    data: [
      {
        title: "공지사항",
        link: "/notice",
      },
      {
        title: "공지사항",
        link: "/notice",
      },
      {
        title: "공지사항",
        link: "/notice",
      },
    ],
  },
  {
    title: "공지사항",
    data: [
      {
        title: "공지사항",
        link: "/notice",
      },
      {
        title: "공지사항",
        link: "/notice",
      },
      {
        title: "공지사항",
        link: "/notice",
      },
    ],
  },
  {
    title: "공지사항",
    data: [
      {
        title: "공지사항",
        link: "/notice",
      },
      {
        title: "공지사항",
        link: "/notice",
      },
      {
        title: "공지사항",
        link: "/notice",
      },
    ],
  },
];

export default Navigation;
