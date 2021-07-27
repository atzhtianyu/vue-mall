<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                class="tab-menu"
                @selectItem="selectItem"></tab-menu>
      <scroll class="tab-content"
              :data="[categoryData]"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll">
        <div>
          <sub-category :subcategories="showSubcategory"/>
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"/>
          <subcategory-detail :detail="showSubcategoryDetail"/>
        </div>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
  </div>
</template>

<script>
import TabMenu from "@/views/category/childComps/TabMenu";
import SubCategory from "@/views/category/childComps/SubCategory";
import SubcategoryDetail from "@/views/category/childComps/SubcategoryDetail";

import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
import TabControl from "@/components/content/tabControl/TabControl";

import {getCategory, getSubCategory, getCategoryDetail} from "@/network/category";
import {tabControlMixin, backTopMixin} from "@/common/mixin";
import {BACKTOP_DISTANCE, NEW, POP, SELL} from "@/common/const";

export default {
  name: "Category",
  mixins: [tabControlMixin, backTopMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: POP
    }
  },
  components: {
    Scroll,
    NavBar,
    TabMenu,
    SubCategory,
    TabControl,
    SubcategoryDetail
  },
  created() {
    // 1.请求分类数据
    this.getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories;
    },
    showSubcategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
    }
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              POP: [],
              NEW: [],
              SELL: []
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
        this.getSubCategoryDetail(POP);
        this.getSubCategoryDetail(SELL);
        this.getSubCategoryDetail(NEW);
      })
    },
    getSubCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入 miniWallkey 和 type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = {...this.categoryData};
      })
    },

    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE;
    },
    selectItem(index) {
      this.getSubcategories(index);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break;
      }
      console.log(this.currentType);
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
