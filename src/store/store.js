import Vue from 'vue';
import Vuex from 'vuex';
import root from './root-store';
import np from  './NameParade/nameparade-store'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    root,
    np
  }
})