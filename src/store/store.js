import Vue from 'vue';
import Vuex from 'vuex';
import Index from './Index';
import NameParade from  './NameParade'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Index,
    NameParade
  }
})