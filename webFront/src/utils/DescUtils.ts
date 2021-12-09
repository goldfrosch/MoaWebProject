import DescData from "constants/DescData";

class DescUtils {
  SetBoardTitle(category: string) {
    switch(category) {
      case 'tutorial_moa':
        return DescData['tutorial_moa'].title;
      case 'tutorial_wsg':
        return DescData['tutorial_wsg'].title;
      case 'tutorial_all':
        return DescData['tutorial_all'].title;
      case 'notice':
        return DescData['notice'].title;
      case 'update':
        return DescData['update'].title;
      case 'event':
        return DescData['event'].title;
      case 'donate':
        return DescData['donate'].title;
      case 'free':
        return DescData['free'].title;
      case 'photo':
        return DescData['photo'].title;
      case 'tip':
        return DescData['tip'].title;
      case 'suggest':
        return DescData['suggest'].title;
      case 'qna':
        return DescData['qna'].title;
      case 'canvas':
        return DescData['canvas'].title;
      case 'bug':
        return DescData['bug'].title;
      case 'opposition':
        return DescData['opposition'].title;
      default:
        return "잘못된 접근 페이지"
    }
  }

  SetBoardContext(category: string) {
    switch(category) {
      case 'tutorial_moa':
        return DescData['tutorial_moa'].context;
      case 'tutorial_wsg':
        return DescData['tutorial_wsg'].context;
      case 'tutorial_all':
        return DescData['tutorial_all'].context;
      case 'notice':
        return DescData['notice'].context;
      case 'update':
        return DescData['update'].context;
      case 'event':
        return DescData['event'].context;
      case 'donate':
        return DescData['donate'].context;
      case 'free':
        return DescData['free'].context;
      case 'photo':
        return DescData['photo'].context;
      case 'tip':
        return DescData['tip'].context;
      case 'suggest':
        return DescData['suggest'].context;
      case 'qna':
        return DescData['qna'].context;
      case 'canvas':
        return DescData['canvas'].context;
      case 'bug':
        return DescData['bug'].context;
      case 'opposition':
        return DescData['opposition'].context;
      default:
        return "잘못된 접근 페이지 설명"
    }
  }
}

export default new DescUtils();