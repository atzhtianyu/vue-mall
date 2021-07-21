<template>
  <div class="bottom-bar">
    <div class="select-all">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="selectAll">
      </check-button>
      <span>全选</span>
    </div>
    <div class="totalPrice">
      合计: <span class="price">{{ totalPrice }}</span>
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
      return "￥" + this.cartList.filter(item => {
        return item.checked;
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count;
      }, 0).toFixed(2);
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;

      // 1.使用filter
      // return !(this.cartList.filter(item => !item.checked).length);

      // 2.使用find
      return !this.cartList.find(item => !item.checked);

      // 3.使用迭代
      // this.cartList.forEach(item => {
      //   if (!item.checked) {
      //     return false;
      //   }
      // });
      // return true;
    }
  },
  methods: {
    selectAll() {
      if (!this.isSelectAll) {
        this.cartList.forEach(item => {
          item.checked = true;
        });
      } else {
        this.cartList.forEach(item => {
          item.checked = false;
        });
      }
    },
    calcClick() {
      if (!this.cartList.find(item => item.checked)) {
        this.$toast.show('请选择要购买的商品', 2000);
      }
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
  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
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
  background-color: orangered;
  text-align: center;
  color: #fff;
}

</style>
