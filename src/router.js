import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import NameParade from './components/NameParade/NameParade.vue';
import Master from './components/NameParade/Master.vue';
import NotFound from './components/NotFound.vue';

Vue.use(Router)

export default new Router({
 mode: 'history',
 base: process.env.BASE_URL,
 routes: [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/nameparade',
    name: 'NameParade',
    component: NameParade
  },
  {
    path: '/nameparade/master',
    name: 'Master',
    component: Master
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
 ]
})