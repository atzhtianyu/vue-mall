<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="navbar"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="2"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info @detailImageLoad="detailImageLoad" :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!--<toast :message="message" :is-show="isShow"></toast>-->
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailRecommendInfo from "@/views/detail/childComps/DetailRecommendInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";

import {getDetail, getRecommend, Goods, Shop, GoodsPram} from "@/network/detail";
import {backTopMixin, itemListenerMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";
import {BACKTOP_DISTANCE} from "@/common/const";

import {mapActions} from "vuex";

// import Toast from "@/components/common/toast";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    Scroll,
    // Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      titleTopYs: [],
      getTitleTopYs: null,
      // currentIndex: 0,
      // message: "",
      // isShow: false
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.query.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      // 1. 获取顶部轮播图片
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 4.获取详细信息
      this.detailInfo = data.detailInfo;
      // 5.获取参数信息
      this.paramInfo = new GoodsPram(data.itemParams.info, data.itemParams.rule);
      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      /*
      // 1.第一次获取，值不对
      // 原因: this.$refs.param.$el 还没有被渲染
      // this.titleTopYs = [];
      // this.titleTopYs.push(0);
      // this.titleTopYs.push(this.$refs.param.$el.offsetTop);
      // this.titleTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.titleTopYs.push(this.$refs.recommend.$el.offsetTop);
      //
      // console.log(this.titleTopYs);

      this.$nextTick(() => {
        // 2.第二次获取，值不对
        // 原因: 图片没有计算在内
        // 根据最新的数据，对应的DOM已经被渲染出来了
        // 但是图片依旧没加载完，目前获取到的 offsetTop 不包含图片
        // offsetTop 值不对的时候，都是图片的问题
        this.titleTopYs = [];
        this.titleTopYs.push(0);
        this.titleTopYs.push(this.$refs.param.$el.offsetTop);
        this.titleTopYs.push(this.$refs.comment.$el.offsetTop);
        this.titleTopYs.push(this.$refs.recommend.$el.offsetTop);

        console.log(this.titleTopYs);
      })
      */
    });
    // 3.请求详情数据
    getRecommend().then(res => {
      this.recommendList = res.data.list;
    });
    // 4.给getTitleTopY赋值，并设置防抖
    this.getTitleTopYs = debounce(() => {
      this.titleTopYs = [];
      this.titleTopYs.push(0);
      this.titleTopYs.push(this.$refs.param.$el.offsetTop);
      this.titleTopYs.push(this.$refs.comment.$el.offsetTop);
      this.titleTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.titleTopYs.push(Number.MAX_VALUE);

      // console.log(this.titleTopYs);
    }, 200);
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener);
  },
  methods: {
    // 导入vuex的Actions
    ...mapActions({
      "addCart": "addCart"
    }),
    detailImageLoad() {
      this.refresh();
      this.getTitleTopYs();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.titleTopYs[index], 500);
    },
    contentScroll(position) {
      let positionY = -position.y;
      let length = this.titleTopYs.length;

      // if else 判断
      // if (positionY < this.titleTopYs[1]) {
      //   this.$refs.navbar.currentIndex = 0;
      // } else if (positionY >= this.titleTopYs[1] && positionY < this.titleTopYs[2]) {
      //   this.$refs.navbar.currentIndex = 1;
      // } else if (positionY >= this.titleTopYs[2] && positionY < this.titleTopYs[3]) {
      //   this.$refs.navbar.currentIndex = 2;
      // } else {
      //   this.$refs.navbar.currentIndex = 3;
      // }

      // 循环判断 两种情况：在两个值之间，大于最后一个值
      // for (let i = 0; i < length; i++) {
      //   if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.titleTopYs[i] && positionY < this.titleTopYs[i + 1])
      //     || (i === length - 1 && positionY >= this.titleTopYs[i]))) {
      //     this.currentIndex = i;
      //     console.log(this.currentIndex);
      //     this.$refs.navbar.currentIndex = this.currentIndex;
      //   }
      // }

      // 优化上一个实现：在 titleTopYs 最后加上一个最大值 Number.MAX_VALUE
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.titleTopYs[i] && positionY < this.titleTopYs[i + 1])) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }

      // 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE;
    },
    addToCart() {
      // 1.获取购物车需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 2.将商品添加到购物车
      // this.$store.commit('addCart', product);
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
      this.addCart(product).then(res => {
        // this.message = res;
        // this.isShow = true;
        // setTimeout(() => {
        //   this.isShow = false
        // }, 1500);

        this.$toast.show(res, 2000);

      });
    }
  }
}
</script>

<style scoped>

#detail {
  height: 100vh;
  position: relative;
  z-index: 10;
  background-color: #fff;
}

.content {
  position: absolute;
  left: 0;
  top: 44px;
  overflow: hidden;
  background-color: #fff;
  height: calc(100% - 44px - 49px);
}

</style>
