import DescData from "constants/DescData";

class DescUtils {
  SetTitle(category: string) {
    switch(category) {
      case 'notice':
        return DescData['notice'].title;
      case 'update':
        return DescData['update'].title;
      case 'event':
        return DescData['event'].title;
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
      default:
        return "잘못된 접근 페이지"
    }
  }

  SetContext(category: string) {
    switch(category) {
      case 'notice':
        return DescData['notice'].context;
      case 'update':
        return DescData['update'].context;
      case 'event':
        return DescData['event'].context;
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
      default:
        return "잘못된 접근 페이지 설명"
    }
  }
}

export default new DescUtils();