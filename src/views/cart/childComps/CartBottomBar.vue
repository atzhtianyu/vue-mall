<template>
  <div class="bottom-bar">
    <div class="select-all">
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div class="totalPrice">
      合计: <span class="price">￥{{ totalPrice }}</span>
    </div>
    <div class="calculate">
      去计算({{ checkLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

import {mapGetters} from "vuex";

export default {
  name: "CartBottomBar",
  components: {CheckButton},
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => {
        return item.checked;
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count;
      }, 0).toFixed(2);
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    }
  }
}
</script>

<style scoped>

.bottom-bar {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;

  height: 40px;
  line-height: 40px;

  background-color: #eee;
}

.select-all {
  width: 16%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.totalPrice {
  margin-left: auto;
}

.price {
  flex: 1;
  font-size: 22px;
  color: var(--color-high-text);
}

.calculate {
  margin-left: auto;
  width: 90px;
  background-color: var(--color-tint);
  text-align: center;
  color: #fff;
}

</style>
