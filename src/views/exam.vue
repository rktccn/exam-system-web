<template>
  <main>
    <div class='left'>
      <nav>
        <n-progress type='circle' :percentage='percentage' />

        <n-grid x-gap='12' :cols='4' :y-gap='8' class='nav-list'>
          <n-gi v-for='(item, index) in questionList.questionList'>
            <a
              class='nav-item'
              :class='{ done: options[index] !== null }'
              @click='scrollToQuestion(index)'
            >
              <span class='question-id'>{{ index + 1 }}</span>
            </a>
          </n-gi>
        </n-grid>

        <n-popconfirm :negative-text='null' @positive-click='submitExam'>
          <template #trigger>
            <n-button class='submit' type='info'>提交试卷</n-button>
          </template>
          提交后无法修改，确认提交
        </n-popconfirm>
      </nav>
    </div>
    <div class='right' ref='questionListRef'>
      <exam-question-card
        class='question-card'
        v-for='(item, index) in questionList.questionList'
        :qindex='index'
        :question='item'
        :q-index='index'
        @sendAnswer='getAnswer'
      ></exam-question-card>
    </div>
  </main>
</template>

<script setup>
import { NGrid, NGi, NProgress, NButton, NPopconfirm } from 'naive-ui'
import { ref, computed } from 'vue'
import ExamQuestionCard from '../components/examQuestionCard.vue'
import { useRoute } from 'vue-router'
import router from '../route/index.js'
import { getExam } from '../apis/paper.js'


const route = useRoute()
const questionListRef = ref(null)
const len = ref([])

const percentage = computed(() => {
  return parseInt(
    (options.value.reduce((pre, cur) => {
        if (cur !== null) return pre + 1
        return pre
      }, 0) /
      options.value.length) *
    100
  )
})
// 题目列表
const questionList = ref([])

// 答案列表
const options = ref([])

for (let i = 0; i < 3; i++) {
  len.value.push(i)
  options.value.push(null)
}

const getAnswer = (val) => {
  options.value[val.index] = val
}

const scrollToQuestion = (index) => {
  questionListRef.value.children[index].scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  })
}

// 获取试卷
const getExamDetail = () => {
  getExam(route.params.studentPaperId, 4).then((res) => {
    questionList.value = res.data
    console.log(res)
  })
}

getExamDetail()

const submitExam = () => {
  // TODO: 提交试卷
}
</script>

<style lang='scss' scoped>
main {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .left {
    position: relative;
    width: 14%;
    height: 100%;
    background-color: #fff;
    border-radius: 0 25px 25px 0;

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      width: 2px;
      height: 90%;

      transform: translateY(-50%);
      background-color: #2080f0;
    }

    nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 25px;
    }

    .nav-list {
      margin-top: 50px;
      justify-items: center;
    }

    .nav-item {
      position: relative;
      display: block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: 2px solid #2080f0;

      text-align: center;
      transition: all 0.15s;

      &.done {
        background-color: rgba(32, 128, 240, 0.71);
        color: #fff;
      }

      .question-id {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      &:hover {
        background-color: #2080f0;
        color: #fff;
        cursor: pointer;
      }
    }

    .submit {
      margin-top: 25px;
    }
  }

  .right {
    flex-grow: 1;
    height: 100vh;
    padding: 0px 45px;
    overflow-y: scroll;

    .question-card {
      border-radius: 25px;
      overflow: hidden;
      margin-top: 25px;
    }
  }
}
</style>
