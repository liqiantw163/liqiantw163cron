<template>
  <h1>我引入了cron表达式</h1>
  <el-button type="primary">创建cron表达式</el-button>
  <cron />
</template>
<script setup lang="ts">
import cron from '../dist/index.umd.js'
</script>