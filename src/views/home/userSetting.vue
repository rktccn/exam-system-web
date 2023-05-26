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
        <n-input-number
          round
          placeholder='请输入年龄'
          v-model:value='userValue.info.age'
        />
      </n-form-item>
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
      <n-button type='info' @click='submitChange'>提交</n-button>
    </div>
  </main>
</template>

<script setup>
import {
  NDivider,
  NGradientText,
  NInput,
  NFormItem,
  NButton,
  NInputNumber,
  useMessage
} from 'naive-ui'
import { ref } from 'vue'
import { updateUser } from '../../apis/user.js'
import { useStore } from '../../store/main.js'

const store = useStore()
const message = useMessage()

const userValue = ref({
  info: {
    username: store.name,
    email: store.email,
    age: store.age
  },
  password: ''
})


const submitChange = () => {
  const { userId, no, permission } = store.getUser
  const { username: name, email, age } = userValue.value.info
  const password = userValue.value.password

  updateUser(userId, no, email, name, age, password, permission).then(res => {
    message.success('修改成功')
  }).catch(err => {
    message.error('修改失败')
  })
}

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
