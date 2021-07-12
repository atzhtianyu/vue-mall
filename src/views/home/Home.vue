<template>
  <div id="home">
    <nav-bar>
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <!--如果直接在 scroll 里边直接使用 class 设置 tabControl 的样式为fixed，则 tabControl 会直接脱离文档流-->
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"
                 class="tab-control"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import GoodsList from "@/components/content/goods/GoodsList";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import Scroll from "@/components/common/scroll/Scroll";

import {getHomeMultidata, getHomeGoods} from "@/network/home";
import {backTopMixin, itemListenerMixin} from "@/common/mixin";
import {POP, SELL, NEW, BACKTOP_DISTANCE} from "@/common/const";

export default {
  name: "Home",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      index: 0,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    NavBar,
    TabControl,
    Scroll,
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods(POP);
    this.getHomeGoods(NEW);
    this.getHomeGoods(SELL);
  },
  mounted() {
    this.$refs.scroll.refresh();
  },
  destroyed() {
    console.log('home destroyed');
  },
  activated() {
    // 这里的时间不能设置为0，否则会自动返回顶部
    this.$refs.scroll.scrollTo(0, this.saveY, 10);
    // 最好做一个refresh
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存 Y 值
    this.saveY = this.$refs.scroll.getScrollY();
    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImageListener);
  },
  methods: {
    /**
     * 事件监听
     */
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
      // 同步tab
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE;
      // 2.决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
}
</script>

<style scoped>

#home {
  padding-top: 44px;
  height: 100vh;
}

.nav-bar {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: var(--color-tint);
  color: #fff;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.content {*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/

</style>
