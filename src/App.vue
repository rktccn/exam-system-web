<template>
  <n-config-provider :locale='zhCN' :date-locale='dateZhCN'>

    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { NMessageProvider,NConfigProvider } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'

</script>

<style scss>
body {
    background-color: #e9eff9;
}
</style>
