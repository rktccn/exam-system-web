<template>
  <main>
    <div class='left'>
      <nav>
        <n-progress type='circle' :percentage='percentage' />

        <n-grid x-gap='12' :cols='4' :y-gap='8' class='nav-list'>
          <n-gi>
            <div class='nav-item'>
              <span class='question-id'>1</span>
            </div>
          </n-gi>
          <n-gi>
            <div class='nav-item'>
              <span class='question-id'>1</span>
            </div>
          </n-gi>
          <n-gi>
            <div class='nav-item'>
              <span class='question-id'>1</span>
            </div>
          </n-gi>
          <n-gi>
            <div class='nav-item'>
              <span class='question-id'>1</span>
            </div>
          </n-gi>
          <n-gi>
            <div class='nav-item'>
              <span class='question-id'>1</span>
            </div>
          </n-gi>
          <n-gi>
            <div class='nav-item'>
              <span class='question-id'>1</span>
            </div>
          </n-gi>
        </n-grid>
        <n-button class='submit' type='info'>提交试卷</n-button>
      </nav>
    </div>
    <div class='right'>
      <exam-question-card
        class='question-card'
        @sendAnswer='getAnswer'
      ></exam-question-card>
      <exam-question-card class='question-card'></exam-question-card>
      <exam-question-card class='question-card'></exam-question-card>
      <exam-question-card class='question-card'></exam-question-card>
    </div>
  </main>
</template>

<script setup>
import { NGrid, NGi, NProgress, NButton } from 'naive-ui'
import { ref } from 'vue'
import ExamQuestionCard from '../components/examQuestionCard.vue'

const percentage = ref(20)

const options = ref()

const getAnswer = (val) => {
  options.value = val
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
      background-color: #2080F0;
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
      border: 2px solid #2080F0;

      text-align: center;
      transition: all 0.15s;

      .question-id {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      &:hover {
        background-color: #2080F0;
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
    padding: 20px 45px;
    overflow: scroll;

    .question-card {
      border-radius: 25px;
      overflow: hidden;
      margin-bottom: 25px;
    }
  }
}
</style>
