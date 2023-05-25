<template>
  <div class='question-block' @click='alterQuestion'>
    <n-card
      :title='`${questionValue.questionId}:&nbsp;${questionValue.content}`'
      size='large'
    >
      <template #header-extra>
        <n-tag class='subtitle'>
          {{ typeOptions[questionValue.type].label }}
        </n-tag>
      </template>

      <!--选项-->
      <template v-if='questionValue.type <= 1'>
        <p v-for='(item, index) in questionValue.options' :key='index'>
          {{ `${String.fromCharCode(65 + index)}.&nbsp;${item.content}` }}
        </p>
      </template>

      <template #action>
        <!--参考答案-->
        <span v-if='questionValue.type <= 1'>
          参考答案：
          <template v-for='(item, index) in questionValue.options'>
            <span v-if='item.isCorrect'
            >{{ String.fromCharCode(65 + index) }}&nbsp;</span
            >
          </template>
        </span>

        <div v-else-if='questionValue.type === 3'>
          <template v-for='(item, index) in questionValue.options' :key='index'>
            <span v-if='item.isCorrect'> 参考答案：{{ item.content }} </span>
          </template>
        </div>

        <div v-else>
          <span> 参考答案：{{ questionValue.options[0].content }} </span>
        </div>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { NCard, NTag } from 'naive-ui'

// 从父组件接收的数据
const props = defineProps({
  questionValue: {
    type: Object,
    default: () => {
      return {
        questionId: 0,
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

const emit = defineEmits(['sendQuestionValue'])

const alterQuestion = () => {
  let val = props.questionValue
  let result

  if (val.type <= 1) {
    result = {
      questionId: val.questionId,
      type: val.type,
      content: val.content,
      score: val.score,
      teacherId: val.teacherId,
      options: val.options,
      judgeOption: false,
      answer: ''
    }
  } else if (val.type === 3) {
    let judgeOption =
      val.options[0].content === '正确'
        ? val.options[0].isCorrect
        : !val.options[0].isCorrect
    result = {
      questionId: val.questionId,
      type: val.type,
      content: val.content,
      score: val.score,
      teacherId: val.teacherId,
      options: [],
      judgeOption: judgeOption,
      answer: ''
    }
  } else {
    result = {
      questionId: val.questionId,
      type: val.type,
      content: val.content,
      score: val.score,
      teacherId: val.teacherId,
      options: [],
      judgeOption: false,
      answer: val.options[0].content
    }
  }

  emit('sendQuestionValue', result)
}

</script>

<style lang='scss' scoped>
.question-block {
  border-radius: 25px;
  overflow: hidden;
  cursor: pointer;
}

.subtitle {
  margin-top: 20px;
  margin-left: 20px;
  font-weight: 600;
  opacity: 0.6;
  color: #2080f0;
}
</style>
