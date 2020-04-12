import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { Store } from 'vuex';
import moviesModule from '@/store/modules/movies';
import userModule from '@/store/modules/user';


const getMovieList = jest.fn();
jest.mock('@/services/MovieService', () => {
  class MovieServiceMock {
    public async getMovieList(token: string, page: number, type: string | null, year: number | null) {
      getMovieList(page);
      return {
        result: [1],
      };
    }
  }
  const movieServiceMock = new MovieServiceMock();
  return { movieService: movieServiceMock }
});

describe('movies.ts', () => {
  describe('actions', () => {
    let store: Store<any>;
    let localVue;

    beforeEach(() => {
      const localVue = createLocalVue();
      localVue.use(Vuex);
      store = new Vuex.Store({
        modules: {
          user: userModule,
          movies: moviesModule,
        },
      });
      store.dispatch('movies/clearMovieList');
    });

    it('Update page value on load more', () => {
      expect(store.state.movies.page).toBe(1);
      store.dispatch('movies/fetchNextMovieListPage');
      expect(store.state.movies.page).toBe(2);
      store.dispatch('movies/fetchNextMovieListPage');
      expect(store.state.movies.page).toBe(3);
    });

    it('Fetch method called with correct page number', () => {
      expect(store.state.movies.page).toBe(1);
      store.dispatch('movies/fetchNextMovieListPage');
      expect(getMovieList).toHaveBeenCalledWith(2);
      store.dispatch('movies/fetchNextMovieListPage');
      expect(getMovieList).toHaveBeenCalledWith(3);
    });

    it('MovieList is correctly concated', async () => {
      await store.dispatch('movies/fetchNextMovieListPage');
      expect(store.state.movies.movieList).toEqual([1]);
      await store.dispatch('movies/fetchNextMovieListPage');
      expect(store.state.movies.movieList).toEqual([1, 1]);
    });
  });
});
