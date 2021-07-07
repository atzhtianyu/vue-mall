<template>
  <div class="detail-nav">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index"
             class="title-item"
             :class="{active: index === currentIndex}"
             @click="itemClick(index)">{{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: white;
}

.title {
  margin-top: 2px;
  display: flex;
  font-size: 13px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-tint);
}

.back img {
  margin-top: 12px;
}

</style>
