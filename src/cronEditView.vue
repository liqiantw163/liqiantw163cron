<template>
  <div>
    <el-dialog title="定时任务" width="70%" :model-value="value" :before-close="handleClose" :close-on-click-modal="false"
      top="10vh">
      <CronEditAll ref="cronEdit" :expression="expression" />
      <template #footer>
        <el-button type="primary" style="margin-right: 10px" @click="submit">保存</el-button>
        <el-popconfirm title="您确认重置吗？" @confirm="resetCron" confirm-button-text="确认" cancel-button-text="取消">
          <template #reference>
            <el-button>重置</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import CronEditAll from './cronEdit.vue'
export const DEFAULTCRON = '0 0 0/1 * * ?'
export default {
  name: 'CronEditView',
  components: { CronEditAll },
  props: {
    expression: {
      type: String,
    },
    value: {
      type: Boolean,
      default: false
    },
    len: {
      type: Number,
      default: 15
    },
  },
  provide () {
    return {
      len: this.len
    }
  },
  methods: {
    handleClose () {
      this.closeAction()
      return
      // 先检查是否修改
      const changed = !!(this.expression === this.$refs.cronEdit.form)
      if (changed) {
        // 修改过
        this.$confirm('定时任务尚未提交，确认离开么？', {
          type: 'warning',
          title: '提示'
        }).then(() => {
          this.closeAction()
        })
      } else {
        // 未修改
        this.closeAction()
      }
    },
    closeAction () {
      this.$emit('closeDialog', false)
    },
    resetCron () {
      this.$refs.cronEdit.reset(DEFAULTCRON)
    },
    submit () {
      this.$refs.cronEdit.submit().then((res) => {
        this.$emit('update', res.expression)
        this.closeAction()
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>
<style lang="less" scoped>
:deep(.el-dialog__header) {
  border-bottom: 1px solid #ddd;
  margin-right: 0;
}

:deep(.el-dialog__footer) {
  border-top: 1px solid #ddd;
}

:deep(.el-dialog__title) {
  font-size: 14px;
  font-weight: 600;
}

:deep(.el-dialog__body) {
  padding: 0 24px;
}
</style>
