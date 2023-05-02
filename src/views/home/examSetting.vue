<template>
  <div>
    <n-gradient-text type='info' class='title'>
      考试管理
    </n-gradient-text>

    <main>
      <nav>
        <n-button type='info'>
          创建新考试
        </n-button>
      </nav>

      <n-divider title-placement='left' class='subtitle'>
        活跃的考试
      </n-divider>

      <n-divider title-placement='left' class='subtitle'>
        已结束的考试
      </n-divider>
    </main>
  </div>
</template>

<script setup>
import { NDivider, NGradientText, NButton } from 'naive-ui'


</script>

<style lang='scss' scoped>

main {
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;

  nav {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.title {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 30px;
  font-weight: 600;
}

.subtitle {
  margin-top: 20px;
  margin-left: 20px;
  font-weight: 600;
  opacity: 0.6;
}

</style>