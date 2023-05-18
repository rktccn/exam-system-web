<template>
  <div>
    <n-card
      :title='`${qindex + 1}&nbsp;${question.question.content}`'
      size='large'
    >
      <template #header-extra>
        <span class='subtitle'>
          <n-tag :bordered='false' type='info'>
            {{ typeOptions[question.question.type].label }}
          </n-tag>
        </span>
      </template>

      <!-- 选择题选项 -->
      <template v-if='question.question.type <= 1'>
        <div
          class='option'
          :class='{ selected: option.includes(item.questionOptionId) }'
          v-for='(item, index) in question.options'
          @click='alterSelect(item.questionOptionId)'
        >
          <div class='option-tag'>
            <span>{{ String.fromCharCode(65 + index) }}</span>
          </div>
          <div>{{ item.content }}</div>
        </div>
      </template>

      <!-- 判断题选项 -->
      <template v-if='question.question.type === 3'>
        <div
          class='option'
          :class='{ selected: option === true }'
          @click='option = true'
        >
          <div class='option-tag'>
            <span>A</span>
          </div>
          <div>正确</div>
        </div>

        <div
          class='option'
          :class='{ selected: option === false }'
          @click='option = false'
        >
          <div class='option-tag'>
            <span>B</span>
          </div>
          <div>错误</div>
        </div>
      </template>

      <template #action>
        <!--选择题，判断题答案-->
        <template v-if='(question.question.type <= 1) | (question.question.type === 3)'>
          <template v-for='(item, index) in question.options'>
            <span v-if='item.isSelected'
            >{{ String.fromCharCode(65 + index) }}&nbsp;</span
            >
          </template>
        </template>

        <template v-else>
          <n-input
            v-model:value='option'
            type='text'
            placeholder='输入答案'
          />
        </template>

        <n-button type='info' class='submit' @click='submitAnswer'>
          提交答案
        </n-button>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { NCard, NTag, NInput, NButton } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  qindex: {
    type: Number,
    default: 0
  },
  question: {
    type: Object,
    default: () => {
      return {
        paperId: 0,
        paperQuestionId: 0
      }
    }
  }
})


const emit = defineEmits(['sendAnswer'])

const typeOptions = [
  { label: '单选题', value: 0 },
  { label: '多选题', value: 1 },
  { label: '填空题', value: 2 },
  { label: '判断题', value: 3 },
  { label: '简答题', value: 4 }
]

// const questionValue = ref({
//   type: 1,
//   question: '根据上述资料，以下说法中不正确的是',
//   score: 5,
//   options: [
//     {
//       content: '企业的生产经营活动是在一定的生产条件下进行的',
//       isSelected: false
//     },
//     {
//       content: '企业的生产经营活动是在一定的生产条件下进行的',
//       isSelected: false
//     },
//     {
//       content: '企业的生产经营活动是在一定的生产条件下进行的',
//       isSelected: false
//     },
//     {
//       content: '企业的生产经营活动是在一定的生产条件下进行的',
//       isSelected: false
//     }
//   ],
//   judgeOption: null,
//   answer: ''
// })

// 答案
const option = ref(null)

if (props.question.question.type <= 1) {
  option.value = []
}

const alterSelect = (index) => {
  // 答案中存在则删除，不存在则添加
  option.value.includes(index)
    ? (option.value = option.value.filter((item) => item !== index))
    : option.value.push(index)
}

const submitAnswer = () => {
  if (option.value === null || option.value.length === 0 || option.value === '') {
    return
  }

  emit('sendAnswer', {
    index: props.qindex,
    option: option.value,
    type: props.question.question.type,
    questionId: props.question.question.id
  })


}
</script>

<style lang='scss' scoped>
.subtitle {
  margin-top: 20px;
  margin-left: 20px;
  font-weight: 600;
  opacity: 0.6;
  color: #2080f0;
}

.option {
  display: flex;
  align-items: center;
  padding: 4px 0;

  &.selected {
    .option-tag {
      background-color: rgba(32, 128, 240, 0.71);
      color: #fff;
    }
  }

  &:hover {
    cursor: pointer;

    .option-tag {
      background-color: #2080f0;
      color: #fff;
    }
  }

  .option-tag {
    position: relative;
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 8px;
    border-radius: 50%;
    border: 2px solid #2080f0;

    text-align: center;
    transition: all 0.15s;

    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.submit {
  margin-top: 15px;
}
</style>
