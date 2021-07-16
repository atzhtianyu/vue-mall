import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import store from "@/store";
import toast from '@/components/common/toast';
import VueLazyload from "vue-lazyload";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faAngleRight);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

// 使用事件总线 bus 解决 BScroll 的小 bug
Vue.prototype.$bus = new Vue();

// 安装toast插件
Vue.use(toast);

Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
