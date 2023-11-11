import { defineComponent as s, resolveComponent as p, openBlock as r, createElementBlock as d, createElementVNode as _, createVNode as l, withCtx as a, createTextVNode as i, pushScopeId as u, popScopeId as f } from "vue";
const m = (e) => (u("data-v-5837df49"), e = e(), f(), e), v = { class: "bg" }, h = /* @__PURE__ */ m(() => /* @__PURE__ */ _("h3", { class: "bg-title" }, "我是App", -1)), x = /* @__PURE__ */ s({
  __name: "cron",
  setup(e) {
    const t = () => {
      console.log("点击了");
    };
    return (o, n) => {
      const c = p("el-button");
      return r(), d("div", null, [
        _("div", v, [
          h,
          l(c, {
            onClick: t,
            type: "primary"
          }, {
            default: a(() => [
              i("我是封装的组件")
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
const g = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, c] of t)
    o[n] = c;
  return o;
}, y = /* @__PURE__ */ g(x, [["__scopeId", "data-v-5837df49"]]);
export {
  y as default
};
