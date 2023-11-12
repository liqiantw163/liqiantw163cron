<template>
  <el-radio-group v-model="radio" @input="changeRadio">
    <!-- 每 -->
    <el-row>
      <el-radio label="per">{{ settings.per.title[0] }}</el-radio>
    </el-row>
    <!-- 起点 -->
    <el-row>
      <el-radio label="begin" v-if="settings.type !== 'week'">
        <span>{{ settings.begin.title[0] }}</span>

        <CronChoose :val.sync="begin.start" :range="settings.range" key="begin1" />
        <span>{{ settings.begin.title[1] }}</span>

        <CronChoose :val.sync="begin.interval" :range="settings.begin.rangeEnd" key="begin2" />
        <span>{{ settings.begin.title[2] }}</span>

      </el-radio>
    </el-row>
    <!-- 周期 -->
    <el-row>
      <el-radio label="period">
        <span>{{ settings.period.title[0] }}</span>

        <CronChoose :val.sync="period.start" :range="period.rangeStart" key="period1" />
        <span>{{ settings.period.title[1] }}</span>

        <CronChoose :val.sync="period.end" :range="period.rangeEnd" key="period2" />
        <span>{{ settings.period.title[2] }}</span>

      </el-radio>
    </el-row>
    <!-- 指定 -->
    <el-row>
      <el-radio label="appoint">
        <span>{{ settings.appoint.title[0] }}</span>

        <CronChoose :val.sync="appoint" :range="settings.range" :multiple="true" key="appoint" />
        <span>{{ settings.appoint.title[1] }}</span>

      </el-radio>
    </el-row>
    <!-- 不指定 -->
    <el-row>
      <el-radio label="none" v-if="['day', 'week'].indexOf(settings.type) > -1">
        <span>{{ settings.none.title[0] }}</span>
      </el-radio>
    </el-row>
    <!-- 每月最后一天最近的工作日 -->
    <el-row>
      <el-radio label="last" v-if="['day'].indexOf(settings.type) > -1">
        <span>{{ settings.last.title[0] }}</span>
      </el-radio>
    </el-row>
    <!-- 每月某天最近的工作日 -->
    <el-row>
      <el-radio label="workDay" v-if="['day'].indexOf(settings.type) > -1">
        <span>{{ settings.workDay.title[0] }}</span>

        <CronChoose :val.sync="workDay" :range="settings.range" key="workDay" />
        <span>{{ settings.workDay.title[1] }}</span>

      </el-radio>
    </el-row>
    <!-- 每月最后一个星期几 -->
    <el-row>
      <el-radio label="lastWorkDay" v-if="['week'].indexOf(settings.type) > -1">
        <span>{{ settings.lastWorkDay.title[0] }}</span>

        <CronChoose :val.sync="lastWorkDay" :range="settings.range" key="lastWorkDay" />
        <span>{{ settings.lastWorkDay.title[1] }}</span>

      </el-radio>
    </el-row>
    <!-- 年不填 -->
    <el-row>
      <el-radio label="empty" v-if="['year'].indexOf(settings.type) > -1">
        <span>{{ settings.empty.title[0] }}</span>
      </el-radio>
    </el-row>
  </el-radio-group>
</template>
<script>
import CronChoose from "./cronItemChoose.vue";
export default {
  name: "CronItem",
  props: {
    cron: {
      type: String,
      required: true,
    },
    settings: {
      type: Object,
      required: true,
    },
  },
  provide () {
    return {
      isWeek: () => {
        return this.settings.type === "week" ? true : false;
      },
    };
  },
  data () {
    return {
      radio: "per",
      begin: {
        start: "",
        interval: "",
      },
      period: {
        start: "",
        end: "",
        rangeStart: [],
        rangeEnd: [],
      },
      appoint: [],
      none: "?",
      //日的专有配置
      last: "L",
      workDay: "",
      //周的专有配置
      lastWorkDay: "",
    };
  },
  components: { CronChoose },
  created () {
    this.period.rangeStart = [...this.settings.range];
    this.period.rangeEnd = [...this.settings.range];
  },
  computed: {
    cronDetail () {
      return (
        this.radio +
        this.begin.start +
        this.begin.interval +
        this.period.start +
        this.period.end +
        this.appoint.join("") +
        this.workDay +
        this.lastWorkDay
      );
    },
  },
  watch: {
    "period.start": {
      handler: function (val) {
        this.period.rangeEnd = [String(val).length === 0 ? this.settings.range[0] : val, this.settings.range[1]];
      },
      immediate: true,
    },
    "period.end": {
      handler: function (val) {
        this.period.rangeStart = [this.settings.range[0], String(val).length === 0 ? this.settings.range[1] : val];
      },
      immediate: true,
    },
    cronDetail: {
      handler: function () {
        this.tellFather();
      },
    },
  },
  methods: {
    initData (cron) {
      if (cron === "*") {
        // 每秒
        this.radio = "per";
      } else if (cron.indexOf("/") > -1) {
        // 起点
        this.radio = "begin";
        const mid = cron.split("/").map((item) => Number(item));
        this.begin.start = mid[0];
        this.begin.interval = mid[1];
      } else if (cron.indexOf("-") > -1) {
        // 周期
        this.radio = "period";
        const mid = cron.split("-").map((item) => Number(item));
        this.period.start = mid[0];
        this.period.end = mid[1];
      } else if (cron === "?") {
        this.radio = "none";
      } else if (cron.indexOf("W") > -1) {
        this.radio = "workDay";
        this.workDay = Number(cron.split("W")[0]);
      } else if (cron.indexOf("L") > -1) {
        //区分是日还是周
        if (this.settings.type === "day") {
          this.radio = "last";
        } else {
          this.radio = "lastWorkDay";
          this.lastWorkDay = Number(cron.split("L")[0]);
        }
      } else if (cron.length === 0) {
        // 年不填
        this.radio = "empty";
      } else {
        // 指定
        this.radio = "appoint";
        const mid = cron.split(",").map((item) => Number(item));
        this.appoint = mid;
      }
    },
    tellFather () {
      let cron = "";
      switch (this.radio) {
        case "per":
          cron = "*";
          break;
        case "begin":
          cron = `${this.begin.start}/${this.begin.interval}`;
          break;
        case "period":
          cron = `${this.period.start}-${this.period.end}`;
          break;
        case "appoint":
          cron = this.appoint.join(",");
          break;
        case "none":
          cron = "?";
          break;
        case "last":
          cron = "L";
          break;
        case "workDay":
          cron = `${this.workDay}W`;
          break;
        case "lastWorkDay":
          cron = `${this.lastWorkDay}L`;
          break;
        case "empty":
          cron = "";
          break;
      }
      this.$emit("update:cron", cron);
    },
    changeRadio (val) {
      const type = this.settings.type
      if (['day', 'week'].indexOf(type) === -1) {
        return
      }
      this.$emit('changeDayOrWeek', type, val)
    }
  },
};
</script>
<style lang="less" scoped>
.el-radio-group {
  display: unset;

  label {
    margin: 10px 0;
  }
}
</style>
