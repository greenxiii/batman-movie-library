<template>
  <div class="home-card movie-view">
    <div class="logo-wrapper">
      <img alt="Batman logo" src="../assets/logo.png" />
    </div>
    <div class="header">
      <img :src="movieDetails.Poster">
      <div>
        <h1>{{movieDetails.Title}}</h1>
        <div class="filtered-values">
          <div>{{movieDetails.Year}}</div>
          <div>{{movieDetails.Type}}</div>
        </div>
        <div class="actors">{{movieDetails.Actors}}</div>
      </div>
    </div>
    <div class="separator"/>
    <div class="plot">{{movieDetails.Plot}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  name: 'MovieView',
  async mounted() {
    if (this.$route && this.$route.params && this.$route.params.movieId) {
      await this.fetchMovieDetails(this.$route.params.movieId);
    }
  },
  beforeDestroy() {
    this.clearMovieDetails();
  },
  computed: {
    ...mapGetters({
      apiToken: 'user/apiToken',
      movieDetails: 'movies/movieDetails',
    }),
  },
  methods: {
    ...mapActions({
      fetchMovieDetails: 'movies/fetchMovieDetails',
      clearMovieDetails: 'movies/clearMovieDetails',
    }),
  },

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .movie-view {
    .header {
      display: flex;
      padding: 30px 20px 10px;
      text-align: left;
      img { height: 200px }
      h1 {
        padding: 0 10px;
        margin: 0;
        text-transform: uppercase;
        font-size: 20px;
      }
      .actors {
        font-size: 14px;
        padding: 10px;
      }
      .filtered-values {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 800;
        margin: 10px 0;
      }
    }
    .plot {
      padding: 10px 20px 20px;
      text-align: justify;
    }
  }
</style>
