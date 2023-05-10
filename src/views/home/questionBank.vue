<template>
  <div>
    <n-gradient-text type="info" class="title"> 题库管理 </n-gradient-text>

    <main>
      <nav>
        <n-button type="info" @click="showModal = true">添加题目</n-button>
      </nav>

<<<<<<< Updated upstream
      <div>
        <question-block class="question"></question-block>
=======
      <div v-if='questionList.length !== 0'>
        <question-block v-for='(item,index) in questionList' :key='index' class='question'
                        :question-value='item'></question-block>
>>>>>>> Stashed changes
      </div>
    </main>

    <!--设置题目窗口-->
<<<<<<< Updated upstream
    <n-modal v-model:show="showModal" class="setQuestion">
=======
    <n-modal v-model:show=' showModal
        ' class='setQuestion'>
>>>>>>> Stashed changes
      <n-card
        style="width: 600px"
        title="设置题目"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <p>题型</p>
        <n-select v-model:value="questionValue.type" :options="typeOptions" />

        <p>题目</p>
<<<<<<< Updated upstream
        <n-input v-model:value="questionValue.question"></n-input>
=======
        <n-input v-model:value='questionValue.content'></n-input>
>>>>>>> Stashed changes

        <p>分值</p>
        <n-input-number v-model:value="questionValue.score" clearable />

        <!--只有选择题才有选项，并且可以通过按钮增加选项条数-->
        <p v-if="questionValue.type <= 1">选项</p>
        <div
          class="option"
          v-if="questionValue.type <= 1"
          v-for="(item, index) in questionValue.options"
          :key="index"
        >
          <n-space>
<<<<<<< Updated upstream
            <n-checkbox
              :value="index"
              :label="(index + 1).toString()"
              v-model:checked="item.isAnswer"
            />
            <n-input v-model:value="item.content" />
            <n-button type="warning" @click="deleteOption(index)">
=======
            <n-checkbox :value='index' :label='(index+1).toString()'
                        v-model:checked='item.isCorrect' />
            <n-input v-model:value='item.content' />
            <n-button type='warning' @click='deleteOption(index)'>
>>>>>>> Stashed changes
              删除选项
            </n-button>
          </n-space>
        </div>
        <n-button type="info" @click="addOption"> 添加选项 </n-button>

        <!--答案-->
        <p>答案</p>
        <!--选择题答案-->
<<<<<<< Updated upstream
        <div v-if="questionValue.type <= 1">
          <template v-for="(item, index) in questionValue.options">
            <span v-if="item.isAnswer">{{ index + 1 }}&nbsp;</span>
=======
        <div v-if='questionValue.type <= 1'>
          <template v-for='(item,index) in questionValue.options'>
            <span v-if='item.isCorrect'>{{ index + 1 }}&nbsp;</span>
>>>>>>> Stashed changes
          </template>
        </div>
        <!--填空题答案-->
        <div v-else-if="questionValue.type > 1">
          <n-input v-model:value="questionValue.answer"></n-input>
        </div>

<<<<<<< Updated upstream
        <n-space justify="space-between">
          <n-button type="info" @click="showModal = false"> 确定 </n-button>
          <n-button type="info" @click="showModal = false"> 取消 </n-button>
=======
        <n-space justify='space-between'>
          <n-button type='info' @click='submitQuestion'>
            确定
          </n-button>
          <n-button type='info' @click='showModal = false'>
            取消
          </n-button>
>>>>>>> Stashed changes
        </n-space>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
<<<<<<< Updated upstream
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
} from 'naive-ui';
import QuestionBlock from '../../components/questionBlock.vue';
import { ref } from 'vue';
=======
import { NButton, NGradientText, NModal, NCard, NInput, NSelect, NCheckbox, NSpace, NInputNumber } from 'naive-ui'
import QuestionBlock from '../../components/questionBlock.vue'
import { ref } from 'vue'
import { addQuestion, getQuestionList } from '../../apis/question.js'
>>>>>>> Stashed changes

const showModal = ref(false);

const questionValue = ref({
  type: 0,
  content: '',
  score: 0,
  options: [
<<<<<<< Updated upstream
    { content: '', isAnswer: false },
    { content: '', isAnswer: false },
    { content: '', isAnswer: false },
    { content: '', isAnswer: false },
=======
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
    { content: '', isCorrect: false }
>>>>>>> Stashed changes
  ],
  answer: '',
});

const typeOptions = [
  { label: '单选题', value: 0 },
  { label: '多选题', value: 1 },
  { label: '填空题', value: 2 },
  { label: '判断题', value: 3 },
  { label: '简答题', value: 4 },
];

const questionList = ref([])

const addOption = () => {
<<<<<<< Updated upstream
  questionValue.value.options.push({ content: '选项', isAnswer: false });
};

const deleteOption = (index) => {
  questionValue.value.options.splice(index, 1);
};
=======
  questionValue.value.options.push({ content: '选项', isCorrect: false })
}

const deleteOption = (index) => {
  questionValue.value.options.splice(index, 1)
}

// 获取题目列表
const getQuestions = () => {
  getQuestionList(1).then(res => {
    questionList.value = res.data.questionList
  })
}
getQuestions()
const submitQuestion = () => {
  showModal.value = false

  const data = {
    teacherId: 1,
    content: questionValue.value.content,
    type: questionValue.value.type,
    score: questionValue.value.score
  }

  if (questionValue.value.type <= 1) {
    data.options = questionValue.value.options
  } else {
    data.options = [{ content: questionValue.value.answer, isCorrect: true }]
  }

  addQuestion(data).then(res => {
    console.log(res)
  })
}

>>>>>>> Stashed changes
</script>

<style lang="scss" scoped>
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
}
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
</style>
