<template>
  <div>
    <n-gradient-text type='info' class='title'> 考试管理</n-gradient-text>

    <main>
      <nav>
        <n-button type='info' @click='createExam'> 创建新考试</n-button>
      </nav>

      <n-divider title-placement='left' class='subtitle'>
        活跃的考试
      </n-divider>

      <n-grid x-gap='12' :cols='4' :y-gap='8'>
        <n-gi
          class='exam-item'
          v-for='(item, index) in examList.active'
          :key='index'
        >
          <exam-card :exam-info='item' />
        </n-gi>
      </n-grid>
      <n-pagination
        class='pagination'
        v-model:page='examList.activePage'
        :page-count='Math.ceil(examList.activeCount / 16)'
        :on-update-page='getActiveExam'
      />

      <n-divider title-placement='left' class='subtitle'>
        已结束的考试
      </n-divider>

      <!--考试列表-->
      <n-grid x-gap='12' :cols='4' :y-gap='8'>
        <n-gi
          class='exam-item'
          v-for='(item, index) in examList.finished'
          :key='index'
        >
          <exam-card :exam-info='item' @click='goToAnalyze(item.paperId)' />
        </n-gi>
      </n-grid>
      <n-pagination
        class='pagination'
        v-model:page='examList.finishedPage'
        :page-count='Math.ceil(examList.finishedCount / 16)'
        :on-update-page='getFinishedExam'
      />
    </main>

    <!--添加考试窗口-->
    <n-modal v-model:show='showModal' class='setExam'>
      <n-card
        style='width: 600px'
        title='创建考试'
        :bordered='false'
        size='huge'
        aria-modal='true'
      >
        <!--        <pre>{{ examValue }}</pre>-->

        <p>考试名称</p>
        <n-input
          placeholder='输入考试名称'
          v-model:value='examValue.title'
        ></n-input>
        <p>考试时间</p>
        <n-date-picker
          type='datetimerange'
          clearable
          v-model:value='examValue.timeRange'
        />
        <p>考试题目</p>
        <n-transfer
          ref='transfer'
          v-model:value='examValue.questions'
          :options='questionList'
        />
        <p>考试学生</p>
        <n-transfer
          ref='transfer'
          v-model:value='examValue.students'
          :options='studentList'
        />
        <p>考试属性</p>
        <n-grid x-gap='12' :cols='4' :y-gap='8' style='opacity: 0.7'>
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
  NTransfer,
  NPagination
} from 'naive-ui'
import ExamCard from '../../components/examCard.vue'
import { computed, ref } from 'vue'
import { getQuestionList } from '../../apis/question.js'
import { getAllUser } from '../../apis/user.js'
import { createPaper, getPaperList } from '../../apis/paper.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const examList = ref({
  active: [],
  activePage: 1,
  activeCount: 0,
  finished: [],
  finishedPage: 1,
  finishedCount: 0
})

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
  return (
    (examValue.value.timeRange[1] - examValue.value.timeRange[0]) / 1000 / 60
  )
})

// 获取活跃的考试
const getActiveExam = () => {
  const offset = (examList.value.activePage - 1) * 16
  getPaperList(1, offset, 16).then((res) => {
    examList.value.active = res.rows
    examList.value.activeCount = res.count
  })
}

// 获取已结束的考试
const getFinishedExam = () => {
  const offset = (examList.value.finishedPage - 1) * 16
  getPaperList(0, offset, 16).then((res) => {
    examList.value.finished = res.rows
    examList.value.finishedCount = res.count
    console.log(res)
  })
}

const goToAnalyze = (examId) => {
  console.log(examId)
  router.push({
    name: 'examAnalyze',
    params: { paperId: examId }
  })
}

const createExam = () => {
  examValue.value = examValueDefault
  showModal.value = true
}

const submitExam = () => {
  createPaper(examValue.value).then((res) => {
    getActiveExam()
    getFinishedExam()
    showModal.value = false
  })
}

getActiveExam()
getFinishedExam()
getQuestionList().then((res) => {
  questionList.value = res.data.questionList.map((item) => {
    return { label: item.content, value: item.questionId, score: item.score }
  })
})

getAllUser({ permission: 2 }).then((res) => {
  studentList.value = res.rows.map((item) => {
    return { label: item.name, value: item.userId }
  })
})
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

  .pagination {
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .exam-item {
    &:hover {
      z-index: 9999;
    }
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
