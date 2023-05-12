<template>
  <div>
    <n-gradient-text type='info' class='title'> 考试管理</n-gradient-text>

    <main>
      <nav>
        <n-button type='info' @click='createExam'>
          创建新考试
        </n-button>

      </nav>

      <n-divider title-placement='left' class='subtitle'>
        活跃的考试
      </n-divider>


      <n-grid x-gap='12' :cols='4' :y-gap='8'>
        <n-gi>
          <exam-card />
        </n-gi>
        <n-gi>
          <exam-card />
        </n-gi>
        <n-gi>
          <exam-card />
        </n-gi>
        <n-gi>
          <exam-card />
        </n-gi>
        <n-gi>
          <exam-card />
        </n-gi>
        <n-gi>
          <exam-card />
        </n-gi>
        <n-gi>
          <exam-card />
        </n-gi>
        <n-gi>
          <exam-card />
        </n-gi>
        <n-gi>
          <exam-card />
        </n-gi>
        <n-gi>
          <exam-card />
        </n-gi>
        <n-gi>
          <exam-card />
        </n-gi>
      </n-grid>

      <n-divider title-placement='left' class='subtitle'>
        已结束的考试
      </n-divider>
    </main>

    <!--添加考试窗口-->
    <n-modal v-model:show='showModal' class='setExam'>
      <n-card
        style='width: 600px;'
        title='创建考试'
        :bordered='false'
        size='huge'
        aria-modal='true'
      >
        <pre>{{ examValue }}</pre>

        <p>考试名称</p>
        <n-input placeholder='输入考试名称' v-model:value='examValue.title'></n-input>
        <p>考试时间</p>
        <n-date-picker type='datetimerange' clearable v-model:value='examValue.timeRange' />
        <p>考试题目</p>
        <n-transfer ref='transfer' v-model:value='examValue.questions' :options='questionList' />
        <p>考试学生</p>
        <n-transfer ref='transfer' v-model:value='examValue.students' :options='studentList' />
        <p>考试属性</p>
        <n-grid x-gap='12' :cols='4' :y-gap='8' style='opacity: .7'>
          <n-gi>
            <span>时长：{{ duration }}</span>
          </n-gi>
          <n-gi>
            <span>考试人数：{{ examValue.students.length }}</span>
          </n-gi>
          <n-gi>
            <span>题目数量：{{ examValue.questions.length }}</span>
          </n-gi>
          <n-gi>
            <span>总分：{{ examValue.totalScore }}</span>
          </n-gi>
        </n-grid>

        <n-space justify='space-between' style='margin-top: 8px'>
          <n-button type='info'>取消</n-button>
          <n-button type='info' @click='submitExam'>确定</n-button>
        </n-space>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>

import {
  NDivider,
  NSpace,
  NGradientText,
  NButton,
  NGrid,
  NGi,
  NModal,
  NCard,
  NInput,
  NDatePicker,
  NTransfer
} from 'naive-ui'
import ExamCard from '../../components/examCard.vue'
import { computed, ref } from 'vue'
import { getQuestionList } from '../../apis/question.js'
import { getAllUser } from '../../apis/user.js'
import { createPaper, getPaperList } from '../../apis/paper.js'

const showModal = ref(false)

const examValueDefault = {
  title: '',
  timeRange: null,
  questions: [],
  students: [],
  totalScore: computed(() => {
    return questionList.value.reduce((total, item) => {
      if (examValue.value.questions.includes(item.value)) {
        return total + item.score
      }
      return total
    }, 0)
  })
}

const examValue = ref(examValueDefault)

const questionList = ref([])
const studentList = ref([{ label: '学生1', value: 1 }])

// 考试持续时间
const duration = computed(() => {
  if (!examValue.value.timeRange) return 0
  return (examValue.value.timeRange[1] - examValue.value.timeRange[0]) / 1000 / 60
})


getQuestionList().then(res => {
  questionList.value = res.data.questionList.map(item => {
    return { label: item.content, value: item.id, score: item.score }
  })
})

getAllUser({ permission: 2 }).then(res => {
  studentList.value = res.rows.map(item => {
    return { label: item.name, value: item.id }
  })
})

const createExam = () => {
  examValue.value = examValueDefault
  showModal.value = true
}

const submitExam = () => {
  console.log(examValue.value)
  createPaper(examValue.value).then(res => {
    console.log(res)
  })
}

getPaperList().then(res => {

  console.log(res)
})

// 获取题目

// 获取学生

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

.setExam {
  border-radius: 25px;
  //overflow: hidden;
}

</style>
