<template>
  <main>
    <div class='grade-block'>
      <h2>{{ result.paperName }}</h2>
      <div>
        得分：
        <n-number-animation
          ref='numberAnimationInstRef'
          :from='0'
          :to='result.score'
        />
        / {{ result.totalScore }}
      </div>
      <div>提交时间：{{ new Date(result.submitTime).toLocaleString() }}</div>
      <n-button @click='backToHome' type='info'>返回主页</n-button>
    </div>

    <!--答题记录-->
    <section class='detail-modal' :class="modalShow ? 'show' : 'hide'">
      <span class='change-modal-show' @click='alterModalShow'
      ><n-icon :size='40'><arrow-drop-down-round /></n-icon
      ></span>

      <main>
        <template v-for='(item, index) in questionList' :key='index'>
          <exam-question-card
            :question='item'
            :qindex='index'
            :show-answer='true'
          ></exam-question-card>
        </template>
      </main>
    </section>
  </main>
</template>

<script setup>
import { NNumberAnimation, NIcon, NButton } from 'naive-ui'
import { ArrowDropDownRound } from '@vicons/material'
import { getExamResult } from '../apis/paper.js'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import ExamQuestionCard from '../components/examQuestionCard.vue'

const route = useRoute()
const router = useRouter()

const result = ref({
  paperName: '',
  score: 0,
  totalScore: 0,
  submitTime: ''
})

const questionList = ref([
  // {
  //   paperId: 0,
  //   paperQuestionId: 0,
  //   questionId: 0,
  //   question:{
  //       type: 0,
  //       content: '题目内容'
  //     },
  //   options: [
  //     {
  //       questionOptionId: 0,
  //       content: '选项内容',
  //       isCorrect: false
  //     }
  //   ],
  //   answer: {
  //     content: '选项内容',
  //     isCorrect: false
  //   }
  // }
])

const backToHome = () => {
  router.push('/home')
}

const modalShow = ref(false)
const alterModalShow = () => {
  modalShow.value = !modalShow.value
}

getExamResult(route.params.studentPaperId).then((res) => {
  result.value.paperName = res.data.paper.paperName
  result.value.score = res.data.studentPaper.score
  result.value.submitTime = res.data.studentPaper.submitTime
  result.value.totalScore = res.data.paper.totalScore

  res.data.questionList.forEach((item) => {
    questionList.value.push({
      paperId: item.paperId,
      paperQuestionId: item.paperQuestionId,
      questionId: item.questionId,
      question: {
        type: item.question.type,
        content: item.question.content
      },
      options: item.options.map((option) => {
        return {
          questionOptionId: option.questionOptionId,
          content: option.content,
          isCorrect: option.isCorrect
        }
      }),
      answer: {
        content: item.answer[0].content,
        isCorrect: item.answer[0].isCorrect
      }
    })
  })

})
</script>

<style lang='scss'>
main {
  position: relative;
  overflow: hidden;
  height: 100vh;

  .grade-block {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 88px 68px;
    background-color: #fff;
    border-radius: 25px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);


    & > * {
      margin: 8px 0;
    }
  }
}

.detail-modal {
  position: absolute;
  left: 0;
  width: 100%;
  height: 90%;

  background-color: #fff;
  border-radius: 25px;
  transition: all 0.5s;

  .change-modal-show {
    display: block;
    text-align: center;
    margin: 8px 0;

    cursor: pointer;
    transition: all 0.5s;
  }

  main {
    height: 80%;
    padding: 20px 45px;
    overflow-y: scroll;
  }

  &.show {
    top: 10%;
    box-shadow: 0 -200px 0 0 rgba(0, 0, 0, 0.4);
    transform: rotate(0deg);
  }

  &.hide {
    top: 93%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

    .change-modal-show {
      transform: rotate(180deg);
    }
  }
}
</style>
