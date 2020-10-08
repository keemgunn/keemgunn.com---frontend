import Vue from 'vue';
import store from './store/store';
import router  from './router';
import Index from './Index.vue';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(Index)
}).$mount('#index')