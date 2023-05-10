<template>
<<<<<<< Updated upstream
  <div class="question-block">
    <n-card title="根据上述资料，以下说法中不正确的是（）" size="large">
      <template #header-extra>
        <span class="subtitle">
          <n-tag :bordered="false" type="info"> 单选题 </n-tag>
=======
  <div>

    <n-card :title='questionValue.content' size='large'>
      <template #header-extra>
        <span class='subtitle'>
          {{ typeOptions[questionValue.type].label }}
>>>>>>> Stashed changes
        </span>
      </template>

      <!--选项-->
      <template v-if='questionValue.type <= 1'>
        <p v-for='(item, index) in questionValue.options' :key='index'>
          {{ `${index + 1}. ${item.content}` }}
        </p>
      </template>

      <template #action>
        <!--参考答案-->
        <span v-if='questionValue.type <= 1'>
          参考答案：
          <template v-for='(item,index) in questionValue.options'>
            <span v-if='item.isCorrect'>{{ index + 1 }}&nbsp;</span>
          </template>
        </span>

        <span v-else-if='questionValue.type > 1'>
          参考答案：{{ questionValue.options[0].content }}
        </span>

      </template>
    </n-card>
  </div>
</template>

<script setup>
<<<<<<< Updated upstream
import { NCard, NTag } from 'naive-ui';
=======
import { NCard } from 'naive-ui'

// 从父组件接收的数据
const props = defineProps({
  questionValue: {
    type: Object,
    default: () => {
      return {
        type: 0,
        content: '',
        score: 0,
        teacherId: 1,
        options: [
          {
            content: '',
            isCorrect: false
          }
        ]
      }
    }
  }
})

const typeOptions = [
  { label: '单选题', value: 0 },
  { label: '多选题', value: 1 },
  { label: '填空题', value: 2 },
  { label: '判断题', value: 3 },
  { label: '简答题', value: 4 }
]


console.log(props.questionValue)

>>>>>>> Stashed changes
</script>

<style lang="scss" scoped>
.question-block {
  border-radius: 25px;
  overflow: hidden;
}

.subtitle {
  margin-top: 20px;
  margin-left: 20px;
  font-weight: 600;
  opacity: 0.6;
  color: #2080f0;
}
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
</style>
