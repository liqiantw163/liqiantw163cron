<template>
  <div class="bg">
    <h3 class="bg-title">我是App</h3>
    <el-button @click="handleClick">我是封装的组件</el-button>
  </div>
</template>
<script setup>
const handleClick = () => {
  console.log('点击了');
}
</script>
<style scoped>
.bg {
  background: pink;

}

.bg-title {
  color: blue
}
</style>