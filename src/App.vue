<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  html{
    height: 100%;
    background: url("./assets/MSK_Raduga_Photo_blured_str.jpg") fixed center;
    background-size: cover;

    &::after{

    }
    *{
      box-sizing: border-box;
      padding: 0; margin: 0;
    }
    body{
      height: 100%;

      #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #fcfffc;
        overflow-y: auto;
        background-color: rgba(174, 176, 180, 0.65);
        min-height: 100%;
      }

      #nav {
        padding: 30px;

        a {
          font-weight: bold;
          color: #2c3e50;

          &.router-link-exact-active {
            color: #42b983;
          }
        }
      }
    }
  }
</style>
