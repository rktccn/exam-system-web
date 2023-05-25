<template>
  <main>
    <n-gradient-text type='info' class='title'> 个人设置</n-gradient-text>

    <n-divider title-placement='left' class='subtitle'> 信息修改</n-divider>

    <div>
      <n-form-item label='用户名'>
        <n-input
          round
          placeholder='请输入用户名'
          v-model:value='userValue.info.username'
        />
      </n-form-item>
      <n-form-item label='邮箱'>
        <n-input
          round
          placeholder='请输入邮箱'
          v-model:value='userValue.info.email'
        />
      </n-form-item>
      <n-form-item label='年龄'>
        <n-input
          round
          placeholder='请输入年龄'
          v-model:value='userValue.info.age'
        />
      </n-form-item>
      <n-button type='info'>提交</n-button>
    </div>

    <n-divider title-placement='left' class='subtitle'> 密码修改</n-divider>
    <div>
      <n-form-item label='新密码'>
        <n-input
          round
          placeholder='请输入新密码'
          v-model:value='userValue.password'
        />
      </n-form-item>
      <n-button type='info'>提交</n-button>
    </div>
    <pre>
    {{ userValue }}
    </pre>
  </main>
</template>

<script setup>
import {
  NDivider,
  NGradientText,
  NInput,
  NFormItem,
  NButton,
  NForm
} from 'naive-ui'
import { ref } from 'vue'

const formRef = ref(null)

const userValue = ref({
  info: {
    username: '',
    email: '',
    age: ''
  },
  password: ''
})


</script>

<style lang='scss' scoped>
main {
  padding: 20px;
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
