<template>
  <div class='home'>
    <div class='left'>
      <side-bar></side-bar>
    </div>
    <div class='right'>
      <main class='main'>
        <router-view>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import SideBar from '../components/sideBar.vue'

const route = useRoute()

</script>

<style lang='scss' scoped>
.home {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .left {
    flex-shrink: 0;
    position: relative;
    width: 14%;
    height: 100%;
    background-color: #fff;
    border-radius: 0 25px 25px 0;

    &::after {
      content: '';
      position: absolute;
      right: 0;
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
    overflow-y: scroll;
    height: 100%;
  }
}
</style>
