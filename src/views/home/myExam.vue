<template>
  <div>
    <n-gradient-text type="info" class="title"> 我的考试</n-gradient-text>
    <main>
      <n-divider title-placement="left" class="subtitle">
        活跃的考试
      </n-divider>

      <n-grid x-gap="12" :cols="4" :y-gap="8">
        <n-gi v-for="(item, index) in examList.active" :key="index">
          <exam-card :exam-info="item" />
        </n-gi>
      </n-grid>
      <n-pagination
        class="pagination"
        v-model:page="examList.activePage"
        :page-count="Math.ceil(examList.activeCount / 16)"
        :on-update-page="getActiveExam"
      />

      <n-divider title-placement="left" class="subtitle">
        已结束的考试
      </n-divider>

      <n-grid x-gap="12" :cols="4" :y-gap="8">
        <n-gi v-for="(item, index) in examList.finished" :key="index">
          <exam-card :exam-info="item" />
        </n-gi>
      </n-grid>
      <n-pagination
        class="pagination"
        v-model:page="examList.finishedPage"
        :page-count="Math.ceil(examList.finishedCount / 16)"
        :on-update-page="getFinishedExam"
      />
    </main>
  </div>
</template>

<script setup>
import {
  NDivider,
  NGradientText,
  NButton,
  NGrid,
  NGi,
  NPagination,
} from 'naive-ui';
import ExamCard from '../../components/examCard.vue';
import { ref } from 'vue';
import { getStudentPaperList } from '../../apis/paper.js';

const examList = ref({
  active: [],
  activePage: 1,
  activeCount: 0,
  finished: [],
  finishedPage: 1,
  finishedCount: 0,
});

// 获取活跃的考试
const getActiveExam = () => {
  const offset = (examList.value.activePage - 1) * 16;
  getStudentPaperList(4, 1, offset, 16).then((res) => {
    examList.value.active = res.rows;
    examList.value.activeCount = res.count;
  });
};

// 获取已结束的考试
const getFinishedExam = () => {
  const offset = (examList.value.finishedPage - 1) * 16;
  getStudentPaperList(4, 0, offset, 16).then((res) => {
    examList.value.finished = res.rows;
    examList.value.finishedCount = res.count;
  });
};

getActiveExam();
getFinishedExam();
</script>

<style lang="scss" scoped>
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
</style>
