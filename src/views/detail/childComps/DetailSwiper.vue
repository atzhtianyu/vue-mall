<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, key) in topImages" :key="key">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

.detail-swiper {
  height: 400px;
}

</style>
