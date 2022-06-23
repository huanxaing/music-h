<template>
  <div class="load-box">
    <p>拼命加载中...</p>
  </div>
</template>

<script>
export default {
  name: "Load",
};
</script>

<style lang="less" scoped>
.load-box {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  line-height: 100%;
  text-align: center;
}
</style>