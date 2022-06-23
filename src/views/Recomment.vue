<template>
  <div class="recooment-box">
    <div class="top">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tabsList"
          :key="index"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 头部导航 -->
    <!-- 根据点击头部导航来对应的显示内容：通过路由站位符来实现 -->
    <div class="recomment">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recomment",
  data() {
    return {
      activeName: "/recomment/rtstyle",
      tabsList: [
        { label: "个性推荐", name: "/recomment/rtstyle" },
        { label: "歌单", name: "/recomment/songlist" },
        { label: "主播电台", name: "/recomment/zhubo" },
        { label: "排行榜", name: "/recomment/phang" },
        { label: "歌手", name: "/recomment/singer" },
        { label: "最新音乐", name: "/recomment/newmusic" },
      ],
    };
  },
  mounted() {
    //获取 最后点击的值 sessionStorage

    let datas = sessionStorage.getItem("items");
    if (datas) {
      this.activeName = datas;
    } else {
      this.activeName = "/recomment/rtstyle";
    }
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push(tab.name);
      sessionStorage.setItem("items", tab.name);
    },
  },
};
</script>

<style scoped lang='less'>
.recooment-box {
  .top {
    height: 40px;
    width: 469px;
    margin: 0 auto;
  }
  .recomment {
    background: #fff;
    height: 700px;
    // padding: 0 80px;
    padding: 0 80px;
    overflow-y: auto;
  }
}
</style>