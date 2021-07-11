<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

import Scroll from "@/components/common/scroll/Scroll";

import {mapGetters} from 'vuex';

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>

.content {
  position: absolute;
  top: 44px;
  bottom: 89px;
  overflow: hidden;
  width: 100%;
}

</style>
