class DateUtils {
  getPrevTime(date: Date | undefined) {
    if (date) {
      const now = new Date();
      const dates = new Date(date);

      const prev = now.getTime() - dates.getTime();
      if(prev < 60000) {
        return Math.floor(prev/1000) + "초 전"
      }
      else if(prev < 600000) {
        return Math.floor(prev/60000) + "분 전"
      }
      else if(prev < 86400000) {
        return this.getTime(date);
      }
      else {
        return this.getDay(date);
      }
    }
  }
  getTime(date: Date | undefined) {
    if (date) {
      const days = new Date(date);
      const hour = ("0" + days.getHours()).slice(-2);
      const minute = ("0" + days.getHours()).slice(-2);

      const timeString = hour + ":" + minute;
      return timeString;
    }
  }
  getDay(date: Date | undefined) {
    if (date) {
      const days = new Date(date);
      const year = days.getFullYear();
      const month = ("0" + (days.getMonth() + 1)).slice(-2);
      const day = ("0" + days.getDate()).slice(-2);

      const dateString = year + "-" + month + "-" + day;
      return dateString;
    }
    return "";
  }
  getDaySimple(date: Date | undefined) {
    if (date) {
      const days = new Date(date);
      const year = days.getFullYear();
      const month = ("0" + (days.getMonth() + 1)).slice(-2);
      const day = ("0" + days.getDate()).slice(-2);

      const dateString = year + "." + month + "." + day;
      return dateString;
    }
    return "";
  }
  getDayDetail(date: Date | undefined) {
    if (date) {
      const days = new Date(date);
      const year = days.getFullYear();
      const month = ("0" + (days.getMonth() + 1)).slice(-2);
      const day = ("0" + days.getDate()).slice(-2);
      const hour =
        days.getHours() >= 12
          ? ("0" + (days.getHours() - 12)).slice(-2)
          : ("0" + days.getHours()).slice(-2);
      const minute = ("0" + days.getMinutes()).slice(-2);

      const dateString =
        year + "." + month + "." + day + " " + hour + ":" + minute;
      return dateString;
    }
    return "";
  }

  getDayDetailAP(date: Date | undefined) {
    if (date) {
      const days = new Date(date);
      const month = ("0" + (days.getMonth() + 1)).slice(-2);
      const day = ("0" + days.getDate()).slice(-2);
      const hour =
        days.getHours() >= 12
          ? ("0" + (days.getHours() - 12)).slice(-2)
          : ("0" + days.getHours()).slice(-2);
      const minute = ("0" + days.getMinutes()).slice(-2);
      const AP = days.getHours() >= 12 ? "PM" : "AM";

      const dateString =
        month + "." + day + " " + hour + ":" + minute + " " + AP;
      return dateString;
    }
    return "";
  }
}

export default new DateUtils();
