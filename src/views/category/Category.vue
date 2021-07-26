<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" class="tab-menu"></tab-menu>
    </div>
    <scroll></scroll>
  </div>
</template>

<script>
import TabMenu from "@/views/category/childComps/TabMenu";

import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

import {getCategory} from "@/network/category";

export default {
  name: "Category",
  data() {
    return {
      categories: []
    }
  },
  components: {
    Scroll,
    NavBar,
    TabMenu
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        console.log(res);
        // 1.获取分类数据
        this.categories = res.data.category.list;

      })
    }
  }
}
</script>

<style scoped>

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.tab-menu {
  height: calc(100% - 44px - 45px);
}

</style>
