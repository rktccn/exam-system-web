<template>

  <div>
    <n-gradient-text type='info' class='title'>
      题库管理
    </n-gradient-text>


    <main>
      <nav>
        <n-button type='info' @click='showModal = true'>
          添加题目
        </n-button>
      </nav>

      <div>
        <question-block class='question'></question-block>
      </div>
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
        <n-input></n-input>

        <!--只有选择题才有选项，并且可以通过按钮增加选项条数-->
        <p v-if='questionValue.type === "选择题"'>选项</p>
        <div class='option' v-if='questionValue.type === "选择题"'
             v-for='(item, index) in questionValue.options'
             :key='index'>
          <n-space>
            <n-checkbox value='Beijing' :label='item' />
            <n-input />
          </n-space>
        </div>
        <n-button type='info' @click='addOption'>
          添加选项
        </n-button>


        <n-button type='info' @click='showModal = false'>
          确定
        </n-button>
      </n-card>
    </n-modal>


  </div>

</template>

<script setup>
import { NButton, NGradientText, NModal, NCard, NInput, NSelect, NCheckbox, NSpace } from 'naive-ui'
import QuestionBlock from '../../components/questionBlock.vue'
import { ref } from 'vue'

const showModal = ref(false)

const questionValue = ref({
  type: '选择题',
  question: '这是一个选择题',
  options: ['选项1', '选项2', '选项3', '选项4'],
  answer: '选项1',
  analysis: '这是一个选择题的解析'
})

const typeOptions = [
  { label: '单选题', value: '0' },
  { label: '多选题', value: '1' },
  { label: '填空题', value: '2' },
  { label: '判断题', value: '3' },
  { label: '简答题', value: '4' }
]

const addOption = () => {
  questionValue.value.options.push('选项' + (questionValue.value.options.length + 1))
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
}

</style>