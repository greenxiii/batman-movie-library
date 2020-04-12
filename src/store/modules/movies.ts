import MovieService from '@/services/MovieService';
import {
  Module,
  GetterTree,
  ActionTree,
  MutationTree,
} from 'vuex';
import {
  MovieState,
  RootState,
  Movie,
  MovieDetail,
} from '../../services/types';

const getters: GetterTree<MovieState, RootState> = {
  movieList(state): Movie[] {
    return state.movieList;
  },
  movieDetails(state): MovieDetail {
    return state.movieDetails;
  },
};

const actions: ActionTree<MovieState, RootState> = {
  async fetchMovieList({ commit, state, rootState }): Promise<void> {
    if (rootState.user && rootState.user.user && rootState.user.user.apiToken) {
      const { apiToken } = rootState.user.user;
      const { result } = await MovieService.movieService.getMovieList(
        apiToken,
        state.page,
        state.type,
        state.year,
      );
      commit('movieListLoaded', result || []);
    }
  },
  async fetchNextMovieListPage({ commit, state, dispatch }): Promise<void> {
    const newPage = state.page + 1;
    commit('setPage', newPage);
    return dispatch('fetchMovieList');
  },
  async fetchMovieDetails({ commit, rootState }, movieId: string): Promise<void> {
    if (rootState.user && rootState.user.user && rootState.user.user.apiToken) {
      const { apiToken } = rootState.user.user;
      const result = await MovieService.movieService.getSpecificMovie(apiToken, movieId);
      commit('movieDetailsLoaded', result);
    }
  },
  setYear({ commit, dispatch }, payload): void {
    commit('setYear', payload);
    dispatch('filterUpdate');
  },
  setType({ commit, dispatch }, payload): void {
    commit('setType', payload);
    dispatch('filterUpdate');
  },
  filterUpdate({ commit, dispatch }): void {
    commit('movieListReset');
    commit('setPage', 1);
    dispatch('fetchMovieList');
  },

  async clearMovieList({ commit }): Promise<void> {
    commit('movieListReset');
    commit('setPage', 1);
    commit('setYear', null);
    commit('setType', null);
  },
  async clearMovieDetails({ commit }): Promise<void> {
    commit('movieDetailsLoaded', {});
  },
};

const mutations: MutationTree<MovieState> = {
  movieListLoaded(state, payload: Movie[]) {
    state.movieList = state.movieList.concat(payload);
  },
  movieListReset(state) {
    state.movieList = [];
  },
  movieDetailsLoaded(state, payload: MovieDetail) {
    state.movieDetails = payload;
  },
  setPage(state, payload: number) {
    state.page = payload;
  },
  setYear(state, payload: number | null) {
    state.year = payload;
  },
  setType(state, payload: string | null) {
    state.type = payload;
  },
};

const state: MovieState = {
  movieList: [] as Movie[],
  movieDetails: {} as MovieDetail,
  page: 1,
  type: null,
  year: null,
};

const user: Module<MovieState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

export default user;
