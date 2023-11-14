export function cronValidate (e) {
  let t = "",
    n = e.split(" ");
  return n.length < 6 || n.length > 7
    ? "cron表达式需要输入6-7位参数，请重新输入"
    : ("?" == n[3] && "?" != n[5]) || ("?" == n[5] && "?" != n[3])
      ? ((t = checkSpecial(n)),
        1 != t
          ? t
          : ((t = checkSecondsField(n[0])),
            1 != t
              ? t
              : ((t = checkMinutesField(n[1])),
                1 != t
                  ? t
                  : ((t = checkHoursField(n[2])),
                    1 != t
                      ? t
                      : ((t = checkDayOfMonthField(n[3])),
                        1 != t
                          ? t
                          : ((t = checkMonthsField(n[4])),
                            1 != t
                              ? t
                              : ((t = checkDayOfWeekField(n[5])),
                                1 != t
                                  ? t
                                  : !(
                                    n.length > 6 &&
                                    ((t = checkYearField(n[6])), 1 != t)
                                  ) || t)))))))
      : "指定日时周必须设为不指定(?),指定周时日必须设为不指定(?)";
}
function checkSecondsField (e) {
  return checkField(e, 0, 59, "秒");
}
function checkMinutesField (e) {
  return checkField(e, 0, 59, "分");
}
function checkHoursField (e) {
  return checkField(e, 0, 23, "时");
}
function checkDayOfMonthField (e) {
  return (
    "?" == e ||
    (e.indexOf("L") >= 0
      ? "L" === e
      : e.indexOf("W") >= 0
        ? checkFieldWithLetter(e, "W", 1, 31, "日")
        : !(e.indexOf("C") >= 0) && checkField(e, 1, 31, "日"))
  );
}
function checkMonthsField (e) {
  return (
    "*" == e ||
    ((e = e.replace("JAN", "1")),
      (e = e.replace("FEB", "2")),
      (e = e.replace("MAR", "3")),
      (e = e.replace("APR", "4")),
      (e = e.replace("MAY", "5")),
      (e = e.replace("JUN", "6")),
      (e = e.replace("JUL", "7")),
      (e = e.replace("AUG", "8")),
      (e = e.replace("SEP", "9")),
      (e = e.replace("OCT", "10")),
      (e = e.replace("NOV", "11")),
      (e = e.replace("DEC", "12")),
      checkField(e, 1, 12, "月份"))
  );
}
function checkDayOfWeekField (e) {
  return (
    "?" == e ||
    (e.indexOf("L") >= 0
      ? checkFieldWithLetterWeek(e, "L", 1, 7, "星期")
      : !(e.indexOf("C") >= 0) &&
      !(e.indexOf("#") >= 0) &&
      checkField(e, 1, 7, "星期"))
  );
}
function checkYearField (e) {
  const t = new Date().getFullYear();
  return checkField(e, t, t + 10, "年的");
}
function checkField (e, t, n, r) {
  return e.indexOf("-") > -1
    ? checkRangeAndCycle(e, t, n, r)
    : e.indexOf(",") > -1
      ? checkListField(e, t, n, r)
      : e.indexOf("/") > -1
        ? "星期" !== r && checkIncrementField(e, t, n, r)
        : "*" == e || checkIntValue(e, t, n, !0, r);
}
function checkIntValue (e, t, n, r, c) {
  try {
    let i = parseInt(e, 10);
    return e == i
      ? !r ||
      !(i < t || i > n) ||
      c + "的参数取值范围必须在" + t + "-" + n + "之间"
      : c + "的参数存在非法字符，必须为整数或允许的大写英文";
  } catch (e) {
    return c + "的参数有非法字符，必须是整数~";
  }
}
function checkListField (e, t, n, r) {
  let c = e.split(","),
    i = new Array(c.length),
    l = 0;
  for (let e = 0; e < c.length; e++) i[e] = c[e];
  for (let e = 0; e < i.length; e++) {
    let c = checkIntValue(i[e], t, n, !0, r);
    if (1 != c) return c;
    l = 0;
    for (let t = 0; t < i.length; t++)
      if ((i[e] == i[t] && l++, l > 1)) return r + "中的参数重复";
  }
  let u = -1;
  for (let e = 0; e < i.length; e++) {
    let t = i[e];
    try {
      let e = parseInt(t, 10);
      e < u || (u = e);
    } catch (e) {
      return "这段提示用不到";
    }
  }
  return !0;
}
function checkIncrementField (e, t, n, r) {
  if (e.split("/").length > 2) return r + "中的参数只能有一个'/'";
  let c = e.substring(0, e.indexOf("/")),
    i = e.substring(e.indexOf("/") + 1);
  if ("*" != c) {
    let e = checkIntValue(c, t, n, !0, r);
    return 1 != e
      ? e
      : ((e = checkIntValue(i, 1, "年的" === r ? 5 : n, !0, r)), 1 == e || e);
  }
  return checkIntValue(i, t, n, !1, r);
}
function checkRangeAndCycle (e, t, n, r) {
  let c;
  if (e.split("-").length > 2) return r + "中的参数只能有一个'-'";
  let i = null,
    l = null;
  if (e.indexOf("/") > -1) {
    if (e.split("/").length > 2) return r + "中的参数只能有一个'/'";
    if (
      ((i = e.split("/")[0]),
        (l = e.split("/")[1]),
        (c = checkIntValue(l, t, n, !0, r)),
        1 != c)
    )
      return c;
  } else i = e;
  let u = i.substring(0, i.indexOf("-")),
    f = i.substring(i.indexOf("-") + 1);
  if (((c = checkIntValue(u, t, n, !0, r)), 1 != c)) return c;
  if (((c = checkIntValue(f, t, n, !0, r)), 1 != c)) return c;
  try {
    let e = parseInt(u, 10),
      t = parseInt(f, 10);
    return t < e
      ? r + "的取值范围错误，前值必须小于后值"
      : !(t - e < parseInt(l, 10)) || r + "的取值范围内的循环无意义";
  } catch (e) {
    return r + "的参数有非法字符，必须是整数";
  }
}
function checkFieldWithLetter (e, t, n, r, c) {
  for (let n = 0; n < e.length; n++) {
    let r = 0;
    if ((e.charAt(n) == t && r++, r > 1))
      return c + "的值的" + t + "字母只能有一个";
  }
  if ("L" == t) {
    if ("LW" == e) return !0;
    if ("L" == e) return !0;
    if (e.endsWith("LW") && e.length > 2)
      return c + "中的参数，最后的LW前面不能有任何字母参数";
    if (e.endsWith("L")) {
      let i = e.substring(0, e.indexOf(t));
      return checkIntValue(i, n, r, !0, c);
    }
    return c + "中的参数，L字母后面不能有W以外的字符、数字等";
  }
  if ("W" == t) {
    if (e.endsWith("W")) {
      if ("W" == e) return c + "中的参数的W前面必须有数字";
      let i = e.substring(0, e.indexOf(t));
      return checkIntValue(i, n, r, !0, c);
    }
    return c + "中的参数的W必须作为结尾";
  }
  if ("C" == t) {
    if (e.endsWith("C")) {
      if ("C" == e) return c + "中的参数的C前面必须有数字";
      let i = e.substring(0, e.indexOf(t));
      return checkIntValue(i, n, r, !0, c);
    }
    return c + "中的参数的C必须作为结尾";
  }
}
function checkFieldWithLetterWeek (e, t, n, r, c) {
  let i;
  for (let n = 0; n < e.length; n++) {
    let r = 0;
    if ((e.charAt(n) == t && r++, r > 1))
      return c + "的值的" + t + "字母只能有一个";
  }
  if ("L" == t) {
    if ("L" == e) return c + "中的参数，L字母前必须有数字";
    if (e.endsWith("L")) {
      let i = e.substring(0, e.indexOf(t));
      return checkIntValue(i, n, r, !0, c);
    }
    return c + "中的参数，L字母必须是最后一位";
  }
  if ("C" == t) {
    if (e.endsWith("C")) {
      if ("C" == e) return c + "中的参数的C前面必须有数字";
      let i = e.substring(0, e.indexOf(t));
      return checkIntValue(i, n, r, !0, c);
    }
    return c + "中的参数的C必须作为结尾";
  }
  if ("#" == t) {
    if ("#" == e) return c + "中的#前后必须有整数";
    if (e.charAt(0) == t) return c + "中的#前面必须有整数";
    if (e.endsWith("#")) return c + "中的#后面必须有整数";
    let l = e.substring(0, e.indexOf(t)),
      u = e.substring(e.indexOf(t) + 1, e.length);
    return (
      (i = checkIntValue(l, 1, 4, !0, c + "的#前面")),
      1 != i
        ? i
        : ((i = checkIntValue(u, n, r, !0, c + "的#后面")), 1 == i || i)
    );
  }
}
function checkSpecial (e) {
  let t = !0;
  for (let n = 0; n < e.length; n++) {
    if (e[n].indexOf("/") > -1 && e[n].indexOf("-") > -1) {
      t = !1;
      break;
    }
    if (e[n].indexOf("/") > -1 && e[n].indexOf("*") > -1) {
      t = !1;
      break;
    }
  }
  return t;
}
