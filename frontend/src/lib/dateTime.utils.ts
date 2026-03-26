import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import localizedFormat from "dayjs/plugin/localizedFormat";

// // ใส่ plugin เพื่อเปรียบเทียบเวลา
// dayjs.extend(relativeTime);

// // ใส่ plugin เพื่อใส่ Auto format
// dayjs.extend(localizedFormat);

const thaiDays = [
  "วันอาทิตย์",
  "วันจันทร์",
  "วันอังคาร",
  "วันพุธ",
  "วันพฤหัสบดี",
  "วันศุกร์",
  "วันเสาร์",
];

const thaiMonths = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

interface FormatDateOptionType {
  style?: "dd-MM-yyyy" | "yyyy-MM-dd" | "MM-dd-yyyy";
  dateStyle?: "numeric" | "text";
  monthStyle?: "numeric" | "text";
  buddhistYear?: boolean; // พ.ศ. หรือ ค.ศ.
  fullYear?: boolean; // 2567 หรือ 67
  useSlashFormat?: boolean; // แสดงแบบ 20/05/2567
  useDashFormat?: boolean; // แสดงแบบ 20-05-2027
  showTime?: boolean; // แสดงเวลา HH:mm น. หรือไม่
}

const dateTime = {
  /**
   * Format date to string
   * @param {Date | null | undefined} date - Date object to format
   * @param {FormatDateOptionType} [options] - Options to format date
   * @param {string} [options.style] - Format style (dd-MM-yyyy, MM-dd-yyyy, yyyy-MM-dd)
   * @param {string} [options.dateStyle] - Date style (numeric, text)
   * @param {string} [options.monthStyle] - Month style (numeric, text)
   * @param {boolean} [options.fullYear] - Show full year (true) or only last two digits (false)
   * @param {boolean} [options.useSlashFormat] - Use slash format (true) or dash format (false)
   * @param {boolean} [options.buddhistYear] - Use Buddist year (true) or Gregorian year (false)
   * @param {boolean} [options.showTime] - Show time (true) or not (false)
   * @param {boolean} [options.useDashFormat] - Use dash format (true) or slash format (false)
   * @return {string} Formatted date string
   */
  formatDate: function (
    date: Date | null | undefined,
    options?: FormatDateOptionType,
  ): string {
    if (!date) return "-";

    const {
      style = "dd-MM-yyyy",
      dateStyle = "numeric",
      monthStyle = "numeric",
      fullYear = true,
      useSlashFormat = true,
      buddhistYear = true,
      showTime = true,
      useDashFormat = false,
    } = options || {};

    const d = new Date(date);

    const day = d.getDate();
    const dayStr =
      dateStyle === "text"
        ? thaiDays[d.getDay()]
        : day.toString().padStart(2, "0");

    const monthNum = d.getMonth() + 1;
    const monthStr =
      monthStyle === "text"
        ? thaiMonths[d.getMonth()]
        : monthNum.toString().padStart(2, "0");

    let year = d.getFullYear();
    if (buddhistYear) year += 543;
    const yearStr = fullYear ? `${year}` : `${year}`.slice(-2);

    const hour = d.getHours().toString().padStart(2, "0");
    const minute = d.getMinutes().toString().padStart(2, "0");
    const timeStr = `${hour}:${minute}`;

    const dateArr: string[] = [];

    switch (style) {
      case "dd-MM-yyyy":
        dateArr.push(dayStr);
        dateArr.push(monthStr);
        dateArr.push(yearStr);
        break;
      case "MM-dd-yyyy":
        dateArr.push(monthStr);
        dateArr.push(dayStr);
        dateArr.push(yearStr);
        break;
      case "yyyy-MM-dd":
        dateArr.push(yearStr);
        dateArr.push(monthStr);
        dateArr.push(dayStr);
        break;
      default:
        break;
    }

    // ✅ ถ้า useSlashFormat เป็น true → แสดงแบบ "20/02/2567"
    let datePart: string = "";
    for (let i = 0; i < dateArr.length; i += 1) {
      const date = dateArr[i];
      if (i === dateArr.length - 1) {
        datePart += date;
        break;
      }
      if (useSlashFormat && !useDashFormat) {
        datePart += date + "/";
      } else if (useDashFormat) {
        datePart += date + "-";
      } else {
        datePart += date + " ";
      }
    }
    // const datePart1 = useSlashFormat
    //   ? `${dateArr}/${monthStr}/${yearStr}`
    //   : `${dayStr} ${monthStr} ${yearStr}`;

    return showTime ? `${datePart}, ${timeStr} น.` : datePart;
  },

  /**
   * แปลงเวล نسبัติกับเวลาปัจจุบัน
   * @param {Date | null | undefined} date เวลาที่ต้องการแปลง
   * @returns {string} เวลาที่แปลงแล้ว
   * @example getRelativeTime(new Date("2022-01-01T08:00:00.000Z")) // "เมื่อสักครู่"
   * @example getRelativeTime(new Date("2022-01-01T07:00:00.000Z")) // "1 นาทีที่แล้ว"
   * @example getRelativeTime(new Date("2022-01-01T06:00:00.000Z")) // "2 ชม.ที่แล้ว"
   * @example getRelativeTime(new Date("2021-12-31T23:00:00.000Z")) // "เมื่อวาน"
   * @example getRelativeTime(new Date("2021-12-25T23:00:00.000Z")) // "6/12/2564"
   * @example getRelativeTime(new Date("2021-11-25T23:00:00.000Z")) // "25/11/2564"
   */
  getRelativeTime: function (date: Date | null | undefined): string {
    if (!date) return "-";

    const now = new Date();
    const d = new Date(date);

    const diffMs = now.getTime() - d.getTime();

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    const diffMinutes = Math.floor(diffMs / minute);
    const diffHours = Math.floor(diffMs / hour);
    const diffDays = Math.floor(diffMs / day);

    // 🔥 น้อยกว่า 1 นาที
    if (diffMinutes < 1) {
      return "เมื่อสักครู่";
    }

    // 🔥 น้อยกว่า 60 นาที
    if (diffMinutes < 60) {
      return `${diffMinutes} นาทีที่แล้ว`;
    }

    // 🔥 น้อยกว่า 24 ชั่วโมง
    if (diffHours < 24) {
      return `${diffHours} ชม.ที่แล้ว`;
    }

    // 🔥 เมื่อวาน
    if (diffDays === 1) {
      return "เมื่อวาน";
    }

    // 🔥 ไม่เกิน 7 วัน → แสดงวัน/เดือน
    if (diffDays <= 7) {
      return dateTime.formatDate(d, {
        dateStyle: "numeric",
        monthStyle: "numeric",
        buddhistYear: true,
        fullYear: false,
        showTime: false,
      });
    }

    // 🔥 เกิน 7 วัน → แสดงเต็ม
    return dateTime.formatDate(d, {
      dateStyle: "numeric",
      monthStyle: "numeric",
      buddhistYear: true,
      fullYear: true,
      showTime: false,
    });
  },
};

export { dayjs, dateTime };
