<template>
  <div class="home">
    <div class="left">
      <side-bar></side-bar>
    </div>
    <div class="right">
      <main class="main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import sideBar from '../components/sideBar.vue';
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .left {
    position: relative;
    width: 14%;
    height: 100%;

    &::after {
      content: '';
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);

      width: 3px;
      height: 90%;
      border-radius: 20px;
      background-color: #fff;
    }
  }

  .right {
    flex-grow: 1;
    height: 100vh;
  }

  .main {
    padding: 30px 50px;
    overflow: scroll;
    height: 100%;
  }
}
</style>
