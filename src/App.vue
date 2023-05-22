<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="themeOverrides"
  >
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { NMessageProvider, NConfigProvider } from 'naive-ui';
import { zhCN, dateZhCN } from 'naive-ui';

const themeOverrides = {
  common: {
    primaryColor: '#2080f0',
    primaryColorHover: '#408FED',
  },
  Divider: {
    color: 'rgba(31, 34, 37, 0.2)',
  },
};
</script>

<style scss>
body {
  background-color: #e9eff9;
}
</style>
