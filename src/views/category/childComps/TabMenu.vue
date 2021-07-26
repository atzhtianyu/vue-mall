<template>
  <scroll class="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item, index) in this.categories"
           :key="index"
           @click="itemClick(index)"
           :class="{active: currentIndex === index}">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  components: {
    Scroll,
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;

    }
  }
}
</script>

<style scoped>

.tab-menu {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}

.menu-list {
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.active {
  background-color: #fff;
  border-left: solid 3px var(--color-high-text);
  color: var(--color-high-text);
  font-weight: 700;
}

</style>
