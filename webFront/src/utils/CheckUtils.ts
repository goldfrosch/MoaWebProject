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
}


export default new CheckUtils();