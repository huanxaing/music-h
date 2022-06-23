<template>
  <div class="zhubo-box">
    <div class="top">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in lunbo" :key="index">
          <img :src="item.pic" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 电台分类 -->
    <div class="middle flex-one">
      <div class="item" v-for="(item, index) in classY" :key="index">
        <img :src="item.pic84x84IdUrl" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="list">
      <ZhuboItem :faData="gexin" name="电台个性推荐"></ZhuboItem>
      <ZhuboItem :faData="cover" name="创造|翻唱"></ZhuboItem>
      <ZhuboItem :faData="d3" name="电子3D"></ZhuboItem>
      <ZhuboItem :faData="story" name="音乐故事"></ZhuboItem>
      <ZhuboItem :faData="emotion" name="情感调频"></ZhuboItem>
      <ZhuboItem :faData="quadratic" name="二次元"></ZhuboItem>
    </div>
  </div>
</template>

<script>
import ZhuboItem from "@/components/ZhuboItem";
import { getLunbo, getClass, getGexin, getCove } from "@/network/zhubo";
export default {
  name: "Zhubo",
  data() {
    return {
      lunbo: [], //轮播
      classY: [], //电台分类
      gexin: [], //个性电台
      cover: [], //翻唱
      d3: [], //3d
      story: [], //音乐故事
      emotion: [], //情感调频
      quadratic: [], //二次元
    };
  },
  components: {
    ZhuboItem,
  },
  created() {
    // 获取轮播图数据
    this.getlunbo();
    // 获取电台分类数据
    this.getcals();
    //获取个性推荐数据
    this.getgexin();
    //翻唱
    this.getcove(2001);
    //电子3D
    this.get3d(10002);
    //音乐故事
    this.getstory(2);
    //情感调频
    this.getemotion(3);
    this.getquadratic(3001); //二次元
  },

  methods: {
    // 获取轮播图数据
    getlunbo() {
      getLunbo("dj/banner").then((res) => {
        this.lunbo = res.data;
      });
    },
    // 获取电台分类数据
    getcals() {
      getClass("dj/catelist").then((res) => {
        this.classY = res.categories;
      });
    },
    //获取个性推荐数据
    getgexin() {
      getGexin("/dj/recommend").then((res) => {
        this.gexin = res.djRadios;
        this.gexin = this.gexin.splice(0, 6);
      });
    },
    // 翻唱
    getcove(type) {
      getCove("/dj/recommend/type", { type }).then((res) => {
        this.cover = res.djRadios;
        this.cover = this.cover.splice(0, 6);
      });
    },
    // 电子3D
    get3d(type) {
      getCove("/dj/recommend/type", { type }).then((res) => {
        this.d3 = res.djRadios;
        this.d3 = this.d3.splice(0, 6);
      });
    },
    //音乐故事
    getstory(type) {
      getCove("/dj/recommend/type", { type }).then((res) => {
        this.story = res.djRadios;
        this.story = this.story.splice(0, 6);
      });
    },
    //情感调频
    getemotion(type) {
      getCove("/dj/recommend/type", { type }).then((res) => {
        this.emotion = res.djRadios;
        this.emotion = this.emotion.splice(0, 6);
      });
    },
    //二次元
    getquadratic(type) {
      getCove("/dj/recommend/type", { type }).then((res) => {
        this.quadratic = res.djRadios;
        this.quadratic = this.quadratic.splice(0, 6);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.zhubo-box {
  .top {
    //走马灯效果

    img {
      height: 100%;
      width: 100%;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
    //
  }
  .middle {
    padding: 0 10px;
    .item {
      text-align: center;
      width: 100px;
      height: 100px;
      margin-left: 80px;
      margin-top: 50px;
      img {
        width: 100%;
        width: 80px;
      }
    }
  }
}
</style>