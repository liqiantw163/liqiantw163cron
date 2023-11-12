<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="Cron表达式" prop="expression">
          <el-input v-model="form.expression" :placeholder="`请输入Cron表达式,默认值为${DEFAULTCRON}`"
            @change="cronChange"></el-input>
        </el-form-item>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="秒" name="seconds">

            <CronItem :cron.sync="cronDetail.seconds" ref="seconds" key="seconds" :settings="CRONSETTING.seconds" />

          </el-tab-pane>
          <el-tab-pane label="分钟" name="minute">

            <CronItem :cron.sync="cronDetail.minute" ref="minute" key="minute" :settings="CRONSETTING.minute" />

          </el-tab-pane>
          <el-tab-pane label="时" name="hour">

            <CronItem :cron.sync="cronDetail.hour" ref="hour" key="hour" :settings="CRONSETTING.hour" />

          </el-tab-pane>
          <el-tab-pane label="日" name="day">

            <CronItem :cron.sync="cronDetail.day" ref="day" key="day" :settings="CRONSETTING.day"
              @changeDayOrWeek="changeDayOrWeek" />

          </el-tab-pane>
          <el-tab-pane label="月" name="month">

            <CronItem :cron.sync="cronDetail.month" ref="month" key="month" :settings="CRONSETTING.month" />

          </el-tab-pane>
          <el-tab-pane label="周" name="week">

            <CronItem :cron.sync="cronDetail.week" ref="week" key="week" :settings="CRONSETTING.week"
              @changeDayOrWeek="changeDayOrWeek" />

          </el-tab-pane>
          <el-tab-pane label="年" name="year">

            <CronItem :cron.sync="cronDetail.year" ref="year" key="year" :settings="CRONSETTING.year" />

          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-col>
    <el-col :span="6">

      <!-- <CronToTime :ex="form.expression" ref="cronTime" /> -->

    </el-col>
  </el-row>
