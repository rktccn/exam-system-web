<template>
  <div class='main' @click='jumpToExam'>
    <n-card :title='examInfo.paperName'>
      开始时间：{{ new Date(examInfo.startTime).toLocaleString('zh-cn') }}
      <br />
      结束时间：{{ new Date(examInfo.endTime).toLocaleString('zh-cn') }}
      <template #header-extra>
        <n-icon :size='26' :color='themeVars.primaryColorHover'>
          <InsertDriveFileTwotone />
        </n-icon>
      </template>
      <template #action> {{ `总分：${examInfo.totalScore}` }}</template>
    </n-card>
  </div>
</template>

<script setup>
import { NCard, NIcon, useThemeVars } from 'naive-ui'
import { InsertDriveFileTwotone } from '@vicons/material'
import { useRouter } from 'vue-router'

const themeVars = useThemeVars()

const router = useRouter()
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
        totalScore: ''
      }
    }
  }
})

// 跳转到考试页面
const jumpToExam = () => {
  if (props.examInfo.studentPaperId) {
    router.push({
      name: 'exam',
      params: { studentPaperId: props.examInfo.studentPaperId }
    })
  }

  //TODO: 学生跳转到考试页面，老师跳转到数据统计页面
}
</script>

<style lang='scss' scoped>
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
