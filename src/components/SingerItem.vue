<template>
  <div class="singerItem">
    <span class="languages">{{ name }}:</span>
    <div v-for="(item, index) in language" :key="index" class="item">
      <span
        class="choose"
        :class="index == select ? 'itemBG' : ''"
        @click="selectClick(index, item)"
        >{{ item }}</span
      ><span v-if="index < language.length - 1" style="margin: 0 5px">|</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    language: {
      type: Array,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      select: 0, //初始高亮
    };
  },
  name: "SingerItem",
  methods: {
    selectClick(index, item) {
      this.select = index; //点击那一项 ,那一项就获得高亮
      this.$emit("sonClick", item);
    },
  },
};
</script>

<style  scoped lang='less'>
.singerItem {
  .languages {
    font-weight: 600;
  }
  .item {
    display: inline-block;
    .choose {
      padding: 0 8px;
    }
    .itemBG {
      background: #d6da0f;
      color: #fff;
    }
  }
}
</style>