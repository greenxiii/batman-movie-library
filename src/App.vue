<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
    a {
      text-transform: uppercase;
      font-weight: bold;
      color: #000;

      &.router-link-exact-active {
        color: #000;
      }
    }
  }

  .home-card {
    width: 400px;
    margin: 70px auto;
    padding: 60px 20px 20px;
    background: #f7f7f7;
    border: 2px solid #000;
    box-shadow: 2px 8px 20px -12px rgba(0, 0, 0, 1);
    border-radius: 20px;
    position: relative;
    .logo-wrapper {
      position: absolute;
      top: -60px;
      left: calc(50% - 60px);
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid #000;
      background: yellow;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 80%;
      }
    }
  }
  .separator {
    height: 1px;
    margin: 10px auto;
    width: 70%;
    background: linear-gradient(to left, transparent, #000, transparent);
  }
</style>
