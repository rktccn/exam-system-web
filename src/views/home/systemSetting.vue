<template xmlns='http://www.w3.org/1999/html'>

  <div>
    <n-gradient-text type='info' class='title'>
      系统设置
    </n-gradient-text>

    <n-divider title-placement='left' class='subtitle'>
      数据看板
    </n-divider>


    <div class='static_list'>

      <span class='static_card'>
      <n-card>
        <n-statistic label='学生用户'>
          1,234,123
        </n-statistic>
      </n-card>
    </span>

      <span class='static_card'>
      <n-card>
        <n-statistic label='教师用户'>
          1,234,123
        </n-statistic>
      </n-card>
      </span>

      <span class='static_card'>
      <n-card>
        <n-statistic label='试卷数量'>
          1,234,123
        </n-statistic>
      </n-card>
      </span>
    </div>
    <n-divider title-placement='left' class='subtitle'>
      用户设置
    </n-divider>
    <n-card content-style='padding: 0;'>
      <n-tabs
        type='line'
        size='large'
        :tabs-padding='20'
        pane-style='padding: 20px;'
      >
        <n-tab-pane name='用户设置'>
          PARKLIFE
        </n-tab-pane>
        <n-tab-pane name='教师-学生关联设置'>
          ROCKLIFE
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>

</template>

<script setup>
import { NDivider, NGradientText, NTabs, NTabPane, NCard, NStatistic } from 'naive-ui'

</script>

<style lang='scss' scoped>

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


.static_list {
  display: flex;

  .static_card {
    flex: 1;
    padding: 0 8px;
  }
}

</style>