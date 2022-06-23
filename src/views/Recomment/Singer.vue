<template>
  <div class="singer-box">
    <div class="top">
      <SingerItem
        :language="languages"
        name="语种"
        @sonClick="SonClick"
      ></SingerItem>
      <SingerItem
        :language="classify"
        name="分类"
        @sonClick="SonClick"
      ></SingerItem>
      <SingerItem
        :language="screen"
        name="筛选"
        @sonClick="SonClick"
      ></SingerItem>
    </div>
    <Load v-if="flag"></Load>
    <div class="list flex-one" v-else>
      <div class="list-item" v-for="(item, index) in singerList" :key="index">
        <img :src="item.picUrl" alt="" />
        <div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingerItem from "@/components/SingerItem";
import { getSingerData } from "@/network/singer";
import Load from "@/components/Load";
export default {
  name: "Singer",
  components: {
    SingerItem,
    Load,
  },
  data() {
    return {
      flag: false, //判断是否还在加载
      languages: ["华语", "欧美", "日本", "韩国", "其他"],
      classify: ["全部", "男歌手", "女歌手", "乐队组合"],
      screen: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z ",
        "#",
      ],
      type: "-1", //类型
      initial: "-1", //筛选
      area: "-1", //地区
      limit: 30, //条数
      singerList: [],
    };
  },
  created() {
    this.getsingerdata(this.type, this.initial, this.area, this.limit);
  },
  methods: {
    // 获取歌手数据

    getsingerdata(type, initial, area, limit) {
      this.flag = true;
      getSingerData("artist/list", {
        type,
        initial,
        area,
        limit,
      }).then((res) => {
        this.singerList = res.artists;
        this.flag = false;
      });
    },
    //监听子组件点击的事件
    SonClick(item) {
      console.log(item);
      if (item == "日本") {
        this.area = "8";
        this.getsingerdata(this.type, this.initial, this.area, this.limit);
      } else if (item == "全部") {
        this.area = "-1";
        this.getsingerdata(this.type, this.initial, this.area, this.limit);
      } else if (item == "韩国") {
        this.area = "16";
        this.getsingerdata(this.type, this.initial, this.area, this.limit);
      } else if (item == "华语") {
        this.area = "7";
        this.getsingerdata(this.type, this.initial, this.area, this.limit);
      } else if (item == "欧美") {
        this.area = "96";
        this.getsingerdata(this.type, this.initial, this.area, this.limit);
      } else if (item == "其他") {
        this.area = "0";
        this.getsingerdata(this.type, this.initial, this.area, this.limit);
      }
      switch (item) {
        case "全部":
          this.type = "-1";
          this.getsingerdata(this.type, this.initial, this.area, this.limit);
          break;
        case "男歌手":
          this.type = "1";
          this.getsingerdata(this.type, this.initial, this.area, this.limit);
          break;
        case "女歌手":
          this.type = "2";
          this.getsingerdata(this.type, this.initial, this.area, this.limit);
          break;
        case "乐队组合":
          this.type = "3";
          this.getsingerdata(this.type, this.initial, this.area, this.limit);
          break;
        default:
          this.initial = item.toLowerCase();
          this.getsingerdata(this.type, this.initial, this.area, this.limit);
      }
    },
  },
};
</script>

<style scoped lang='less'>
.singer-box {
  .list {
    margin-top: 30px;
    .list-item {
      width: 260px;
      height: 200px;

      margin-left: 20px;
      img {
        width: 100%;
        height: 150px;
      }
    }
  }
}
</style>