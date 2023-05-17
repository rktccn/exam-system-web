<template>
  <main>
    <div class="grade-block">
      <h2>考试名称</h2>
      <div>
        得分：
        <n-number-animation
          ref="numberAnimationInstRef"
          :from="0"
          :to="12039"
        />
      </div>
      <div>提交时间： <n-time :time="time" /></div>
    </div>
  </main>
</template>

<script setup>
import { NNumberAnimation, NTime } from 'naive-ui';

const time = new Date();
</script>

<style lang="scss">
main {
  position: relative;

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

    & > * {
      margin: 8px 0;
    }
  }
}
</style>