</template>
<script>
import CronToTime from "./cronToTime.vue";
import { cronValidate } from "./checkCron.js";
import CronItem from "./cronItem.vue";
import { DEFAULTCRON } from "./cronEditView.vue"
const urlPathValidator = (rule, value, callback) => {
  const res = cronValidate(value);
  const isStandard = res === true ? true : false;
  if (!isStandard) {
    return callback(new Error("Cron 表达式格式错误"));
  } else {
    callback();
  }
};
const curYear = new Date().getFullYear();
export const CRONSETTING = {
  seconds: {
    type: "seconds",
    range: [0, 59],
    per: {
      title: ["每秒(*)"],
    },
    begin: {
      title: ["起点(/)：从第 ", " 秒开始，每隔 ", " 秒，执行一次"],
      rangeEnd: [1, 59],
    },
    period: {
      title: ["周期(-)：第 ", " 秒 - 第 ", " 秒内，执行"],
    },
    appoint: {
      title: ["指定：数到第 ", " 秒时执行"],
    },
  },
  minute: {
    type: "minute",
    range: [0, 59],
    per: {
      title: ["每分钟(*)"],
    },
    begin: {
      title: ["起点(/)：从第 ", " 分钟开始，每隔 ", " 分钟，执行一次"],
      rangeEnd: [1, 59],
    },
    period: {
      title: ["周期(-)：第 ", " 分钟 - 第 ", " 分钟内，执行"],
    },
    appoint: {
      title: ["指定：数到第 ", " 分钟执行"],
    },
  },
  hour: {
    type: "hour",
    range: [0, 23],
    per: {
      title: ["每小时(*)"],
    },
    begin: {
      title: ["起点(/)：从第 ", " 时开始，每隔 ", " 小时，执行一次"],
      rangeEnd: [1, 23],
    },
    period: {
      title: ["周期(-)：每天 ", " 时 - 第 ", " 时内，执行"],
    },
    appoint: {
      title: ["指定：每天 ", " 时执行"],
    },
  },
  day: {
    type: "day",
    range: [1, 31],
    per: {
      title: ["每日(*)"],
    },
    begin: {
      title: ["起点(/)：从第 ", " 日开始，每隔 ", " 天，执行一次"],
      rangeEnd: [1, 31],
    },
    period: {
      title: ["周期(-)：每月第 ", " 日 - 第 ", " 日内，执行"],
    },
    appoint: {
      title: ["指定：每月第 ", " 日执行"],
    },
    none: {
      title: ["不指定(?)"],
    },
    last: {
      title: ["每月最后一天(L)"],
    },
    workDay: {
      title: ["每月第 ", " 日最近的工作日(W)"],
    },
  },
  month: {
    type: "month",
    range: [1, 12],
    per: {
      title: ["每月(*)"],
    },
    begin: {
      title: ["起点(/)：从第 ", " 月开始，每隔 ", " 月，执行一次"],
      rangeEnd: [1, 12],
    },
    period: {
      title: ["周期(-)：每年 ", " 月 - 第 ", " 月内，执行"],
    },
    appoint: {
      title: ["指定：每年 ", " 月执行"],
    },
  },
  week: {
    type: "week",
    range: [1, 7],
    per: {
      title: ["每周(*)"],
    },
    period: {
      title: ["周期(-)：每周 ", " - ", " 执行"],
    },
    appoint: {
      title: ["指定： ", " 执行"],
    },
    none: {
      title: ["不指定(?)"],
    },
    lastWorkDay: {
      title: ["每月最后一个 ", " (L)"],
    },
  },
  year: {
    type: "year",
    range: [curYear, curYear + 10],
    per: {
      title: ["每年(*)"],
    },
    begin: {
      title: ["起点(/)：从 ", " 年开始，每隔 ", " 年，执行一次"],
      rangeEnd: [1, 5],
    },
    period: {
      title: ["周期(-)： ", " 年 - ", " 年执行"],
    },
    appoint: {
      title: ["指定： ", " 年"],
    },
    empty: {
      title: ["不填"],
    },
  },
};
export default {
  name: "CronEdit",
  props: {
    expression: {
      type: String,
      required: true
    },
    activeTab: {
      type: String,
      default: 'seconds'
    },
  },
  data () {
    return {
      form: {
        expression: ""
      },
      spaceIdList: [],
      activeName: "",
      rules: {
        expression: [
          { validator: urlPathValidator, trigger: "change" },
        ],
      },
      cronDetail: {
        seconds: "0",
        minute: "0",
        hour: "0/1",
        day: "*",
        month: "*",
        week: "?",
        year: "",
      },
      DEFAULTCRON,
      CRONSETTING
    };
  },
  mounted () {
    this.form.expression = this.expression || DEFAULTCRON;
    this.activeName = this.activeTab;
    this.reset(this.expression);
  },
  components: { CronToTime, CronItem },
  watch: {
    cronDetail: {
      handler: function (val) {
        const mid = [];
        for (let key in val) {
          mid.push(val[key]);
        }
        this.form.expression = mid.join(" ").trim();
        this.cronChange(this.form.expression, false);
      },
      deep: true,
    }
  },
  methods: {
    cronChange (e, changeChild = true) {
      this.$refs.form.validateField("expression", (msg) => {
        if (!msg) {
          this.$refs.cronTime.expressionChange(e);
          const arr = e.split(" ");
          ["seconds", "minute", "hour", "day", "month", "week"].forEach(
            (item, index) => {
              this.cronDetail[item] = arr[index];
            }
          );
          if (arr.length === 7) {
            this.cronDetail.year = arr[6];
          } else {
            this.cronDetail.year = "";
          }
          // 各设置项修改设置
          if (changeChild) {
            this.$refs.seconds.initData(this.cronDetail.seconds);
            this.$refs.minute.initData(this.cronDetail.minute);
            this.$refs.hour.initData(this.cronDetail.hour);
            this.$refs.day.initData(this.cronDetail.day);
            this.$refs.month.initData(this.cronDetail.month);
            this.$refs.week.initData(this.cronDetail.week);
            this.$refs.year.initData(this.cronDetail.year);
          }
        } else {
          this.$refs.cronTime.isValid = false;
        }
      });
    },
    reset (val = null) {
      if (val) {
        this.form.expression = val;
      }
      console.log('执行了', val);
      this.$nextTick(() => {
        this.cronChange(this.form.expression);
      });
    },
    changeDayOrWeek (type, val) {
      const mid = type === "day" ? "week" : "day";
      if (val === "none") {
        if (this.cronDetail[mid] === "?") {
          this.cronDetail[mid] = "*";
        }
      } else {
        this.cronDetail[mid] = "?";
      }
      if (type === "day") {
        this.$refs.week.initData(this.cronDetail.week);
      } else {
        this.$refs.day.initData(this.cronDetail.day);
      }
    },
    submit () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve({ ...this.form });
          } else {
            reject(false);
          }
        });
      });
    },
    tabClick ({ name }) {
      this.$emit("update:activeTab", name);
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .tm-el-drawe {
  float: none;
}

/deep/ .el-form-item__label {
  font-size: 14px;
}

/deep/ .el-select.el-select--small {
  width: 100%;
}

.el-row {
  display: flex !important;
}

/deep/ .el-col-18 {
  border-right: 1px solid #ddd;
}
</style>