<template>
  <div>
    <n-card title="根据上述资料，以下说法中不正确的是（）" size="large">
      <template #header-extra>
        <span class="subtitle">
          <n-tag :bordered="false" type="info"> 单选题 </n-tag>
        </span>
      </template>
      <p>A. 企业的生产经营活动是在一定的生产条件下进行的</p>
      <p>B. 企业的生产经营活动是在一定的生产条件下进行的</p>
      <p>C. 企业的生产经营活动是在一定的生产条件下进行的</p>
      <p>D. 企业的生产经营活动是在一定的生产条件下进行的</p>

      <template #action>
        <span>参考答案：C</span>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { NCard, NTag } from 'naive-ui';
</script>

<style lang="scss" scoped>
.subtitle {
  margin-top: 20px;
  margin-left: 20px;
  font-weight: 600;
  opacity: 0.6;
  color: #2080f0;
}
</style>
