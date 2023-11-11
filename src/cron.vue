<template>
  <div>
    <div class="bg">
      <h3 class="bg-title">我是App</h3>
      <el-button @click="handleClick" type="primary">我是封装的组件</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
const handleClick = () => {
  console.log('点击了');
}
</script>
<style scoped lang="less">
.bg {
  background-color: pink;
  border: 1px solid black;

  &-title {
    color: blue;
    font-size: 50px;
  }

  .bg-title {
    color: green;
  }
}
</style>