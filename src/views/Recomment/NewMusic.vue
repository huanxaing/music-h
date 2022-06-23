<template>
  <div class="newMusic">
    <!-- 选项 -->
    <div class="top">
      <el-button round :class="flag ? 'clickBG' : ''" @click="clickOne"
        >新歌速递</el-button
      >
      <el-button round :class="!flag ? 'clickBG' : ''" @click="clickTwo"
        >新歌上架</el-button
      >
    </div>
    <!-- 地区 -->
    <div class="area">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane label="华语" name="7"></el-tab-pane>
        <el-tab-pane label="欧美" name="96"></el-tab-pane>
        <el-tab-pane label="韩国" name="16"></el-tab-pane>
        <el-tab-pane label="日本" name="8"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- music列表 -->
    <div class="list">
      <el-table
        :data="NewMusicList"
        style="width: 100%"
        height="850"
        :show-header="false"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column fixed type="index" label="排名" width="90">
        </el-table-column>
        <el-table-column prop="" label="图片" width="160" v-if="flag">
          <template slot-scope="scope">
            <div>
              <img class="img" :src="scope.row.album.blurPicUrl" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="图片" width="160" v-if="!flag">
          <template slot-scope="scope">
            <div>
              <img class="img" :src="scope.row.blurPicUrl" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="歌名" width="380">
        </el-table-column>
        <el-table-column prop="artists[0].name" label="作者" width="380">
        </el-table-column>
        <el-table-column prop="address" label="时长" width="130" v-if="flag">
          <template slot-scope="scope">
            <div>{{ scope.row.bMusic.playTime | fromTime }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="时长" width="130" v-else>
          <template slot-scope="scope">
            <div>{{ scope.row.publishTime | publcTime }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getNewMusic, getGrounding } from "@/network/newMusic";
import { timestampToTime, formatDateTimeY } from "@/common/time";
export default {
  name: "NewMusic",
  data() {
    return {
      flag: true,
      activeName: "0",
      loading: false, //判断是否在加载
      NewMusicList: [], //最新音乐数据列表
    };
  },
  created() {
    this.getnewmusic(0);
  },
  //过滤歌曲时长
  filters: {
    // 歌曲时长
    fromTime(val) {
      let newTime = timestampToTime(val);
      return newTime;
    },
    // 新歌上架发布时间
    publcTime(val) {
      let newTimeY = formatDateTimeY(val);
      return newTimeY;
    },
  },
  methods: {
    // 选择新歌速递
    clickOne() {
      this.flag = true;
      this.getnewmusic(0);
      this.activeName = "0";
    },
    // 选择新歌上架
    clickTwo() {
      this.flag = false;
      this.getgrounding("ZH");
      this.activeName = "0";
    },
    // 地区选项方法
    handleClick(tab) {
      this.activeName = tab.name;
      let num = this.activeName * 1;
      if (this.flag) {
        this.getnewmusic(num);
      } else {
        switch (tab.name) {
          case "0":
            this.getgrounding("ZH");
            break;
          case "7":
            this.getgrounding("ZH");
            break;
          case "16":
            this.getgrounding("KR");
            break;
          case "96":
            this.getgrounding("EA");
            break;
          case "8":
            this.getgrounding("JP");
            break;
        }
        // }
      }
    },
    // 获取最新音乐数据
    getnewmusic(type) {
      this.loading = true;
      this.NewMusicList = [];
      getNewMusic("/top/song", { type }).then((res) => {
        this.NewMusicList = res.data.splice(0, 10);
        console.log(this.NewMusicList[0].artists[0].id);
        this.loading = false;
      });
    },
    getgrounding(area, limit) {
      this.loading = true;
      this.NewMusicList = [];
      getGrounding("/top/album", { area: area, limit: 10 }).then((res) => {
        this.NewMusicList = res.monthData.splice(0, 10);
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="less">
.newMusic {
  // 选项
  .top {
    text-align: center;
    width: 400px;
    margin: 0 auto;
    margin-top: 20px;
  }
  // 点击选项按钮背景颜色
  .clickBG {
    background: #87ceeb;
    color: #fff;
  }
  .list {
    margin-left: 30px;
    .img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>