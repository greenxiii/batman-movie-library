<template>
  <router-link class="item" :to="`/movies/${movie.imdbID}`">
    <div>
      {{ movie.Title }}
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import { Movie } from '@/services/types';

export default Vue.extend({
  name: 'MovieListItem',
  props: {
    movie: {
      type: Object,
    } as PropOptions<Movie>,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .item {
    padding: 4px 10px;
    display: block;
    text-align: left;
    text-transform: uppercase;
    color: #000;
    text-decoration: none;
    font-size: 14px;
    transition: all .25s;
    &:hover {
      background: yellow;
      font-weight: 800;
    }
  }
</style>
