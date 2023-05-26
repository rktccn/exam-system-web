<template>
  <div>
    <n-gradient-text type='info' class='title'> 题库管理</n-gradient-text>

    <main>
      <nav>
        <n-space>
          <n-button type='info' @click='createQuestion'>添加题目</n-button>
          <n-input
            v-model:value='searchValue'
            type='text'
            placeholder='搜索'
            @keyup='doSearch'
          />
        </n-space>
      </nav>

      <div v-if='questionList.length !== 0'>
        <question-block
          v-for='(item, index) in questionList'
          :key='index'
          class='question'
          :question-value='item'
          @send-question-value='alterQuestion'
        ></question-block>
      </div>
      <n-pagination
        v-if='paginationValue.total !== 0'
        v-model:page='paginationValue.currentPage'
        :page-count='Math.ceil(paginationValue.total/paginationValue.pageSize)'
        :on-update-page='getQuestions'
      />
    </main>

    <!--设置题目窗口-->

    <n-modal v-model:show='showModal' class='setQuestion'>
      <n-card
        style='width: 600px'
        title='设置题目'
        :bordered='false'
        size='huge'
        role='dialog'
        aria-modal='true'
      >
        <p>题型</p>
        <n-select v-model:value='questionValue.type' :options='typeOptions' />

        <p>题目</p>
        <n-input v-model:value='questionValue.content'></n-input>

        <p>分值</p>
        <n-input-number v-model:value='questionValue.score' clearable />

        <!--只有选择题才有选项，并且可以通过按钮增加选项条数-->
        <template v-if='questionValue.type <= 1'>
          <p>选项</p>
          <div
            class='option'
            v-for='(item, index) in questionValue.options'
            :key='index'
          >
            <n-space>
              <n-checkbox
                :value='index'
                :label='(index + 1).toString()'
                v-model:checked='item.isCorrect'
              />
              <n-input v-model:value='item.content' />
              <n-button type='warning' @click='deleteOption(index)'>
                删除选项
              </n-button>
            </n-space>
          </div>
          <n-button type='info' @click='addOption'> 添加选项</n-button>
        </template>

        <template v-else-if='questionValue.type === 3'>
          <p>答案</p>

          <n-space>
            <n-radio
              :checked='questionValue.judgeOption'
              :value='true'
              name='judge-option'
              @change='handleChange(true)'
            >
              正确
            </n-radio>
            <n-radio
              :checked='!questionValue.judgeOption'
              :value='false'
              name='judge-option'
              @change='handleChange(false)'
            >
              错误
            </n-radio>
          </n-space>
        </template>

        <template v-else>
          <p>答案</p>
          <n-input v-model:value='questionValue.answer'></n-input>
        </template>


        <n-space justify='space-between' class='control'>
          <n-button type='info' @click='showModal = false'> 取消</n-button>

          <n-button type='info' @click='submitQuestion'> 确定</n-button>
        </n-space>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import {
  NButton,
  NGradientText,
  NModal,
  NCard,
  NInput,
  NSelect,
  NCheckbox,
  NSpace,
  NInputNumber,
  NRadio,
  NPagination
} from 'naive-ui'
import QuestionBlock from '../../components/questionBlock.vue'
import { ref } from 'vue'
import {
  addQuestion,
  getQuestionList, searchQuestion,
  updateQuestion
} from '../../apis/question.js'

const showModal = ref(false)
const searchValue = ref('')

const doSearch = (v) => {
  if (v.keyCode === 13) {
    paginationValue.value.currentPage = 1
    getQuestions()
  }
}

const questionValue = ref({
  questionId: 0,
  type: 0,
  content: '',
  score: 0,
  options: [
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
    { content: '', isCorrect: false }
  ],
  judgeOption: null,
  answer: ''
})

const paginationValue = ref({
  total: 0,
  currentPage: 1,
  pageSize: 10
})

const typeOptions = [
  { label: '单选题', value: 0 },
  { label: '多选题', value: 1 },
  { label: '填空题', value: 2 },
  { label: '判断题', value: 3 },
  { label: '简答题', value: 4 }
]
const isAlter = ref(false) // 是否为修改题目
const questionList = ref([])

const createQuestion = () => {
  isAlter.value = false
  showModal.value = true
}

const addOption = () => {
  questionValue.value.options.push({
    content: '选项',
    isCorrect: false
  })
}

const deleteOption = (index) => {
  questionValue.value.options.splice(index, 1)
}

const handleChange = (val) => {
  questionValue.value.judgeOption = val
}

// 获取题目列表
const getQuestions = () => {
  const limit = paginationValue.value.pageSize
  const offset = (paginationValue.value.currentPage - 1) * limit
  const key = searchValue.value === '' ? null : searchValue.value
  getQuestionList({ limit, offset, key }).then((res) => {
    paginationValue.value.total = res.data.questionList.count
    questionList.value = res.data.questionList.rows
  })
}
getQuestions()

const submitQuestion = () => {
  const data = {
    questionId: questionValue.value.questionId,
    content: questionValue.value.content,
    type: questionValue.value.type,
    score: questionValue.value.score
  }

  if (questionValue.value.type <= 1) {
    data.options = questionValue.value.options
  } else if (questionValue.value.type === 3) {
    data.options = [
      { content: '正确', isCorrect: questionValue.value.judgeOption },
      { content: '错误', isCorrect: !questionValue.value.judgeOption }
    ]
  } else {
    data.options = [{ content: questionValue.value.answer, isCorrect: true }]
  }

  if (!isAlter.value) {
    addQuestion(data).then((res) => {
      showModal.value = false
      getQuestions()
    })
  } else {
    updateQuestion(data).then((res) => {
      showModal.value = false
      getQuestions()
    })
  }
}

const alterQuestion = (val) => {
  questionValue.value = val
  isAlter.value = true
  showModal.value = true
}
</script>

<style lang='scss' scoped>
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

main {
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;

  nav {
    margin-bottom: 20px;
  }

  .question {
    margin-bottom: 20px;
  }
}

.setQuestion {
  .option {
    margin-bottom: 4px;
  }

  .control {
    margin-top: 8px;
  }
}
</style>
