import {ADD_COUNTER, ADD_TO_CART} from "@/store/mutation-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve) => {
      // 查找之前数组中是否有该商品
      let good = context.state.cartList.find(item => item.iid === payload.iid);

      // 判断 good
      if (good) {
        // 商品数量加一
        context.commit(ADD_COUNTER, good);
        resolve("当前商品的数量加一");
      } else {
        // 添加新的商品
        payload.count = 1;
        payload.checked = true;
        context.commit(ADD_TO_CART, payload);
        resolve("添加了新的商品");
      }
    })
  }
}
