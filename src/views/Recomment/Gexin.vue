<template>
  <div class="gexing-box">
    <!-- 轮播图 -->
    <div class="top">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in lunblist" :key="index">
          <!-- <h3 class="medium">{{ item.imageUrl }}</h3> -->
          <img :src="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommend-list">
      <div class="top flex">
        <div class="top-left">推荐歌单</div>
        <div>更多></div>
      </div>
      <!-- 歌曲列表 -->
      <div class="bottom flex-one">
        <!-- 每个歌曲盒子 -->
        <div class="item" v-for="(item, index) in recommend" :key="index">
          <!-- hover简介 -->
          <div class="hover-name">{{ item.name }}</div>
          <!-- 播放按钮 -->
          <div class="icon"><i class="el-icon-video-play"></i></div>
          <!-- 播放量 -->
          <div class="Play-volume">
            <i class="el-icon-headset"></i>{{ item.playCount }}
          </div>
          <!-- 图片 -->
          <div class="img">
            <img :src="item.coverImgUrl" alt="" />
          </div>
          <div class="text">{{ item.description }}</div>
        </div>
      </div>
    </div>
    <!-- 独家推送 -->
    <div class="sole-list">
      <div class="top flex">
        <div class="top-left">独家放送</div>
        <div>更多></div>
      </div>
      <!-- 歌曲列表 -->
      <div class="bottom flex-one">
        <!-- 每个歌曲盒子 -->
        <div class="item" v-for="(item, index) in sole" :key="index">
          <!-- 播放按钮 -->
          <div class="icon"><i class="el-icon-video-play"></i></div>
          <!-- 播放量 -->

          <!-- 图片 -->
          <div class="img">
            <img :src="item.picUrl" alt="" />
          </div>
          <div class="text">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="newmusic-list">
      <div class="top flex">
        <div class="top-left">最新音乐</div>
        <div>更多></div>
      </div>
      <!-- 歌曲列表 -->
      <div class="bottom flex-three">
        <div
          class="item flex-two"
          v-for="(item, index) in newmusic"
          :key="index"
          @click="songUrl(item.id)"
        >
          <!-- 歌曲编号 -->
          <!-- 使用v-if 如果num<0 num前面加个 0-->
          <div class="num" v-if="index + 1 < 10">0{{ index + 1 }}</div>
          <div class="num" v-else>{{ index + 1 }}</div>

          <!-- 歌曲图片 -->
          <div class="img">
            <img :src="item.picUrl" alt="" />
          </div>
          <!-- 歌曲名称 作者 -->
          <div class="name">
            <p>{{ item.name }}</p>
            <p>{{ item.song.album.artists[0].name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getLunbo,
  getRecommend,
  getSole,
  getNewMusic,
} from "@/network/gexin.js";
import { getSongUrl, getSongDetail } from "@/network/paly.js";
export default {
  name: "Gexin",
  data() {
    return {
      lunblist: [], //轮播
      recommend: [], //推荐歌单
      sole: [], //独家放送
      newmusic: [], //最新音乐
    };
  },
  created() {
    // 获取轮播数据
    this.getlunbo();
    // 获取推荐歌单数据
    this.getrecommend();
    //获取独家放送数据
    this.getsole();
    // 获取最新音乐数据
    this.getnewmusic();
  },
  methods: {
    // 获取歌曲播放地址
    songUrl(id) {
      this.getsongurl(id);
      this.getsongdetail(id);
    },
    //获取轮播图数据方法
    getlunbo() {
      getLunbo("/banner ").then((res) => {
        this.lunblist = res.banners;
      });
    },
    // 获取推荐歌单数据
    getrecommend() {
      getRecommend("/top/playlist", { limit: 10 }).then((res) => {
        this.recommend = res.playlists;
      });
    },
    // 获取独家放送数据
    getsole() {
      getSole("/personalized/privatecontent").then((res) => {
        this.sole = res.result;
      });
    },
    // 获取最新音乐数据
    getnewmusic() {
      getNewMusic("/personalized/newsong").then((res) => {
        this.newmusic = res.result;
      });
    },
    // 获取歌曲播放地址
    getsongurl(id) {
      getSongUrl("/song/url", { id }).then((res) => {
        console.log(res.data[0].url);
        this.$store.commit("geturl", res.data[0].url);
      });
    },
    // 获取歌曲详情
    getsongdetail(ids) {
      getSongDetail("song/detail", { ids }).then((res) => {
        console.log(res);
        this.$store.commit("getdetail", res);
      });
    },
  },
};
</script>

<style scoped lang='less'>
/* 轮播图样式 */
//
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/*  */
//
// 推荐歌单
.recommend-list {
  .top {
    height: 40px;
    width: 100%;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    .top-left {
      font-size: 26px;
    }
  }
  // 歌曲盒子
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
    // 歌曲简介
    .hover-name {
      overflow: hidden;
      position: absolute;
      transform: translateY(-100%);
      transition: all 0.3s;
      width: 100%;
      height: 40px;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      line-height: 40px;
      font-size: 8px;
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
  .item:hover .hover-name {
    transform: translateY(0);
  }
  .item:hover .icon {
    transform: translateX(0);
  }
  .bottom {
    margin-left: 50px;
  }
}
// 独家放送
.sole-list {
  .top {
    height: 40px;
    width: 100%;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    .top-left {
      font-size: 26px;
    }
  }
  // 歌曲盒子
  .item {
    position: relative;
    overflow: hidden;
    margin-top: 30px;
    width: 350px;
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
  }

  .item:hover .icon {
    transform: translateX(0);
  }
  .bottom {
    margin-left: 50px;
  }
}
// 最新音乐
.newmusic-list {
  .top {
    height: 40px;
    width: 100%;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    .top-left {
      font-size: 26px;
    }
  }

  .bottom {
    height: 605px;
    margin-left: 50px;
    .item {
      width: 50%;
      border-bottom: 1px #ccc solid;
      padding: 7px 0;
      margin-top: 20px;
      height: 100px;
      .img {
        height: 100%;
        margin: 0 20px;
        img {
          height: 100%;
        }
      }
    }
    .item:hover {
      background: #666;
    }
  }
}
</style>