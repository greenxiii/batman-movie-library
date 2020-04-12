import Vue from 'vue';
import Vuex from 'vuex';
import moviesModule from './modules/movies';
import userModule from './modules/user';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    user: userModule,
    movies: moviesModule,
  },
});
