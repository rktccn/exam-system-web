<template>
  <div class="main" @click="jumpToExam">
    <n-card :title="examInfo.paperName">
      开始时间：{{ new Date(examInfo.startTime).toLocaleString('zh-cn') }}
      <br />
      结束时间：{{ new Date(examInfo.endTime).toLocaleString('zh-cn') }}
      <template #action> {{ `总分：${examInfo.totalScore}` }}</template>
    </n-card>
  </div>
</template>

<script setup>
import { NCard } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  examInfo: {
    type: Object,
    default: () => {
      return {
        studentPaperId: 0,
        paperId: 0,
        paperName: '',
        startTime: '',
        endTime: '',
        totalScore: '',
      };
    },
  },
});

const jumpToExam = () => {
  console.log(props.examInfo);
  if (props.examInfo.studentPaperId) {
    router.push({
      name: 'exam',
      params: { studentPaperId: props.examInfo.studentPaperId },
    });
  }

  //TODO: 学生跳转到考试页面，老师跳转到数据统计页面
};
</script>

<style lang="scss" scoped>
.main {
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;

  transition: all 0.15s;

  &:hover {
    transform: scale3d(0.9, 0.9, 0.9);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
}
</style>
