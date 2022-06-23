<template>
  <div class="main">
    <img src="./assets/bg.jpg" alt="" />
    <div id="app">
      <div id="nav">
        <!-- 结构 -->
        <!-- 头部 -->
        <Top />
        <!-- 内容区域 -->
        <Conent />
        <!-- 尾部 -->
        <Button />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Top,
    Conent,
    Button,
  },
};
import Top from "@/components/Top.vue"; //引入头部
import Conent from "@/views/Conent.vue"; //引入内容部分
import Button from "@/components/Button.vue"; //引入尾部
</script>

<style scoped lang='less'>
.main {
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    filter: blur(80px);
  }
  #app {
    width: 1400px;
    position: relative;
    // height: 100px;
    margin: 0 auto;
    margin-top: 50px;
  }
}
</style>