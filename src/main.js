import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false

// 使用事件总线 bus 解决 BScroll 的小 bug
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
