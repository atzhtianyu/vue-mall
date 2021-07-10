import {ADD_COUNTER, ADD_TO_CART} from "@/store/mutation-types";

export default {
  addCart(context, payload) {
    let good = context.state.cartList.find(item => item.iid === payload.iid);

    // 判断 good
    if (good) {
      context.commit(ADD_COUNTER, good);
    } else {
      payload.count = 1;
      payload.checked = true;
      context.commit(ADD_TO_CART, payload);
    }
  }
}
