class DateUtils {
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
