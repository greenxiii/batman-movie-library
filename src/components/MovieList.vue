<template>
  <div>
    <div class="filter-tools">
      <div>
        <label for="type">Type</label>
        <select id="type" @change="changeType($event.target.value)">
          <option :value="null">All</option>
          <option value="series">Series</option>
          <option value="movie">Movies</option>
          <option value="episode">Episode</option>
        </select>
      </div>
      <div>
        <label for="year">Year</label>
        <input id="year" type="number" @change="changeYear($event.target.value)"/>
      </div>
    </div>
    <div class="movie-list">
      <MovieListItem
        v-for="movie in movies"
        :key="movie.imdbID"
        :movie="movie"
      />
    </div>
    <div class="separator"/>
    <div class="load-more" v-if="movies && movies.length > 0" @click="loadMore">load more</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import MovieListItem from './MovieListItem.vue';

export default Vue.extend({
  name: 'MovieList',
  async mounted() {
    await this.loadMovies();
  },
  methods: {
    ...mapActions({
      loadMovies: 'movies/fetchMovieList',
      loadMore: 'movies/fetchNextMovieListPage',
      clearMovieList: 'movies/clearMovieList',
      setType: 'movies/setType',
      setYear: 'movies/setYear',
    }),
    changeType(type: string) {
      this.setType(type);
    },
    changeYear(year: number) {
      this.setYear(year);
    },
  },
  components: {
    MovieListItem,
  },
  computed: {
    ...mapGetters({
      apiToken: 'user/apiToken',
      movies: 'movies/movieList',
    }),
  },
  beforeDestroy() {
    this.clearMovieList();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .filter-tools {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    label {
      font-size: 10px;
      margin-right: 10px;
    }
  }
  .movie-list {
    height: 200px;
    overflow: auto;
    margin-bottom: 20px;
  }
  .load-more {
    border: 1px solid #000;
    display: inline-block;
    margin: 10px 0;
    padding: 4px 10px;
    cursor: pointer;
    color: #000;
    transition: all .25s;
    &:hover {
      background: yellow;
    }
  }
</style>
