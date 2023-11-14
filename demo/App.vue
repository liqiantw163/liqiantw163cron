<template>
  <h1>我引入了cron表达式</h1>
  <cron />
  <el-button type="primary" @click="showDialog">生成cron</el-button>
  <cron-edit-view :value="showCron" :expression="expression" :len="10" @update="updateExpression"
    @closeDialog="closeDialog" />
</template>
<script setup lang="ts">
import cron from '../lib/index.js'
import '../lib/style.css'
import CronEditView from '../src/cronEditView.vue'
import { ref } from 'vue'
const showCron = ref(false)
const showDialog = () => {
  showCron.value = true
}
const expression = ref('')
const updateExpression = (value: string) => {
  expression.value = value
}
const closeDialog = () => {
  showCron.value = false
}
</script>