<template>
  <div class="phang-item flex-three">
    <div class="item-top">
      <img :src="sonItemsData.coverImgUrl" />
      <div class="update">{{ time | Newdate }}更新</div>
      <div class="ioc"><i class="el-icon-video-play"></i></div>
    </div>
    <div
      class="item-middle flex"
      v-for="(item, index) in songList"
      :key="index"
      :class="index == 0 ? 'itemBG' : ''"
    >
      <div>
        <span class="num">{{ index + 1 }}</span
        ><span>{{ item.songs[0].al.name }}</span>
      </div>
      <div>
        <span>{{ item.songs[0].ar[0].name }}</span>
      </div>
    </div>
    <div class="item-bottom flex">
      <span></span>
      <span>查看全部></span>
    </div>
  </div>
</template>

<script>
import { getUrlData, getSongData } from "@/network/phang";
import { formatDateTime } from "@/common/time.js";
// ("@/common/common");
export default {
  name: "PhangItem",
  props: {
    sonItemsData: {
      type: Object,
    },
  },
  data() {
    return {
      songList: [], //歌曲列表
      time: new Date(), //时间
    };
  },
  watch: {
    sonItemsData: function (val, old) {
      this.getList(val.id);
    },
  },
  filters: {
    Newdate: function (val) {
      let newDate = formatDateTime(val);
      return newDate;
    },
  },
  methods: {
    getList(id) {
      getUrlData("/playlist/detail", { id }).then((res) => {
        // 获取8条歌曲
        for (let i = 0; i < 8; i++) {
          this.getsongdata(res.privileges[i].id);
        }
      });
    },
    getsongdata(ids) {
      getSongData("/song/detail", { ids }).then((res) => {
        this.songList.push(res);
      });
    },
  },
};
</script>

<style scoped lang='less'>
.phang-item {
  width: 300px;
  border: 1px solid #ccc;
  .item-top {
    position: relative;
    height: 100px;
    color: #fff;
    font-size: 18px;
    img {
      width: 100%;
      height: 100%;
    }
    .ioc {
      position: absolute;
      right: 20px;
      bottom: 10px;
    }
    .update {
      position: absolute;
      left: 20px;
      bottom: 10px;
    }
  }
  .item-middle {
    flex: 1;
    height: 25px;
    line-height: 25px;
    padding: 0 20px;
    .num {
      color: red;
      font-size: 22px;
      margin-right: 10px;
      font-weight: 600;
    }
  }
  .item-middle:hover {
    background: #666;
  }
  .itemBG {
    background: #ccc;
  }
  .item-bottom {
    height: 20px;
  }
}
</style>