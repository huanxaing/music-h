<template>
  <div class="song-box">
    <!-- 头部 下拉菜单 -->
    <div class="box-top">
      <el-dropdown trigger="click" @command="handleCommand">
        <el-button>
          {{ currentCalss }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in classData"
            :key="index"
            :command="item.name"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 分类栏 -->
    <div class="classL">
      <span>热门标签:</span>
      <span
        class="classL-item"
        v-for="(item, index) in classData"
        :key="index"
        :class="currentCalss == item.name ? 'red' : ''"
        @click="clickColor(item.name)"
        >{{ item.name }}
        <span v-show="index < classData.length - 1" style="color: #000">|</span>
      </span>
    </div>

    <!-- 音乐数据 -->
    <!-- 歌曲列表 -->
    <div class="bottom flex-one">
      <!-- 每个歌曲盒子 -->
      <div class="item" v-for="(item, index) in musicData" :key="index">
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
    <!-- 分页 -->
    <div class="paging">
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentchange"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="30"
          layout="total,  prev, pager, next, jumper"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getClassData, getSongData } from "@/network/songlist";
export default {
  name: "SongList",
  data() {
    return {
      limit: 30, //限制条数
      cat: "", //获取的音乐类型  ''表示全部
      count: 0, //初始化总条数
      currentchange: 1, //当前页
      currentCalss: "音乐", //当前类
      classData: [], // 所有类
      musicData: [], //音乐数据
    };
  },
  created() {
    // 获取歌单类名数据
    this.getclassdata();
    // 获取音乐数据
    if (this.currentCalss == "音乐") {
      this.getsongdata(this.limit, this.currentchange, "");
    } else {
      this.getsongdata(this.limit, this.currentchange, this.currentCalss);
    }
  },
  methods: {
    // 分页
    handleCurrentChange(val) {
      this.currentchange = val;
      if (this.currentCalss == "音乐") {
        this.getsongdata(this.limit, this.currentchange, "");
      } else {
        this.getsongdata(this.limit, this.currentchange, this.currentCalss);
      }
    },
    // 点击类字体变颜色
    clickColor(item) {
      this.currentCalss = item;
      this.currentchange = 1;
      this.getsongdata(this.limit, this.currentchange, this.currentCalss);
    },
    handleCommand(command) {
      this.currentCalss = command;
      this.currentchange = 1;
      this.getsongdata(this.limit, this.currentchange, this.currentCalss);
    },
    // 获取歌单类名数据
    getclassdata() {
      getClassData("/playlist/hot").then((res) => {
        this.classData = res.tags;
      });
    },
    //获取音乐数据
    getsongdata(limit, offset, cat) {
      getSongData("/top/playlist", {
        limit,
        offset,
        cat,
      }).then((res) => {
        this.musicData = res.playlists;
        this.count = res.total;
      });
    },
  },
};
</script>


<style scoped lang='less'>
// 下拉菜单样式
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

//
.song-box {
  // 头部下拉菜单
  .box-top {
    margin-top: 12px;
    height: 40px;
  }
  //分类栏
  .classL {
    margin-top: 12px;
    // 每一项分类
    .classL-item {
      margin-left: 12px;
      cursor: pointer;
    }
    .red {
      color: red;
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
</style>