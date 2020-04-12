<template>
  <div class="home-card">
    <div class="logo-wrapper">
      <img alt="Batman logo" src="../assets/logo.png" />
    </div>
    <HelloWorld :msg="`Hello ${userName}, which batman movie do you want to see?`"/>
    <MovieList />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';
import MovieList from '@/components/MovieList.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MovieList,
  },
  computed: {
    ...mapGetters({
      userName: 'user/name',
    }),
  },
};
</script>

<style scoped lang="scss">
</style>
