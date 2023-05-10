<template>
  <main>
    <div class="left">
      <nav>
        <n-progress type="circle" :percentage="percentage" />

        <n-grid x-gap="12" :cols="4" :y-gap="8" class="nav-list">
          <n-gi>
            <div class="nav-item">
              <span class="question-id">1</span>
            </div>
          </n-gi>
          <n-gi>
            <div class="nav-item">
              <span class="question-id">1</span>
            </div>
          </n-gi>
          <n-gi>
            <div class="nav-item">
              <span class="question-id">1</span>
            </div>
          </n-gi>
          <n-gi>
            <div class="nav-item">
              <span class="question-id">1</span>
            </div>
          </n-gi>
          <n-gi>
            <div class="nav-item">
              <span class="question-id">1</span>
            </div>
          </n-gi>
          <n-gi>
            <div class="nav-item">
              <span class="question-id">1</span>
            </div>
          </n-gi>
        </n-grid>
      </nav>
    </div>
    <div class="right">
      <exam-question-card
        class="question-card"
        @sendAnswer="getAnswer"
      ></exam-question-card>
      <exam-question-card class="question-card"></exam-question-card>
      <exam-question-card class="question-card"></exam-question-card>
      <exam-question-card class="question-card"></exam-question-card>
    </div>
  </main>
</template>

<script setup>
import { NGrid, NGi, NProgress } from 'naive-ui';
import { ref } from 'vue';
import examQuestionCard from '../components/examQuestionCard.vue';

const percentage = ref(20);

const options = ref();

const getAnswer = (val) => {
  options.value = val;
};
</script>

<style lang="scss" scoped>
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
    padding: 20px 25px;

    &:after {
      content: '';
      position: absolute;
      right: 0px;
      top: 50%;
      width: 2px;
      height: 90%;

      transform: translateY(-50%);
      background-color: #7fc6d8;
    }

    nav {
      display: flex;
      flex-direction: column;
      align-items: center;
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
      border: 2px solid #12617e;

      text-align: center;
      transition: all 0.15s;

      .question-id {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      &:hover {
        background-color: #12617e;
        color: #fff;
        cursor: pointer;
      }
    }
  }

  .right {
    flex-grow: 1;
    height: 100vh;
    padding: 20px 45px;

    background-color: #fff;
    overflow: scroll;

    .question-card {
      margin-bottom: 25px;
    }
  }
}
</style>
