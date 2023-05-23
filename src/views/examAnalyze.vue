<template>
  <main>
    <n-gradient-text type="info" class="examName"> 测试一 </n-gradient-text>
    <section>
      <n-grid x-gap="12" :cols="6" class="base">
        <n-gi class="base-info">
          <span>总分：100</span>
          <span>考试人数：2/3</span>
          <span>平均分：30</span>
          <span>最高分：70</span>
          <span>最低分：15</span>
        </n-gi>

        <n-gi :span="4">
          <v-chart class="gradeChart" :option="gradeOption" autoresize />
        </n-gi>

        <n-gi class="rank">
          <n-scrollbar style="max-height: 415px">
            <n-space
              class="rank_item"
              justify="space-between"
              v-for="item in 30"
              :style="item === 1 ? `color:${themeVars.primaryColor};` : ''"
              ><span>用户{{ item }}</span>
              <div class="rank_grade">
                <span>60</span>
                <n-progress
                  type="line"
                  :show-indicator="false"
                  status="info"
                  :percentage="60"
                  rail-style="height:3px"
                />
              </div>
            </n-space>
          </n-scrollbar>
        </n-gi>
      </n-grid>
    </section>
    <section>
      <n-grid x-gap="12" :cols="4" class="question">
        <n-gi :span="3">
          <div>
            <!-- TODO: 添加题目显示 -->
          </div>
        </n-gi>
        <n-gi>
          <div class="accuracy">
            <span class="title">正确率</span>
            <n-progress
              type="circle"
              :percentage="accuracy"
              :color="accuracyColor"
              :rail-color="changeColor(accuracyColor, { alpha: 0.2 })"
              :indicator-text-color="accuracyColor"
            />
          </div>
        </n-gi>
      </n-grid>
    </section>
  </main>
</template>

<script setup>
import {
  NDivider,
  NGrid,
  NGi,
  NGradientText,
  NProgress,
  NSpace,
  NScrollbar,
} from 'naive-ui';
import { changeColor } from 'seemly';
import { useThemeVars } from 'naive-ui';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, computed } from 'vue';

const themeVars = useThemeVars();

use([
  CanvasRenderer,
  TooltipComponent,
  TitleComponent,
  GridComponent,
  BarChart,
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

const accuracy = ref(30);
const accuracyColor = computed(() => {
  if (accuracy.value < 50) {
    return themeVars.value.errorColor;
  } else if (accuracy.value < 70) {
    return themeVars.value.warningColor;
  } else {
    return themeVars.value.successColor;
  }
});
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

    > * {
      background-color: #fff;
      border-radius: 25px;
    }

    .base-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > * {
        margin: 8px 0;
        font-size: 18px;
        font-weight: bolder;
      }
    }

    .rank {
      padding: 45px 25px;
      font-size: 18px;
      font-weight: bolder;

      .rank_item:first-child {
        margin-bottom: 16px;
      }

      .rank_item {
        margin-bottom: 8px;
        padding: 0 40px;
      }

      .rank_grade {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .gradeChart {
      height: 480px;
      padding-top: 25px;
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

      .title {
        margin-bottom: 8px;
        font-size: 16px;
      }
    }
  }
}
</style>
