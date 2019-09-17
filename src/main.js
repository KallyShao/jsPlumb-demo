import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;
import VueDragDrop from 'vue-drag-drop';

Vue.use(VueDragDrop);

new Vue({
  render: h => h(App),
}).$mount('#app')
