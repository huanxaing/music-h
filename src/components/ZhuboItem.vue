<template>
  <div class="zhubo-item">
    <div class="top flex">
      <div class="text">{{ name }}</div>
      <div v-if="name != '电台个性推荐'">更多</div>
    </div>
    <div class="flex">
      <div class="item" v-for="(item, index) in faData" :key="index">
        <div>
          <img :src="item.picUrl" alt="" />
        </div>
        <div>{{ item.rcmdtext }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Zhubo",
  props: {
    faData: {
      type: Array,
    },
    name: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.zhubo-item {
  margin-top: 60px;
  height: 225px;

  .top {
    width: 100%;
    height: 40px;
    border-bottom: 2px #ccc solid;
    .text {
      font-weight: 600;
      font-size: 20px;
    }
  }
  .item {
    margin-top: 20px;
    width: 160px;
    height: 160px;
    img {
      width: 100%;
    }
  }
}
</style>