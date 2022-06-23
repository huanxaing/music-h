//转月日
export function formatDateTime(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return m + "月" + d + "日";
}
//时间戳转 分秒
export function timestampToTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000

  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  let strDate = m + s;
  return strDate;
}

// 转年月日
export function formatDateTimeY(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return y + "年" + m + "月" + d + "日";
}
//将秒转分秒
export function formatSeconds(value) {
  var theTime = parseInt(value); // 秒
  var middle = 0; // 分
  var hour = 0; // 小时

  if (theTime > 60) {
    middle = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (middle > 60) {
      hour = parseInt(middle / 60);
      middle = parseInt(middle % 60);
    }
  }
  var result = "" + parseInt(theTime);
  if (middle > 0) {
    result = "" + parseInt(middle);
  }
  if (hour > 0) {
    result = "" + parseInt(hour) + "小时" + result;
  }
  return (
    (middle >= 10 ? middle : "0" + middle) +
    ":" +
    (theTime >= 10 ? theTime : "0" + theTime)
  );
}
