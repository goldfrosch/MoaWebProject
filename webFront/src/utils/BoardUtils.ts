import history from "./HistoryUtils";

class BoardUtils {
  checkForbidden(status: number) {
    if(status === 403) {
      history.push("/login");
    }
  }
}

export default new BoardUtils();