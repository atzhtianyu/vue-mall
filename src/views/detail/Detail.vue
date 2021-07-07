<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info :recommend-list="recommendList"></detail-recommend-info>
    </scroll>
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

import Scroll from "@/components/common/scroll/Scroll";

import {getDetail, getRecommend, Goods, Shop, GoodsPram} from "@/network/detail";
import {itemListenerMixin} from "@/common/mixin";

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
    Scroll
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: []
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
    });
    // 3. 请求详情数据
    getRecommend().then(res => {
      this.recommendList = res.data.list;
    })
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener);
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
  background-color: #fff;
  height: calc(100% - 44px);
}

</style>
