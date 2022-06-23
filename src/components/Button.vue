<template>
  <div class="button-box flex-thor">
    <div class="slider">
      <el-slider
        v-model="currTime"
        :max="maxTime"
        @change="sliderC()"
      ></el-slider>
    </div>
    <!-- 左边部分 -->
    <div class="box-left flex">
      <img v-if="songurl == ''" src="@/assets/logo.png" alt="" />
      <img v-else :src="songdetail.songs[0].al.picUrl" alt="" />
      <div class="songr">
        <div v-if="songurl != ''">
          {{ songdetail.songs[0].ar[0].name }}--{{ songdetail.songs[0].name }}
        </div>
        <div v-else>歌手-歌名</div>
        <div v-if="songurl != ''">
          {{ currTime | fromTimeM }}/{{ maxTime | fromTimeM }}
        </div>
        <div v-else>00:00/00:00</div>
      </div>
    </div>
    <!-- 中间部分 -->
    <div class="middle">
      <i class="el-icon-caret-left"></i>
      <!-- 没有播放 -->
      <i v-if="!isPaly" class="el-icon-video-play" @click="paly"></i>
      <i v-if="isPaly" class="el-icon-video-pause" @click="pause"></i>

      <!-- <i v- class="el-icon-video-pause"></i> -->
      <i class="el-icon-caret-right"></i>
      <audio :src="songurl" autoplay ref="audio"></audio>
    </div>
    <!-- 右边部分 -->
    <div class="right flex">
      <div class="volume">
        <i class="el-icon-mic"> </i>
        <el-slider
          @change="volumeC()"
          class="volumeItem"
          v-model="volumeVal"
          vertical
          height="45px"
          :max="1"
        >
        </el-slider>
      </div>

      <i class="el-icon-mic"></i>
      <i class="el-icon-mic"></i>
    </div>
  </div>
</template>

<script>
import { timestampToTime, formatSeconds } from "@/common/time";
import { mapState } from "vuex";
export default {
  name: "Button",
  data() {
    return {
      isPaly: true, //是否在播放
      value2: 20,
      currTime: 0, //当前播放时间
      maxTime: 0, //没一首歌曲的时长
      volumeVal: 1, //音量
    };
  },

  computed: {
    ...mapState(["songurl", "songdetail"]),
  },
  // 监听时间条

  // 过滤歌曲的时长格式
  filters: {
    fromTime(val) {
      let newTime = timestampToTime(val);
      return newTime;
    },
    fromTimeM(val) {
      let newTimeM = formatSeconds(val);
      return newTimeM;
    },
  },
  mounted() {
    this.slider();
  },
  methods: {
    // 播放事件
    paly() {
      this.isPaly = true;
      let audio = this.$refs.audio;
      audio.play();
    },
    // 停止播放事件
    pause() {
      let audio = this.$refs.audio;
      this.isPaly = false;
      audio.pause();
    },
    // 监听时间条
    slider() {
      let audio = this.$refs.audio;
      audio.addEventListener("timeupdate", () => {
        this.currTime = audio.currentTime;
        this.maxTime = audio.duration;
      });
    },
    // 滑动音量
    volumeC() {
      let audio = this.$refs.audio;
      audio.volume = this.volumeVal;
      console.log(audio.volume);
    },
    // 滑动进度
    sliderC() {
      let audio = this.$refs.audio;
      audio.currentTime = this.currTime;
    },
  },
};
</script>

<style scoped lang='less'>
.button-box {
  position: relative;
  height: 75px;
  background: #aed2e7;
  // 滑块
  .slider {
    position: absolute;
    top: -21px;
    width: 100%;
    height: 20px;
  }
  .box-left {
    img {
      width: 50px;
      height: 50px;
      margin: 0 10px;
    }

    .songr {
      margin-top: 5px;
      #d {
        width: 50px;
      }
    }
  }
  .middle {
    font-size: 50px;
    color: #070808;
  }
  .right {
    width: 100px;
    margin-right: 100px;
    .volume {
      position: relative;
      .volumeItem {
        height: 10px;
        width: 20px;
        position: absolute;
        top: -25px;
        opacity: 0;
      }
    }
    .volume:hover .volumeItem {
      opacity: 1;
    }
  }
}
</style>