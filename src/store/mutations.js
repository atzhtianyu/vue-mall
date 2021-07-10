import {ADD_COUNTER, ADD_TO_CART} from "@/store/mutation-types";

export default {
  // mutations 里边最好只用来改变 state 的值
  // 这里的 addCart 既用于加入新商品又用于旧的商品加一
  // 所以最好将这个操作放到 action 里边
  // addCart(state, payload) {
  //   // payLoad 新添加的商品
  //   // 方法一：
  //   // let good = null;
  //   // for (let item of state.cartList) {
  //   //   if (payload.iid === item.iid) {
  //   //     good = item;
  //   //   }
  //   // }
  //
  //   // 方法二：
  //   // let index = state.cartList.indexOf(payload);
  //
  //   // 方法三：
  //   let good = state.cartList.find(item => item.iid === payload.iid);
  //
  //   // 判断 good
  //   if (good) {
  //     good.count += 1;
  //   } else {
  //     payload.count = 1;
  //     state.cartList.push(payload);
  //   }
  // }

  // mutation中的每一个事件完成的事务尽量比较单一
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
  }
}
