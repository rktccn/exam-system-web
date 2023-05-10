<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>

<script setup>
import { NMessageProvider } from 'naive-ui';
</script>

<style scss>
body {
  background-color: #e9eff9;
}
</style>
