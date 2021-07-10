<template>
  <div class="cart">
    <!--顶部导航-->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list></cart-list>
    <!--底部汇总-->
  </div>
</template>

<script>
import CartList from "@/views/cart/childComps/CartList";

import NavBar from "@/components/common/navbar/NavBar";

import {mapGetters} from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(['cartLength'])

    // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
    // ...mapGetters({ count: 'cartLength' })
  }
}
</script>

<style scoped>

.cart-nav-bar {
  color: white;
  background-color: var(--color-tint);
  font-size: 20px;
  line-height: 44px;
}

</style>
