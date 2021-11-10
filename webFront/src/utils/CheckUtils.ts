import HistoryUtils from "./HistoryUtils";

class CheckUtils {
  VerifyEmail(email: string) {
    const emailRegex =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return emailRegex.test(email);
  }

  VerifyNickname(nickname: string) {
    const spcRegex = /[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g;
    return spcRegex.test(nickname);
  }

  VerifyRank(rank: number, currectRank: number, link: string) {
    if(rank >= currectRank) {
      HistoryUtils.push(link);
    }
    else {
      HistoryUtils.push("/forbidden");
    }
  }
}


export default new CheckUtils();