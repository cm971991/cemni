// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (n) {
  var i = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
      },
      t;
  /(y+)/.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)))
  for (t in i) new RegExp("(" + t + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? i[t] : ("00" + i[t]).substr(("" + i[t]).length)))
  return n
}

function getDate(date) {
  if (!date) {
    date = new Date()
  } else {
    // date类型
    if (date instanceof Date) {
      
    }
    // unix时间戳
    else if (/^\d{10}$/.test(date)) {
      date = new Date(parseInt(date) * 1000)
    }
    // 普通时间字符串
    else {
      date = new Date(date.replace(/-/g, "/"))
    }
  }
  return date
}

export default {
  removeTZ(date) {
    return date.replace(/T/, " ").replace(/Z/, "")
  },
  format(date, ft) {
    ft = ft || 'yyyy-MM-dd hh:mm:ss'
    return getDate(date).format(ft)
  },
  dateCompare(a, b) {
    var d1 = getDate(a)
    var d2 = getDate(b)
    return !( a != "" && b != "" && d1 >= d2)
  },
  add(date, value, type, ft) {
    ft = ft || 'yyyy-MM-dd hh:mm:ss'
    date = getDate(date)
    switch (type) {
      case 'mon':
        date.setMonth(date.getMonth() + value);
        break
      case 'day':
        date.setDate(date.getDate() + value);
        break
      case 'hou':
        date.setHours(date.getHours() + value);
        break
      case 'min':
        date.setMinutes(date.getMinutes() + value)
        break
      case 'sec':
        date.setSeconds(date.getSeconds() + value)
        break
    }
    return date.format(ft)
  },
  dataScope(a, b) {
    var date1 = getDate(a)
    var date2 = getDate(b)
    date2.setDate(date2.getDate() + 1)
    if (date1 > date2) {
      var tempDate = date1
      date1 = date2
      date2 = tempDate
    }
    date1.setDate(date1.getDate())
    var dateArr = []
    var i = 0
    while (!(date1.getFullYear() == date2.getFullYear()
      && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
        .getDate())) {
      var dayStr = date1.getDate().toString()
      if (dayStr.length == 1) {
        dayStr = "0" + dayStr
      }
      dateArr[i] = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-"
        + dayStr
      i++
      date1.setDate(date1.getDate() + 1)
    }
    return dateArr
  },
  /**
   *
   * @param start 开始时间
   * @param end 结束时间
   * @returns {number} 日期之差
   */
  getDifferenceDay: function (start, end) {
    var eArr   = end.split("-"),
        sArr   = start.split("-"),
        sRDate = new Date(sArr[0], sArr[1], sArr[2]),
        eRDate = new Date(eArr[0], eArr[1], eArr[2]);
    return (eRDate - sRDate) / (24 * 60 * 60 * 1000);
  },
  getDifferenceHour: function (start, end) {
    var startDate = getDate(start)
    var endDate = getDate(end)
    var differDate = endDate.getTime() - startDate.getTime()  //时间差的毫秒数
    var days = Math.floor(differDate / (24 * 3600 * 1000))
    //计算出小时数
    var leave1 = differDate % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    var hoursObj = {}
    if (hours < 10) {
      hoursObj.first = 0
      hoursObj.second = hours
      if (hours === 0) {
        hoursObj.end = true
      }
    } else {
      hoursObj.first = parseInt(hours.toString().substring(0, 1))
      hoursObj.second = parseInt(hours.toString().substring(1, 2))
      hoursObj.end = false
    }
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    var minutesObj = {}
    if (minutes < 10) {
      minutesObj.first = 0
      minutesObj.second = minutes
      if (minutes === 0) {
        minutesObj.end = true
      }
    } else {
      minutesObj.first = parseInt(minutes.toString().substring(0, 1))
      minutesObj.second = parseInt(minutes.toString().substring(1, 2))
      minutesObj.end = false
    }
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    var secondsObj = {}
    if (seconds < 10) {
      secondsObj.first = 0
      secondsObj.second = seconds
      if (seconds === 0) {
        secondsObj.end = true
      }
    } else {
      secondsObj.first = parseInt(seconds.toString().substring(0, 1))
      secondsObj.second = parseInt(seconds.toString().substring(1, 2))
      secondsObj.end = false
    }
    return {hours: hoursObj, minutes: minutesObj, seconds: secondsObj}
  }
}
