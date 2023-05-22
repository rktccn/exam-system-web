<template>
  <main>
    <n-gradient-text type="info" class="examName"> 测试一 </n-gradient-text>

    <n-divider title-placement="left">基本信息</n-divider>

    <div class="base-info">
      <n-grid x-gap="10" :cols="5">
        <n-gi>
          <span>总分：100</span>
        </n-gi>
        <n-gi>
          <span>考试人数：2/3</span>
        </n-gi>
        <n-gi>
          <span>平均分：2/3</span>
        </n-gi>
        <n-gi>
          <span>最高分：2/3</span>
        </n-gi>
        <n-gi>
          <span>最低分：2/3</span>
        </n-gi>
      </n-grid>
    </div>

    <n-divider title-placement="left">成绩分布</n-divider>
    <v-chart class="gradeChart" :option="gradeOption" autoresize />

    <n-divider title-placement="left"> 题目分析</n-divider>
    <section>
      <n-grid x-gap="12" :cols="4" class="question">
        <n-gi :span="3">
          <div>123</div>
        </n-gi>
        <n-gi>
          <v-chart class="accuracyChart" :option="accuracyOption" autoresize />
        </n-gi>
      </n-grid>
    </section>
  </main>
</template>

<script setup>
import { NDivider, NGrid, NGi, NGradientText } from 'naive-ui';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

use([
  CanvasRenderer,
  TooltipComponent,
  GridComponent,
  TitleComponent,
  BarChart,
  PieChart,
]);

provide(THEME_KEY, 'light');

const gradeOption = ref({
  title: {
    text: '成绩分布图',
    left: 'center',
  },
  xAxis: {
    type: 'category',
    name: '分数',
    data: ['0-59', '60-69', '70-79', '80-89', '90-100'],
  },
  yAxis: {
    type: 'value',
    name: '人数',
  },
  series: [
    {
      data: [2, 12, 14, 23, 12],
      type: 'bar',
    },
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    backgroundColor: '#fff', // 悬浮框背景色
    borderColor: '#000', // 悬浮框边框颜色
    borderWidth: 1, // 悬浮框边框宽度
    textStyle: {
      // 悬浮框文字样式
      color: '#000',
      fontSize: 12,
    },
  },
});

const accuracyOption = ref({
  title: {
    text: '正确率',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '正确' },
        { value: 735, name: '错误' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});
</script>

<style lang="scss">
main {
  padding: 35px 80px;

  .examName {
    display: block;
    font-size: 48px;
    font-weight: bolder;
    text-align: center;
    letter-spacing: 8px;
  }

  .question {
    height: 280px;
  }
}

.gradeChart {
  height: 480px;
}

.accuracyChart {
  height: 100%;
}
</style>
