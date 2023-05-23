<template>
  <main>
    <n-gradient-text type='info' class='examName'>{{ examSummary.examName}}</n-gradient-text>
    <section>
      <n-grid x-gap='12' :cols='6' class='base'>
        <n-gi class='base-info'>
          <span>总分：{{ examSummary.totalScore }}</span>
          <span>考试人数：{{ examSummary.submitCount }}/{{ examSummary.totalCount }}</span>
          <span>平均分：{{ examSummary.avgScore }}</span>
          <span>最高分：{{ examSummary.maxScore }}</span>
          <span>最低分：{{ examSummary.minScore }}</span>
        </n-gi>

        <n-gi :span='4'>
          <v-chart class='gradeChart' :option='gradeOption' autoresize />
        </n-gi>

        <n-gi class='rank'>
          <n-scrollbar style='max-height: 415px'>
            <n-space
              class='rank_item'
              justify='space-between'
              v-for='item in 30'
              :style="item === 1 ? `color:${themeVars.primaryColor};` : ''"
            ><span>用户{{ item }}</span>
              <div class='rank_grade'>
                <span>60</span>
                <n-progress
                  type='line'
                  :show-indicator='false'
                  status='info'
                  :percentage='60'
                  rail-style='height:3px'
                />
              </div>
            </n-space>
          </n-scrollbar>
        </n-gi>
      </n-grid>
    </section>
    <section>
      <n-grid x-gap='12' :cols='4' class='question' v-for='(item,index) in questionList' :key='index'>
        <n-gi :span='3'>
          <div>
            <!-- TODO: 添加题目显示 -->
            <question-block :question-value='item'></question-block>
          </div>
        </n-gi>
        <n-gi>
          <div class='accuracy'>
            <span class='title'>正确率</span>
            <n-progress
              type='circle'
              :percentage='item.accuracy'
              :color='getColor(item.accuracy)'
              :rail-color='changeColor(getColor(item.accuracy ), { alpha: 0.2 })'
              :indicator-text-color='getColor(item.accuracy )'
            />
          </div>
        </n-gi>
      </n-grid>
    </section>
  </main>
</template>

<script setup>
import {
  NGrid,
  NGi,
  NGradientText,
  NProgress,
  NSpace,
  NScrollbar
} from 'naive-ui'
import { changeColor } from 'seemly'
import { useThemeVars } from 'naive-ui'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide, computed } from 'vue'
import { getExamResultSummary } from '../apis/paper.js'
import QuestionBlock from '../components/questionBlock.vue'

const themeVars = useThemeVars()

use([
  CanvasRenderer,
  TooltipComponent,
  TitleComponent,
  GridComponent,
  BarChart
])

provide(THEME_KEY, 'light')

const examSummary = ref()

const questionList = ref()

const getData = () => {
  getExamResultSummary(40).then(res => {
    examSummary.value = {
      examName: res.data.paper.paperName,
      totalScore: res.data.paper.totalScore,
      maxScore: res.data.paperInfo.maxScore,
      minScore: res.data.paperInfo.minScore,
      avgScore: res.data.paperInfo.avgScore,
      submitCount: res.data.paperInfo.submitCount,
      totalCount: res.data.paperInfo.count
    }
    console.log(examSummary.value)

    questionList.value = res.data.questionAccuracy.map(item => {
      return {
        ...item.question,
        accuracy: item.accuracy * 100,
        options: item.options
      }
    })

    console.log(questionList.value)
  })
}

getData()

const getColor = (val) => {
  if (val < 50) {
    return themeVars.value.errorColor
  } else if (val < 70) {
    return themeVars.value.warningColor
  } else {
    return themeVars.value.successColor
  }
}

const gradeOption = ref({
  title: {
    text: '成绩分布图',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    name: '分数',
    data: ['0-59', '60-69', '70-79', '80-89', '90-100']
  },
  yAxis: {
    type: 'value',
    name: '人数'
  },
  series: [
    {
      data: [2, 12, 14, 23, 12],
      type: 'bar'
    }
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    backgroundColor: '#fff', // 悬浮框背景色
    borderColor: '#000', // 悬浮框边框颜色
    borderWidth: 1, // 悬浮框边框宽度
    textStyle: {
      // 悬浮框文字样式
      color: '#000',
      fontSize: 12
    }
  }
})


</script>

<style lang='scss'>
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
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

    background-color: #fff;
    border-radius: 25px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

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
