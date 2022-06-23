<template>
  <div class="Phang-box">
    <!-- 官方榜 -->
    <div class="box-top">
      <div class="box-top-name flex">
        <span>官方榜</span>
        <span></span>
      </div>
      <!-- 榜单类型 -->
      <div class="flex bdClass">
        <PhangItem :sonItemsData="itemsData"></PhangItem>
        <PhangItem :sonItemsData="newSong"></PhangItem>
        <PhangItem :sonItemsData="original"></PhangItem>
      </div>
    </div>
    <!-- 全球榜 -->
    <div class="box-bottom">
      <div class="box-bottom-name flex">
        <span>全球榜</span>
        <span></span>
      </div>
      <!-- 榜单类型 -->
      <!-- 歌曲列表 -->
      <div class="bottom flex-one">
        <!-- 每个歌曲盒子 -->
        <div class="item" v-for="(item, index) in listData" :key="index">
          <!-- 播放按钮 -->
          <div class="icon"><i class="el-icon-video-play"></i></div>
          <!-- 播放量 -->
          <div class="Play-volume">
            <i class="el-icon-headset"></i
            >{{
              item.playCount > 10000
                ? Math.round(item.playCount / 10000) + "万"
                : item.playCount
            }}
          </div>
          <!-- 图片 -->
          <div class="img">
            <img :src="item.coverImgUrl" alt="" />
          </div>
          <div class="text">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGlobalData } from "@/network/phang";
import PhangItem from "@/components/PhangItem";

export default {
  name: "Phang",
  data() {
    return {
      listData: [], //全球榜单
      itemsData: {}, //飙升榜
      newSong: {}, //新歌榜
      original: {}, //原创榜
    };
  },
  components: {
    PhangItem,
  },
  methods: {
    //获取榜单数据
    getglobaldata() {
      getGlobalData("/toplist").then((res) => {
        this.listData = res.list;
        this.itemsData = res.list[0]; //飙升榜
        this.newSong = res.list[1]; //新歌榜
        this.original = res.list[2]; //原创榜
      });
    },
  },
  created() {
    // 获取全球榜单数据
    this.getglobaldata();
  },
};
</script>

<style scoped lang='less'>
.Phang-box {
  // 官方榜
  .box-top {
    .box-top-name {
      margin-top: 12px;
      border-bottom: 1px #666 solid;
      font-size: 26px;
    }
    .bdClass {
      padding: 0 40px;
      margin-top: 20px;
    }
  }
  // 全球榜
  .box-bottom {
    .box-bottom-name {
      margin-top: 12px;
      border-bottom: 1px #666 solid;
      font-size: 26px;
    }
    .item {
      position: relative;
      overflow: hidden;
      margin-top: 30px;
      width: 200px;
      height: 250px;
      margin-left: 15px;
      // 图片
      .img {
        img {
          width: 100%;
          height: 200px;
        }
      }
      // 文字
      .text {
        font-size: 16px;
        margin-top: 4px;
      }

      // 播放按钮
      .icon {
        position: absolute;
        transition: all 0.3s;
        right: 10px;
        bottom: 65px;
        transform: translateX(50px);
        width: 35px;
        height: 35px;
        color: red;
        border-radius: 50%;
        font-size: 35px;
      }
      // 播放量
      .Play-volume {
        position: absolute;
        right: 0;
        line-height: 25px;
        text-align: center;
        height: 25px;
        color: #fff;
        width: 80px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.4);
      }
    }

    .item:hover .icon {
      transform: translateX(0);
    }
    .bottom {
      margin-left: 50px;
    }
  }
}
</style>