<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                class="tab-menu"
                @selectItem="selectItem"></tab-menu>
      <scroll class="tab-content" :data="[categoryData]">
        <div>
          <sub-category :subcategories="showSubcategory"></sub-category>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import TabMenu from "@/views/category/childComps/TabMenu";
import SubCategory from "@/views/category/childComps/SubCategory";

import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

import {getCategory, getSubCategory} from "@/network/category";

export default {
  name: "Category",
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1
    }
  },
  components: {
    Scroll,
    NavBar,
    TabMenu,
    SubCategory,
  },
  created() {
    // 1.请求分类数据
    this.getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories;
    }
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        console.log(res);
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        this.getSubcategories(0);
      })
    },
    getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubCategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData};
      })
    },

    selectItem(index) {
      this.getSubcategories(index);
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

.tab-content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 100px;
  overflow: hidden;
}

</style>
