<template>
  <main>
    <n-gradient-text type="info" class="examName"> 测试一 </n-gradient-text>

    <n-grid x-gap="12" :cols="6" class="base">
      <n-gi class="base-info">
        <span>总分：100</span>
        <span>考试人数：2/3</span>
        <span>平均分：2/3</span>
        <span>最高分：2/3</span>
        <span>最低分：2/3</span>
      </n-gi>

      <n-gi :span="5">
        <v-chart class="gradeChart" :option="gradeOption" autoresize />
      </n-gi>
    </n-grid>

    <!-- <n-divider title-placement="left">基本信息</n-divider> -->
    <!-- 
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
    <v-chart class="gradeChart" :option="gradeOption" autoresize /> -->

    <!-- <n-divider title-placement="left"> 题目分析</n-divider> -->
    <section>
      <n-grid x-gap="12" :cols="4" class="question">
        <n-gi :span="3">
          <div>123</div>
        </n-gi>
        <n-gi>
          <div class="accuracy">
            <span>正确率</span>
            <n-progress
              type="circle"
              :percentage="accuracy"
              :color="themeVars.successColor"
              :rail-color="changeColor(themeVars.successColor, { alpha: 0.2 })"
              :indicator-text-color="themeVars.successColor"
            />
          </div>
        </n-gi>
      </n-grid>
    </section>
  </main>
</template>

<script setup>
import { NDivider, NGrid, NGi, NGradientText, NProgress } from 'naive-ui';
import { changeColor } from 'seemly';
import { useThemeVars } from 'naive-ui';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

const themeVars = useThemeVars();

use([CanvasRenderer, TooltipComponent, GridComponent, BarChart]);

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

const accuracy = ref(30);
</script>

<style lang="scss">
main {
  padding: 35px 120px;

  .examName {
    display: block;
    margin-bottom: 48px;
    font-size: 48px;
    font-weight: bolder;
    text-align: center;
    letter-spacing: 8px;
  }

  .base {
    margin-bottom: 48px;

    .base-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-radius: 25px;

      > * {
        margin: 8px 0;
        font-size: 18px;
        font-weight: bolder;
      }
    }

    .gradeChart {
      height: 480px;
      background-color: #fff;
      border-radius: 25px;
    }
  }

  .question {
    box-sizing: border-box;
    align-items: center;
    margin: 8px 0;
    padding: 25px 35px;
    height: 280px;

    background-color: #fff;
    border-radius: 25px;

    .accuracy {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        margin-bottom: 8px;
        font-size: 16px;
      }
    }
  }
}
</style>