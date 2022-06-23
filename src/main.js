import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 引入 element ui 组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from './store'
Vue.use(ElementUI); //注册element 组件
Vue.config.productionTip = false;
//引入公共样式
require("./assets/public.css");

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
