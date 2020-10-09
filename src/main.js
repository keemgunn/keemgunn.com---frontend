import Vue from 'vue';
import store from './store/store';
import router  from './router';
import Index from './Index.vue';
import titleMixin from './api/titleMixin';

Vue.config.productionTip = false;
Vue.mixin(titleMixin);

new Vue({
  store,
  router,
  render: h => h(Index)
}).$mount('#index')