import Vue from 'vue';
import store from './store';
import router  from './router';
import Index from './Index.vue';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(Index),
  router,
}).$mount('#index')