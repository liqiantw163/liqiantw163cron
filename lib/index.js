import { openBlock as D, createElementBlock as F, createElementVNode as _, toDisplayString as k, withDirectives as te, Fragment as K, renderList as Q, vShow as ne, resolveComponent as m, createBlock as R, normalizeStyle as se, withCtx as h, createVNode as o, createTextVNode as X, createCommentVNode as M } from "vue";
const Y = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [l, i] of t)
    n[l] = i;
  return n;
}, ae = {
  name: "CronToTime",
  inject: ["len"],
  data() {
    return {
      dayRule: "",
      dayRuleSup: "",
      dateArr: [],
      resultList: [],
      isValid: !0
    };
  },
  methods: {
    // 表达式值变化时，开始去计算结果
    expressionChange(e) {
      this.isValid = !0;
      let t = e.split(" "), n = 0, l = [], i = /* @__PURE__ */ new Date(), r = i.getFullYear(), s = i.getMonth() + 1, u = i.getDate(), a = i.getHours(), c = i.getMinutes(), d = i.getSeconds();
      this.getSecondArr(t[0]), this.getMinArr(t[1]), this.getHourArr(t[2]), this.getDayArr(t[3]), this.getMonthArr(t[4]), this.getWeekArr(t[5]), this.getYearArr(t[6], r);
      let W = this.dateArr[0], b = this.dateArr[1], x = this.dateArr[2], C = this.dateArr[3], g = this.dateArr[4], G = this.dateArr[5], J = this.getIndex(W, d), H = this.getIndex(b, c), j = this.getIndex(x, a), B = this.getIndex(C, u), P = this.getIndex(g, s), $ = this.getIndex(G, r);
      const q = function() {
        J = 0, d = W[J];
      }, U = function() {
        H = 0, c = b[H], q();
      }, L = function() {
        j = 0, a = x[j], U();
      }, S = function() {
        B = 0, u = C[B], L();
      }, I = function() {
        P = 0, s = g[P], S();
      };
      r !== G[$] && I(), s !== g[P] && S(), u !== C[B] && L(), a !== x[j] && U(), c !== b[H] && q();
      e:
        for (let z = $; z < G.length; z++) {
          let w = G[z];
          if (s > g[g.length - 1]) {
            I();
            continue;
          }
          t:
            for (let v = P; v < g.length; v++) {
              let y = g[v];
              if (y = y < 10 ? "0" + y : y, u > C[C.length - 1]) {
                if (S(), v == g.length - 1) {
                  I();
                  continue e;
                }
                continue;
              }
              n:
                for (let V = B; V < C.length; V++) {
                  let f = C[V], O = f < 10 ? "0" + f : f;
                  if (a > x[x.length - 1]) {
                    if (L(), V == C.length - 1) {
                      if (S(), v == g.length - 1) {
                        I();
                        continue e;
                      }
                      continue t;
                    }
                    continue;
                  }
                  if (this.checkDate(w + "-" + y + "-" + O + " 00:00:00") !== !0 && this.dayRule !== "workDay" && this.dayRule !== "lastWeek" && this.dayRule !== "lastDay") {
                    S();
                    continue t;
                  }
                  if (this.dayRule == "lastDay") {
                    if (this.checkDate(w + "-" + y + "-" + O + " 00:00:00") !== !0)
                      for (; f > 0 && this.checkDate(w + "-" + y + "-" + O + " 00:00:00") !== !0; )
                        f--, O = f < 10 ? "0" + f : f;
                  } else if (this.dayRule == "workDay") {
                    if (this.checkDate(w + "-" + y + "-" + O + " 00:00:00") !== !0)
                      for (; f > 0 && this.checkDate(w + "-" + y + "-" + O + " 00:00:00") !== !0; )
                        f--, O = f < 10 ? "0" + f : f;
                    let p = this.formatDate(
                      /* @__PURE__ */ new Date(w + "-" + y + "-" + O + " 00:00:00"),
                      "week"
                    );
                    p == 1 ? (f++, O = f < 10 ? "0" + f : f, this.checkDate(w + "-" + y + "-" + O + " 00:00:00") !== !0 && (f -= 3)) : p == 7 && (this.dayRuleSup !== 1 ? f-- : f += 2);
                  } else if (this.dayRule == "weekDay") {
                    let p = this.formatDate(
                      /* @__PURE__ */ new Date(w + "-" + y + "-" + f + " 00:00:00"),
                      "week"
                    );
                    if (this.dayRuleSup.indexOf(p) < 0) {
                      if (V == C.length - 1) {
                        if (S(), v == g.length - 1) {
                          I();
                          continue e;
                        }
                        continue t;
                      }
                      continue;
                    }
                  } else if (this.dayRule == "assWeek") {
                    let p = this.formatDate(
                      /* @__PURE__ */ new Date(w + "-" + y + "-" + f + " 00:00:00"),
                      "week"
                    );
                    this.dayRuleSup[1] >= p ? f = (this.dayRuleSup[0] - 1) * 7 + this.dayRuleSup[1] - p + 1 : f = this.dayRuleSup[0] * 7 + this.dayRuleSup[1] - p + 1;
                  } else if (this.dayRule == "lastWeek") {
                    if (this.checkDate(w + "-" + y + "-" + O + " 00:00:00") !== !0)
                      for (; f > 0 && this.checkDate(w + "-" + y + "-" + O + " 00:00:00") !== !0; )
                        f--, O = f < 10 ? "0" + f : f;
                    let p = this.formatDate(
                      /* @__PURE__ */ new Date(w + "-" + y + "-" + O + " 00:00:00"),
                      "week"
                    );
                    this.dayRuleSup < p ? f -= p - this.dayRuleSup : this.dayRuleSup > p && (f -= 7 - (this.dayRuleSup - p));
                  }
                  f = f < 10 ? "0" + f : f;
                  i:
                    for (let p = j; p < x.length; p++) {
                      let ie = x[p] < 10 ? "0" + x[p] : x[p];
                      if (c > b[b.length - 1]) {
                        if (U(), p == x.length - 1) {
                          if (L(), V == C.length - 1) {
                            if (S(), v == g.length - 1) {
                              I();
                              continue e;
                            }
                            continue t;
                          }
                          continue n;
                        }
                        continue;
                      }
                      r:
                        for (let N = H; N < b.length; N++) {
                          let re = b[N] < 10 ? "0" + b[N] : b[N];
                          if (d > W[W.length - 1]) {
                            if (q(), N == b.length - 1) {
                              if (U(), p == x.length - 1) {
                                if (L(), V == C.length - 1) {
                                  if (S(), v == g.length - 1) {
                                    I();
                                    continue e;
                                  }
                                  continue t;
                                }
                                continue n;
                              }
                              continue i;
                            }
                            continue;
                          }
                          for (let T = J; T <= W.length - 1; T++) {
                            let le = W[T] < 10 ? "0" + W[T] : W[T];
                            if (y !== "00" && f !== "00" && (l.push(
                              w + "-" + y + "-" + f + " " + ie + ":" + re + ":" + le
                            ), n++), n == this.len)
                              break e;
                            if (T == W.length - 1) {
                              if (q(), N == b.length - 1) {
                                if (U(), p == x.length - 1) {
                                  if (L(), V == C.length - 1) {
                                    if (S(), v == g.length - 1) {
                                      I();
                                      continue e;
                                    }
                                    continue t;
                                  }
                                  continue n;
                                }
                                continue i;
                              }
                              continue r;
                            }
                          }
                        }
                    }
                }
            }
        }
      l.length == 0 ? this.resultList = ["没有达到条件的结果！"] : this.resultList = l;
    },
    // 用于计算某位数字在数组中的索引
    getIndex(e, t) {
      if (t <= e[0] || t > e[e.length - 1])
        return 0;
      for (let n = 0; n < e.length - 1; n++)
        if (t > e[n] && t <= e[n + 1])
          return n + 1;
    },
    // 获取"年"数组
    getYearArr(e, t) {
      this.dateArr[5] = this.getOrderArr(t, t + 100), e !== void 0 && (e.indexOf("-") >= 0 ? this.dateArr[5] = this.getCycleArr(e, t + 100, !1) : e.indexOf("/") >= 0 ? this.dateArr[5] = this.getAverageArr(e, t + 100) : e !== "*" && (this.dateArr[5] = this.getAssignArr(e)));
    },
    // 获取"月"数组
    getMonthArr(e) {
      this.dateArr[4] = this.getOrderArr(1, 12), e.indexOf("-") >= 0 ? this.dateArr[4] = this.getCycleArr(e, 12, !1) : e.indexOf("/") >= 0 ? this.dateArr[4] = this.getAverageArr(e, 12) : e !== "*" && (this.dateArr[4] = this.getAssignArr(e));
    },
    // 获取"日"数组-主要为日期规则
    getWeekArr(e) {
      if (this.dayRule == "" && this.dayRuleSup == "")
        if (e.indexOf("-") >= 0)
          this.dayRule = "weekDay", this.dayRuleSup = this.getCycleArr(e, 7, !1);
        else if (e.indexOf("#") >= 0) {
          this.dayRule = "assWeek";
          let t = e.match(/[0-9]{1}/g);
          this.dayRuleSup = [Number(t[1]), Number(t[0])], this.dateArr[3] = [1], this.dayRuleSup[1] == 7 && (this.dayRuleSup[1] = 0);
        } else
          e.indexOf("L") >= 0 ? (this.dayRule = "lastWeek", this.dayRuleSup = Number(e.match(/[0-9]{1,2}/g)[0]), this.dateArr[3] = [31], this.dayRuleSup == 7 && (this.dayRuleSup = 0)) : e !== "*" && e !== "?" && (this.dayRule = "weekDay", this.dayRuleSup = this.getAssignArr(e));
    },
    // 获取"日"数组-少量为日期规则
    getDayArr(e) {
      this.dateArr[3] = this.getOrderArr(1, 31), this.dayRule = "", this.dayRuleSup = "", e.indexOf("-") >= 0 ? (this.dateArr[3] = this.getCycleArr(e, 31, !1), this.dayRuleSup = "null") : e.indexOf("/") >= 0 ? (this.dateArr[3] = this.getAverageArr(e, 31), this.dayRuleSup = "null") : e.indexOf("W") >= 0 ? (this.dayRule = "workDay", this.dayRuleSup = Number(e.match(/[0-9]{1,2}/g)[0]), this.dateArr[3] = [this.dayRuleSup]) : e.indexOf("L") >= 0 ? (this.dayRule = "lastDay", this.dayRuleSup = "null", this.dateArr[3] = [31]) : e !== "*" && e !== "?" ? (this.dateArr[3] = this.getAssignArr(e), this.dayRuleSup = "null") : e == "*" && (this.dayRuleSup = "null");
    },
    // 获取"时"数组
    getHourArr(e) {
      this.dateArr[2] = this.getOrderArr(0, 23), e.indexOf("-") >= 0 ? this.dateArr[2] = this.getCycleArr(e, 24, !0) : e.indexOf("/") >= 0 ? this.dateArr[2] = this.getAverageArr(e, 23) : e !== "*" && (this.dateArr[2] = this.getAssignArr(e));
    },
    // 获取"分"数组
    getMinArr(e) {
      this.dateArr[1] = this.getOrderArr(0, 59), e.indexOf("-") >= 0 ? this.dateArr[1] = this.getCycleArr(e, 60, !0) : e.indexOf("/") >= 0 ? this.dateArr[1] = this.getAverageArr(e, 59) : e !== "*" && (this.dateArr[1] = this.getAssignArr(e));
    },
    // 获取"秒"数组
    getSecondArr(e) {
      this.dateArr[0] = this.getOrderArr(0, 59), e.indexOf("-") >= 0 ? this.dateArr[0] = this.getCycleArr(e, 60, !0) : e.indexOf("/") >= 0 ? this.dateArr[0] = this.getAverageArr(e, 59) : e !== "*" && (this.dateArr[0] = this.getAssignArr(e));
    },
    // 根据传进来的min-max返回一个顺序的数组
    getOrderArr(e, t) {
      let n = [];
      for (let l = e; l <= t; l++)
        n.push(l);
      return n;
    },
    // 根据规则中指定的零散值返回一个数组
    getAssignArr(e) {
      let t = [], n = e.split(",");
      for (let l = 0; l < n.length; l++)
        t[l] = Number(n[l]);
      return t.sort(this.compare), t;
    },
    // 根据一定算术规则计算返回一个数组
    getAverageArr(e, t) {
      let n = [], l = e.split("/"), i = Number(l[0]), r = Number(l[1]);
      for (; i <= t; )
        n.push(i), i += r;
      return n;
    },
    // 根据规则返回一个具有周期性的数组
    getCycleArr(e, t, n) {
      let l = [], i = e.split("-"), r = Number(i[0]), s = Number(i[1]);
      r > s && (s += t);
      for (let u = r; u <= s; u++) {
        let a = 0;
        n == !1 && u % t == 0 && (a = t), l.push(Math.round(u % t + a));
      }
      return l.sort(this.compare), l;
    },
    // 比较数字大小（用于Array.sort）
    compare(e, t) {
      return t - e > 0 ? -1 : 1;
    },
    // 格式化日期格式如：2017-9-19 18:04:33
    formatDate(e, t) {
      let n = typeof e == "number" ? new Date(e) : e, l = n.getFullYear(), i = n.getMonth() + 1, r = n.getDate(), s = n.getHours(), u = n.getMinutes(), a = n.getSeconds(), c = n.getDay();
      if (t == null)
        return l + "-" + (i < 10 ? "0" + i : i) + "-" + (r < 10 ? "0" + r : r) + " " + (s < 10 ? "0" + s : s) + ":" + (u < 10 ? "0" + u : u) + ":" + (a < 10 ? "0" + a : a);
      if (t == "week")
        return c + 1;
    },
    // 检查日期是否存在
    checkDate(e) {
      let t = new Date(e), n = this.formatDate(t);
      return e === n;
    }
  }
}, oe = { class: "popup-result" }, ue = { class: "title" }, de = { class: "popup-result-scroll" };
function he(e, t, n, l, i, r) {
  return D(), F("div", oe, [
    _("p", ue, "最近" + k(r.len) + "次运行时间", 1),
    te(_("ol", de, [
      (D(!0), F(K, null, Q(i.resultList, (s) => (D(), F("li", { key: s }, k(s), 1))), 128))
    ], 512), [
      [ne, i.isValid]
    ])
  ]);
}
const fe = /* @__PURE__ */ Y(ae, [["render", he], ["__scopeId", "data-v-8bcb25bd"]]);
function ge(e) {
  let t = "", n = e.split(" ");
  return n.length < 6 || n.length > 7 ? "cron表达式需要输入6-7位参数，请重新输入" : n[3] == "?" && n[5] != "?" || n[5] == "?" && n[3] != "?" ? (t = we(n), t != 1 ? t : (t = ce(n[0]), t != 1 ? t : (t = pe(n[1]), t != 1 ? t : (t = me(n[2]), t != 1 ? t : (t = ye(n[3]), t != 1 ? t : (t = ke(n[4]), t != 1 ? t : (t = _e(n[5]), t != 1 ? t : !(n.length > 6 && (t = De(n[6]), t != 1)) || t))))))) : "指定日时周必须设为不指定(?),指定周时日必须设为不指定(?)";
}
function ce(e) {
  return E(e, 0, 59, "秒");
}
function pe(e) {
  return E(e, 0, 59, "分");
}
function me(e) {
  return E(e, 0, 23, "时");
}
function ye(e) {
  return e == "?" || (e.indexOf("L") >= 0 ? e === "L" : e.indexOf("W") >= 0 ? Ce(e, "W", 1, 31, "日") : !(e.indexOf("C") >= 0) && E(e, 1, 31, "日"));
}
function ke(e) {
  return e == "*" || (e = e.replace("JAN", "1"), e = e.replace("FEB", "2"), e = e.replace("MAR", "3"), e = e.replace("APR", "4"), e = e.replace("MAY", "5"), e = e.replace("JUN", "6"), e = e.replace("JUL", "7"), e = e.replace("AUG", "8"), e = e.replace("SEP", "9"), e = e.replace("OCT", "10"), e = e.replace("NOV", "11"), e = e.replace("DEC", "12"), E(e, 1, 12, "月份"));
}
function _e(e) {
  return e == "?" || (e.indexOf("L") >= 0 ? Oe(e, "L", 1, 7, "星期") : !(e.indexOf("C") >= 0) && !(e.indexOf("#") >= 0) && E(e, 1, 7, "星期"));
}
function De(e) {
  const t = (/* @__PURE__ */ new Date()).getFullYear();
  return E(e, t, t + 10, "年的");
}
function E(e, t, n, l) {
  return e.indexOf("-") > -1 ? xe(e, t, n, l) : e.indexOf(",") > -1 ? Ae(e, t, n, l) : e.indexOf("/") > -1 ? l !== "星期" && be(e, t, n, l) : e == "*" || A(e, t, n, !0, l);
}
function A(e, t, n, l, i) {
  try {
    let r = parseInt(e, 10);
    return e == r ? !l || !(r < t || r > n) || i + "的参数取值范围必须在" + t + "-" + n + "之间" : i + "的参数存在非法字符，必须为整数或允许的大写英文";
  } catch {
    return i + "的参数有非法字符，必须是整数~";
  }
}
function Ae(e, t, n, l) {
  let i = e.split(","), r = new Array(i.length), s = 0;
  for (let a = 0; a < i.length; a++)
    r[a] = i[a];
  for (let a = 0; a < r.length; a++) {
    let c = A(r[a], t, n, !0, l);
    if (c != 1)
      return c;
    s = 0;
    for (let d = 0; d < r.length; d++)
      if (r[a] == r[d] && s++, s > 1)
        return l + "中的参数重复";
  }
  let u = -1;
  for (let a = 0; a < r.length; a++) {
    let c = r[a];
    try {
      let d = parseInt(c, 10);
      d < u || (u = d);
    } catch {
      return "这段提示用不到";
    }
  }
  return !0;
}
function be(e, t, n, l) {
  if (e.split("/").length > 2)
    return l + "中的参数只能有一个'/'";
  let i = e.substring(0, e.indexOf("/")), r = e.substring(e.indexOf("/") + 1);
  if (i != "*") {
    let s = A(i, t, n, !0, l);
    return s != 1 ? s : (s = A(r, 1, l === "年的" ? 5 : n, !0, l), s == 1 || s);
  }
  return A(r, t, n, !1, l);
}
function xe(e, t, n, l) {
  let i;
  if (e.split("-").length > 2)
    return l + "中的参数只能有一个'-'";
  let r = null, s = null;
  if (e.indexOf("/") > -1) {
    if (e.split("/").length > 2)
      return l + "中的参数只能有一个'/'";
    if (r = e.split("/")[0], s = e.split("/")[1], i = A(s, t, n, !0, l), i != 1)
      return i;
  } else
    r = e;
  let u = r.substring(0, r.indexOf("-")), a = r.substring(r.indexOf("-") + 1);
  if (i = A(u, t, n, !0, l), i != 1 || (i = A(a, t, n, !0, l), i != 1))
    return i;
  try {
    let c = parseInt(u, 10), d = parseInt(a, 10);
    return d < c ? l + "的取值范围错误，前值必须小于后值" : !(d - c < parseInt(s, 10)) || l + "的取值范围内的循环无意义";
  } catch {
    return l + "的参数有非法字符，必须是整数";
  }
}
function Ce(e, t, n, l, i) {
  for (let r = 0; r < e.length; r++) {
    let s = 0;
    if (e.charAt(r) == t && s++, s > 1)
      return i + "的值的" + t + "字母只能有一个";
  }
  if (t == "L") {
    if (e == "LW" || e == "L")
      return !0;
    if (e.endsWith("LW") && e.length > 2)
      return i + "中的参数，最后的LW前面不能有任何字母参数";
    if (e.endsWith("L")) {
      let r = e.substring(0, e.indexOf(t));
      return A(r, n, l, !0, i);
    }
    return i + "中的参数，L字母后面不能有W以外的字符、数字等";
  }
  if (t == "W") {
    if (e.endsWith("W")) {
      if (e == "W")
        return i + "中的参数的W前面必须有数字";
      let r = e.substring(0, e.indexOf(t));
      return A(r, n, l, !0, i);
    }
    return i + "中的参数的W必须作为结尾";
  }
  if (t == "C") {
    if (e.endsWith("C")) {
      if (e == "C")
        return i + "中的参数的C前面必须有数字";
      let r = e.substring(0, e.indexOf(t));
      return A(r, n, l, !0, i);
    }
    return i + "中的参数的C必须作为结尾";
  }
}
function Oe(e, t, n, l, i) {
  let r;
  for (let s = 0; s < e.length; s++) {
    let u = 0;
    if (e.charAt(s) == t && u++, u > 1)
      return i + "的值的" + t + "字母只能有一个";
  }
  if (t == "L") {
    if (e == "L")
      return i + "中的参数，L字母前必须有数字";
    if (e.endsWith("L")) {
      let s = e.substring(0, e.indexOf(t));
      return A(s, n, l, !0, i);
    }
    return i + "中的参数，L字母必须是最后一位";
  }
  if (t == "C") {
    if (e.endsWith("C")) {
      if (e == "C")
        return i + "中的参数的C前面必须有数字";
      let s = e.substring(0, e.indexOf(t));
      return A(s, n, l, !0, i);
    }
    return i + "中的参数的C必须作为结尾";
  }
  if (t == "#") {
    if (e == "#")
      return i + "中的#前后必须有整数";
    if (e.charAt(0) == t)
      return i + "中的#前面必须有整数";
    if (e.endsWith("#"))
      return i + "中的#后面必须有整数";
    let s = e.substring(0, e.indexOf(t)), u = e.substring(e.indexOf(t) + 1, e.length);
    return r = A(s, 1, 4, !0, i + "的#前面"), r != 1 ? r : (r = A(u, n, l, !0, i + "的#后面"), r == 1 || r);
  }
}
function we(e) {
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
const We = {
  name: "CronChoose",
  props: {
    multiple: {
      type: Boolean,
      default: !1
    },
    range: {
      type: Array,
      required: !0
    }
  },
  inject: ["isWeek"],
  data() {
    return {
      value: "",
      options: []
    };
  },
  watch: {
    range: {
      handler: function(e) {
        this.options = [];
        for (let t = e[0]; t <= e[1]; t++)
          if (!this.isWeek())
            this.options.push(t);
          else {
            const n = {};
            n.value = t, n.label = this.getWeek(t), this.options.push(n);
          }
      },
      immediate: !0
    },
    val: {
      handler: function(e) {
        this.value = e;
      },
      immediate: !0
    }
  },
  methods: {
    getWeek(e) {
      switch (e) {
        case 1:
          return "星期天";
        case 2:
          return "星期一";
        case 3:
          return "星期二";
        case 4:
          return "星期三";
        case 5:
          return "星期四";
        case 6:
          return "星期五";
        case 7:
          return "星期六";
      }
    },
    handleChange(e) {
      if (this.multiple) {
        const t = e.sort((n, l) => n > l ? 1 : -1);
        this.$emit("input", t);
      } else
        this.$emit("input", e);
    }
  }
};
function Re(e, t, n, l, i, r) {
  const s = m("el-option"), u = m("el-select");
  return D(), R(u, {
    modelValue: i.value,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => i.value = a),
    placeholder: n.multiple ? "可多选" : "请选择",
    style: se({ width: `${n.multiple ? 196 : 95}px` }),
    clearable: !0,
    multiple: n.multiple,
    onChange: r.handleChange,
    "collapse-tags": "",
    "collapse-tags-tooltip": "",
    filterable: ""
  }, {
    default: h(() => [
      r.isWeek() ? (D(!0), F(K, { key: 1 }, Q(i.options, (a) => (D(), R(s, {
        key: a.value,
        label: a.label,
        value: a.value
      }, null, 8, ["label", "value"]))), 128)) : (D(!0), F(K, { key: 0 }, Q(i.options, (a) => (D(), R(s, {
        key: a,
        label: a,
        value: a
      }, null, 8, ["label", "value"]))), 128))
    ]),
    _: 1
  }, 8, ["modelValue", "placeholder", "style", "multiple", "onChange"]);
}
const Se = /* @__PURE__ */ Y(We, [["render", Re], ["__scopeId", "data-v-11c0b397"]]);
const ve = {
  name: "CronItem",
  props: {
    settings: {
      type: Object,
      required: !0
    }
  },
  provide() {
    return {
      isWeek: () => this.settings.type === "week"
    };
  },
  data() {
    return {
      radio: "per",
      begin: {
        start: "",
        interval: ""
      },
      period: {
        start: "",
        end: "",
        rangeStart: [],
        rangeEnd: []
      },
      appoint: [],
      none: "?",
      //日的专有配置
      last: "L",
      workDay: "",
      //周的专有配置
      lastWorkDay: ""
    };
  },
  components: { CronChoose: Se },
  created() {
    this.period.rangeStart = [...this.settings.range], this.period.rangeEnd = [...this.settings.range];
  },
  computed: {
    cronDetail() {
      return this.radio + this.begin.start + this.begin.interval + this.period.start + this.period.end + this.appoint.join("") + this.workDay + this.lastWorkDay;
    }
  },
  watch: {
    "period.start": {
      handler: function(e) {
        this.period.rangeEnd = [String(e).length === 0 ? this.settings.range[0] : e, this.settings.range[1]];
      },
      immediate: !0
    },
    "period.end": {
      handler: function(e) {
        this.period.rangeStart = [this.settings.range[0], String(e).length === 0 ? this.settings.range[1] : e];
      },
      immediate: !0
    },
    cronDetail: {
      handler: function() {
        this.tellFather();
      }
    }
  },
  methods: {
    initData(e) {
      if (e === "*")
        this.radio = "per";
      else if (e.indexOf("/") > -1) {
        this.radio = "begin";
        const t = e.split("/").map((n) => Number(n));
        this.begin.start = t[0], this.begin.interval = t[1];
      } else if (e.indexOf("-") > -1) {
        this.radio = "period";
        const t = e.split("-").map((n) => Number(n));
        this.period.start = t[0], this.period.end = t[1];
      } else if (e === "?")
        this.radio = "none";
      else if (e.indexOf("W") > -1)
        this.radio = "workDay", this.workDay = Number(e.split("W")[0]);
      else if (e.indexOf("L") > -1)
        this.settings.type === "day" ? this.radio = "last" : (this.radio = "lastWorkDay", this.lastWorkDay = Number(e.split("L")[0]));
      else if (e.length === 0)
        this.radio = "empty";
      else {
        this.radio = "appoint";
        const t = e.split(",").map((n) => Number(n));
        this.appoint = t;
      }
    },
    tellFather() {
      let e = "";
      switch (this.radio) {
        case "per":
          e = "*";
          break;
        case "begin":
          e = `${this.begin.start}/${this.begin.interval}`;
          break;
        case "period":
          e = `${this.period.start}-${this.period.end}`;
          break;
        case "appoint":
          e = this.appoint.join(",");
          break;
        case "none":
          e = "?";
          break;
        case "last":
          e = "L";
          break;
        case "workDay":
          e = `${this.workDay}W`;
          break;
        case "lastWorkDay":
          e = `${this.lastWorkDay}L`;
          break;
        case "empty":
          e = "";
          break;
      }
      this.$emit("input", e);
    },
    changeRadio(e) {
      const t = this.settings.type;
      ["day", "week"].indexOf(t) !== -1 && this.$emit("changeDayOrWeek", t, e);
    }
  }
};
function Ie(e, t, n, l, i, r) {
  const s = m("el-radio"), u = m("el-row"), a = m("CronChoose"), c = m("el-radio-group");
  return D(), R(c, {
    modelValue: i.radio,
    "onUpdate:modelValue": t[7] || (t[7] = (d) => i.radio = d),
    onInput: r.changeRadio
  }, {
    default: h(() => [
      o(u, null, {
        default: h(() => [
          o(s, { label: "per" }, {
            default: h(() => [
              X(k(n.settings.per.title[0]), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      o(u, null, {
        default: h(() => [
          n.settings.type !== "week" ? (D(), R(s, {
            key: 0,
            label: "begin"
          }, {
            default: h(() => [
              _("span", null, k(n.settings.begin.title[0]), 1),
              o(a, {
                modelValue: i.begin.start,
                "onUpdate:modelValue": t[0] || (t[0] = (d) => i.begin.start = d),
                range: n.settings.range,
                key: "begin1"
              }, null, 8, ["modelValue", "range"]),
              _("span", null, k(n.settings.begin.title[1]), 1),
              o(a, {
                modelValue: i.begin.interval,
                "onUpdate:modelValue": t[1] || (t[1] = (d) => i.begin.interval = d),
                range: n.settings.begin.rangeEnd,
                key: "begin2"
              }, null, 8, ["modelValue", "range"]),
              _("span", null, k(n.settings.begin.title[2]), 1)
            ]),
            _: 1
          })) : M("", !0)
        ]),
        _: 1
      }),
      o(u, null, {
        default: h(() => [
          o(s, { label: "period" }, {
            default: h(() => [
              _("span", null, k(n.settings.period.title[0]), 1),
              o(a, {
                modelValue: i.period.start,
                "onUpdate:modelValue": t[2] || (t[2] = (d) => i.period.start = d),
                range: i.period.rangeStart,
                key: "period1"
              }, null, 8, ["modelValue", "range"]),
              _("span", null, k(n.settings.period.title[1]), 1),
              o(a, {
                modelValue: i.period.end,
                "onUpdate:modelValue": t[3] || (t[3] = (d) => i.period.end = d),
                range: i.period.rangeEnd,
                key: "period2"
              }, null, 8, ["modelValue", "range"]),
              _("span", null, k(n.settings.period.title[2]), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      o(u, null, {
        default: h(() => [
          o(s, { label: "appoint" }, {
            default: h(() => [
              _("span", null, k(n.settings.appoint.title[0]), 1),
              o(a, {
                modelValue: i.appoint,
                "onUpdate:modelValue": t[4] || (t[4] = (d) => i.appoint = d),
                range: n.settings.range,
                multiple: !0,
                key: "appoint"
              }, null, 8, ["modelValue", "range"]),
              _("span", null, k(n.settings.appoint.title[1]), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      o(u, null, {
        default: h(() => [
          ["day", "week"].indexOf(n.settings.type) > -1 ? (D(), R(s, {
            key: 0,
            label: "none"
          }, {
            default: h(() => [
              _("span", null, k(n.settings.none.title[0]), 1)
            ]),
            _: 1
          })) : M("", !0)
        ]),
        _: 1
      }),
      o(u, null, {
        default: h(() => [
          ["day"].indexOf(n.settings.type) > -1 ? (D(), R(s, {
            key: 0,
            label: "last"
          }, {
            default: h(() => [
              _("span", null, k(n.settings.last.title[0]), 1)
            ]),
            _: 1
          })) : M("", !0)
        ]),
        _: 1
      }),
      o(u, null, {
        default: h(() => [
          ["day"].indexOf(n.settings.type) > -1 ? (D(), R(s, {
            key: 0,
            label: "workDay"
          }, {
            default: h(() => [
              _("span", null, k(n.settings.workDay.title[0]), 1),
              o(a, {
                modelValue: i.workDay,
                "onUpdate:modelValue": t[5] || (t[5] = (d) => i.workDay = d),
                range: n.settings.range,
                key: "workDay"
              }, null, 8, ["modelValue", "range"]),
              _("span", null, k(n.settings.workDay.title[1]), 1)
            ]),
            _: 1
          })) : M("", !0)
        ]),
        _: 1
      }),
      o(u, null, {
        default: h(() => [
          ["week"].indexOf(n.settings.type) > -1 ? (D(), R(s, {
            key: 0,
            label: "lastWorkDay"
          }, {
            default: h(() => [
              _("span", null, k(n.settings.lastWorkDay.title[0]), 1),
              o(a, {
                modelValue: i.lastWorkDay,
                "onUpdate:modelValue": t[6] || (t[6] = (d) => i.lastWorkDay = d),
                range: n.settings.range,
                key: "lastWorkDay"
              }, null, 8, ["modelValue", "range"]),
              _("span", null, k(n.settings.lastWorkDay.title[1]), 1)
            ]),
            _: 1
          })) : M("", !0)
        ]),
        _: 1
      }),
      o(u, null, {
        default: h(() => [
          ["year"].indexOf(n.settings.type) > -1 ? (D(), R(s, {
            key: 0,
            label: "empty"
          }, {
            default: h(() => [
              _("span", null, k(n.settings.empty.title[0]), 1)
            ]),
            _: 1
          })) : M("", !0)
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue", "onInput"]);
}
const Ve = /* @__PURE__ */ Y(ve, [["render", Ie], ["__scopeId", "data-v-cb63cb80"]]);
const Ne = (e, t, n) => {
  if (ge(t) === !0)
    n();
  else
    return n("Cron 表达式格式错误");
}, ee = (/* @__PURE__ */ new Date()).getFullYear(), Ee = {
  seconds: {
    type: "seconds",
    range: [0, 59],
    per: {
      title: ["每秒(*)"]
    },
    begin: {
      title: ["起点(/)：从第 ", " 秒开始，每隔 ", " 秒，执行一次"],
      rangeEnd: [1, 59]
    },
    period: {
      title: ["周期(-)：第 ", " 秒 - 第 ", " 秒内，执行"]
    },
    appoint: {
      title: ["指定：数到第 ", " 秒时执行"]
    }
  },
  minute: {
    type: "minute",
    range: [0, 59],
    per: {
      title: ["每分钟(*)"]
    },
    begin: {
      title: ["起点(/)：从第 ", " 分钟开始，每隔 ", " 分钟，执行一次"],
      rangeEnd: [1, 59]
    },
    period: {
      title: ["周期(-)：第 ", " 分钟 - 第 ", " 分钟内，执行"]
    },
    appoint: {
      title: ["指定：数到第 ", " 分钟执行"]
    }
  },
  hour: {
    type: "hour",
    range: [0, 23],
    per: {
      title: ["每小时(*)"]
    },
    begin: {
      title: ["起点(/)：从第 ", " 时开始，每隔 ", " 小时，执行一次"],
      rangeEnd: [1, 23]
    },
    period: {
      title: ["周期(-)：每天 ", " 时 - 第 ", " 时内，执行"]
    },
    appoint: {
      title: ["指定：每天 ", " 时执行"]
    }
  },
  day: {
    type: "day",
    range: [1, 31],
    per: {
      title: ["每日(*)"]
    },
    begin: {
      title: ["起点(/)：从第 ", " 日开始，每隔 ", " 天，执行一次"],
      rangeEnd: [1, 31]
    },
    period: {
      title: ["周期(-)：每月第 ", " 日 - 第 ", " 日内，执行"]
    },
    appoint: {
      title: ["指定：每月第 ", " 日执行"]
    },
    none: {
      title: ["不指定(?)"]
    },
    last: {
      title: ["每月最后一天(L)"]
    },
    workDay: {
      title: ["每月第 ", " 日最近的工作日(W)"]
    }
  },
  month: {
    type: "month",
    range: [1, 12],
    per: {
      title: ["每月(*)"]
    },
    begin: {
      title: ["起点(/)：从第 ", " 月开始，每隔 ", " 月，执行一次"],
      rangeEnd: [1, 12]
    },
    period: {
      title: ["周期(-)：每年 ", " 月 - 第 ", " 月内，执行"]
    },
    appoint: {
      title: ["指定：每年 ", " 月执行"]
    }
  },
  week: {
    type: "week",
    range: [1, 7],
    per: {
      title: ["每周(*)"]
    },
    period: {
      title: ["周期(-)：每周 ", " - ", " 执行"]
    },
    appoint: {
      title: ["指定： ", " 执行"]
    },
    none: {
      title: ["不指定(?)"]
    },
    lastWorkDay: {
      title: ["每月最后一个 ", " (L)"]
    }
  },
  year: {
    type: "year",
    range: [ee, ee + 10],
    per: {
      title: ["每年(*)"]
    },
    begin: {
      title: ["起点(/)：从 ", " 年开始，每隔 ", " 年，执行一次"],
      rangeEnd: [1, 5]
    },
    period: {
      title: ["周期(-)： ", " 年 - ", " 年执行"]
    },
    appoint: {
      title: ["指定： ", " 年"]
    },
    empty: {
      title: ["不填"]
    }
  }
}, Le = {
  name: "CronEditAll",
  props: {
    expression: {
      type: String,
      required: !0
    }
  },
  data() {
    return {
      form: {
        expression: ""
      },
      spaceIdList: [],
      activeName: "seconds",
      rules: {
        expression: [
          { validator: Ne, trigger: "change" }
        ]
      },
      cronDetail: {
        seconds: "0",
        minute: "0",
        hour: "0/1",
        day: "*",
        month: "*",
        week: "?",
        year: ""
      },
      DEFAULTCRON: Z,
      CRONSETTING: Ee
    };
  },
  mounted() {
    this.form.expression = this.expression || Z, this.reset(this.expression);
  },
  components: { CronToTime: fe, CronItem: Ve },
  watch: {
    cronDetail: {
      handler: function(e) {
        const t = [];
        for (let n in e)
          t.push(e[n]);
        this.form.expression = t.join(" ").trim(), this.cronChange(this.form.expression, !1);
      },
      deep: !0
    }
  },
  methods: {
    updateCronDetail(e, t) {
      this.cronDetail[t] = e;
    },
    cronChange(e, t = !0) {
      this.$refs.form.validateField("expression", (n) => {
        if (n) {
          this.$refs.cronTime.expressionChange(e);
          const l = e.split(" ");
          ["seconds", "minute", "hour", "day", "month", "week"].forEach(
            (i, r) => {
              this.cronDetail[i] = l[r];
            }
          ), l.length === 7 ? this.cronDetail.year = l[6] : this.cronDetail.year = "", t && (this.$refs.seconds.initData(this.cronDetail.seconds), this.$refs.minute.initData(this.cronDetail.minute), this.$refs.hour.initData(this.cronDetail.hour), this.$refs.day.initData(this.cronDetail.day), this.$refs.month.initData(this.cronDetail.month), this.$refs.week.initData(this.cronDetail.week), this.$refs.year.initData(this.cronDetail.year));
        } else
          this.$refs.cronTime.isValid = !1;
      });
    },
    reset(e = null) {
      e && (this.form.expression = e), this.$nextTick(() => {
        this.cronChange(this.form.expression);
      });
    },
    changeDayOrWeek(e, t) {
      const n = e === "day" ? "week" : "day";
      t === "none" ? this.cronDetail[n] === "?" && (this.cronDetail[n] = "*") : this.cronDetail[n] = "?", e === "day" ? this.$refs.week.initData(this.cronDetail.week) : this.$refs.day.initData(this.cronDetail.day);
    },
    submit() {
      return new Promise((e, t) => {
        this.$refs.form.validate((n) => {
          n ? e({ ...this.form }) : t(!1);
        });
      });
    }
  }
};
function Te(e, t, n, l, i, r) {
  const s = m("el-input"), u = m("el-form-item"), a = m("el-form"), c = m("CronItem"), d = m("el-tab-pane"), W = m("el-tabs"), b = m("el-col"), x = m("CronToTime"), C = m("el-row");
  return D(), R(C, { gutter: 20 }, {
    default: h(() => [
      o(b, { span: 18 }, {
        default: h(() => [
          o(a, {
            model: i.form,
            rules: i.rules,
            ref: "form",
            style: { "margin-top": "10px" }
          }, {
            default: h(() => [
              o(u, {
                label: "Cron表达式",
                prop: "expression"
              }, {
                default: h(() => [
                  o(s, {
                    modelValue: i.form.expression,
                    "onUpdate:modelValue": t[0] || (t[0] = (g) => i.form.expression = g),
                    placeholder: `请输入Cron表达式,默认值为${i.DEFAULTCRON}`,
                    onChange: r.cronChange
                  }, null, 8, ["modelValue", "placeholder", "onChange"]),
                  te(o(s, { placeholder: "防止回车刷新" }, null, 512), [
                    [ne, !1]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model", "rules"]),
          o(W, {
            modelValue: i.activeName,
            "onUpdate:modelValue": t[8] || (t[8] = (g) => i.activeName = g)
          }, {
            default: h(() => [
              o(d, {
                label: "秒",
                name: "seconds"
              }, {
                default: h(() => [
                  o(c, {
                    ref: "seconds",
                    key: "seconds",
                    settings: i.CRONSETTING.seconds,
                    onInput: t[1] || (t[1] = (g) => r.updateCronDetail(g, "seconds"))
                  }, null, 8, ["settings"])
                ]),
                _: 1
              }),
              o(d, {
                label: "分钟",
                name: "minute"
              }, {
                default: h(() => [
                  o(c, {
                    onInput: t[2] || (t[2] = (g) => r.updateCronDetail(g, "minute")),
                    ref: "minute",
                    key: "minute",
                    settings: i.CRONSETTING.minute
                  }, null, 8, ["settings"])
                ]),
                _: 1
              }),
              o(d, {
                label: "时",
                name: "hour"
              }, {
                default: h(() => [
                  o(c, {
                    onInput: t[3] || (t[3] = (g) => r.updateCronDetail(g, "hour")),
                    ref: "hour",
                    key: "hour",
                    settings: i.CRONSETTING.hour
                  }, null, 8, ["settings"])
                ]),
                _: 1
              }),
              o(d, {
                label: "日",
                name: "day"
              }, {
                default: h(() => [
                  o(c, {
                    onInput: t[4] || (t[4] = (g) => r.updateCronDetail(g, "day")),
                    ref: "day",
                    key: "day",
                    settings: i.CRONSETTING.day,
                    onChangeDayOrWeek: r.changeDayOrWeek
                  }, null, 8, ["settings", "onChangeDayOrWeek"])
                ]),
                _: 1
              }),
              o(d, {
                label: "月",
                name: "month"
              }, {
                default: h(() => [
                  o(c, {
                    onInput: t[5] || (t[5] = (g) => r.updateCronDetail(g, "month")),
                    ref: "month",
                    key: "month",
                    settings: i.CRONSETTING.month
                  }, null, 8, ["settings"])
                ]),
                _: 1
              }),
              o(d, {
                label: "周",
                name: "week"
              }, {
                default: h(() => [
                  o(c, {
                    onInput: t[6] || (t[6] = (g) => r.updateCronDetail(g, "week")),
                    ref: "week",
                    key: "week",
                    settings: i.CRONSETTING.week,
                    onChangeDayOrWeek: r.changeDayOrWeek
                  }, null, 8, ["settings", "onChangeDayOrWeek"])
                ]),
                _: 1
              }),
              o(d, {
                label: "年",
                name: "year"
              }, {
                default: h(() => [
                  o(c, {
                    onInput: t[7] || (t[7] = (g) => r.updateCronDetail(g, "year")),
                    ref: "year",
                    key: "year",
                    settings: i.CRONSETTING.year
                  }, null, 8, ["settings"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      }),
      o(b, { span: 6 }, {
        default: h(() => [
          o(x, { ref: "cronTime" }, null, 512)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Me = /* @__PURE__ */ Y(Le, [["render", Te], ["__scopeId", "data-v-b633a7a6"]]);
const Z = "0 0 0/1 * * ?", Fe = {
  name: "CronEditView",
  components: { CronEditAll: Me },
  props: {
    expression: {
      type: String
    },
    value: {
      type: Boolean,
      default: !1
    },
    len: {
      type: Number,
      default: 15
    }
  },
  provide() {
    return {
      len: this.len
    };
  },
  methods: {
    handleClose() {
      this.closeAction();
    },
    closeAction() {
      this.$emit("closeDialog", !1);
    },
    resetCron() {
      this.$refs.cronEdit.reset(Z);
    },
    submit() {
      this.$refs.cronEdit.submit().then((e) => {
        this.$emit("update", e.expression), this.closeAction();
      }).catch((e) => {
        console.log(e);
      });
    }
  }
};
function Ue(e, t, n, l, i, r) {
  const s = m("CronEditAll"), u = m("el-button"), a = m("el-popconfirm"), c = m("el-dialog");
  return D(), F("div", null, [
    o(c, {
      title: "定时任务",
      width: "70%",
      "model-value": n.value,
      "before-close": r.handleClose,
      "close-on-click-modal": !1,
      top: "10vh"
    }, {
      footer: h(() => [
        o(u, {
          type: "primary",
          style: { "margin-right": "10px" },
          onClick: r.submit
        }, {
          default: h(() => [
            X("保存")
          ]),
          _: 1
        }, 8, ["onClick"]),
        o(a, {
          title: "您确认重置吗？",
          onConfirm: r.resetCron,
          "confirm-button-text": "确认",
          "cancel-button-text": "取消"
        }, {
          reference: h(() => [
            o(u, null, {
              default: h(() => [
                X("重置")
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["onConfirm"])
      ]),
      default: h(() => [
        o(s, {
          ref: "cronEdit",
          expression: n.expression
        }, null, 8, ["expression"])
      ]),
      _: 1
    }, 8, ["model-value", "before-close"])
  ]);
}
const Ge = /* @__PURE__ */ Y(Fe, [["render", Ue], ["__scopeId", "data-v-e537dfdc"]]);
export {
  Ge as default
};
