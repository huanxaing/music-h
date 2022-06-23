<template>
  <div class="content">
    <!-- 头部导航 -->
    <!-- 路由站位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
// import { getName } from "../network/gexin";

export default {
  name: "Conent",
  data() {
    return {
      obj: "",
    };
  },
  created() {
    // console.log(getName);
    // getName("/api?version=v61&appid=58161956&appsecret=1xUMDr9k", {
    //   num: 1,
    // }).then((res) => {
    //   console.log(res);
    //   this.obj = res.data;
    // });
  },
};
</script>

<style scoped lang='less'>
.content {
  background: #fff;
  height: 770px;
}
</style>