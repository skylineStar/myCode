
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import state from './rootState';

Vue.use(Vuex);

var store = new Vuex.Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

export default store;

//# sourceMappingURL=index-compiled.js.map