import Vue from 'vue';
import Vuex from 'vuex';

import mutations from "@/store/mutations";
import actions from "@/store/actions";

// 1.安装vuex
Vue.use(Vuex);

const state = {
  cartList: [],
}

// 2.创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions
});

// 3.导出store
export default store;
