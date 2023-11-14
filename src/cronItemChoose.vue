<template>
  <el-select v-model="value" :placeholder="multiple ? '可多选' : '请选择'" :style="{ width: `${multiple ? 196 : 95}px` }"
    :clearable="true" :multiple="multiple" @change="handleChange" collapse-tags collapse-tags-tooltip filterable>
    <template v-if="!isWeek()">
      <el-option v-for="item in options" :key="item" :label="item" :value="item">
      </el-option>
    </template>
    <template v-else>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </template>
  </el-select>
</template>
<script>
export default {
  name: "CronChoose",
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    range: {
      type: Array,
      required: true,
    },
  },
  inject: ["isWeek"],
  data () {
    return {
      value: "",
      options: [],
    };
  },
  watch: {
    range: {
      handler: function (val) {
        this.options = [];
        for (let i = val[0]; i <= val[1]; i++) {
          if (!this.isWeek()) {
            this.options.push(i);
          } else {
            const mid = {};
            mid.value = i;
            mid.label = this.getWeek(i);
            this.options.push(mid);
          }
        }
      },
      immediate: true,
    },
    val: {
      handler: function (val) {
        this.value = val;
      },
      immediate: true,
    },
  },
  methods: {
    getWeek (i) {
      switch (i) {
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
    handleChange (e) {
      if (this.multiple) {
        const res = e.sort((a, b) => {
          if (a > b) {
            return 1
          } else {
            return -1
          }
        })
        this.$emit('input', res)
      } else {
        this.$emit('input', e)
      }
    }
  },
};
</script>
<style lang="less" scoped>
:deep(.el-input__inner) {
  padding: 0 0px 0 5px;
}
</style>