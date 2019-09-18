import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueDragDrop from 'vue-drag-drop';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';
import router from './router/index';

Vue.use(VueDragDrop);
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
