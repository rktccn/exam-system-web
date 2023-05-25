<template>

  <div class='login'>
    <div class='title'>在线考试平台</div>

    <div class='login-inner'>
      <!--  标题   -->
      <div class='login-title'>
        <h1>用户登录</h1>
      </div>
      <!--  表单   -->
      <div class='login-form'>
        <n-form
          ref='formRef'
          :rules='rules'
          :model='model'
          label-placement='left'
          label-width='auto'
          require-mark-placement='right-hanging'
        >
          <n-form-item path='user.idOrEmail'>
            <n-input v-model:value='model.user.idOrEmail' placeholder='输入编号/邮箱' />
          </n-form-item>
          <n-form-item path='user.password'>
            <n-input v-model:value='model.user.password' placeholder='输入密码' type='password' />
          </n-form-item>

          <n-form-item>
            <n-button color='#7FC6D8' class='submit' attr-type='button' @click='handleValidateClick'>
              登录
            </n-button>
          </n-form-item>
        </n-form>

        <n-button class='submit' attr-type='button' @click='goToRegister()'>
          注册
        </n-button>
      </div>
    </div>
  </div>
</template>

<script>
import { NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import { ref } from 'vue'
import { login } from '../../apis/user.js'
import { useRouter } from 'vue-router'
import { useStore } from '../../store/main.js'

export default {
  name: 'Login',
  setup() {
    const formRef = ref(null)
    const modelRef = ref({
      user: {
        idOrEmail: '',
        password: ''
      }
    })
    const router = useRouter()
    const message = useMessage()
    const store = useStore()

    const goToRegister = () => {
      router.push('/register')
    }


    return {
      formRef,
      model: modelRef,
      rules: {
        user: {
          idOrEmail: {
            required: true,
            message: '请输入密码/邮箱',
            trigger: 'blur'
          },
          password: {
            required: true,
            message: '请输入密码',
            trigger: ['input', 'blur']
          }
        }
      },
      handleValidateClick(e) {
        e.preventDefault()
        formRef.value?.validate().then(() => {
          const idOrEmail = modelRef.value.user.idOrEmail
          const password = modelRef.value.user.password
          // // 判定是工号还是邮箱
          const isEmail = idOrEmail.includes('@')
          const no = isEmail ? null : idOrEmail
          const email = isEmail ? idOrEmail : null


          login(no, email, password).then(res => {
            if (res.code === 200) {
              // 保存用户信息
              store.setUser(res.data)
              message.success(`${res.data.name}，欢迎回来！`)
              router.push('/home')
            } else {
              message.error(res.message)
            }
          }).catch((res) => {
            message.error(res.message)
          })

        }).catch(() => {
          console.log('error')
        })
      },
      goToRegister
    }
  },
  components: {
    NForm,
    NFormItem,
    NInput,
    NButton
  }
}


</script>

<style lang='scss' scoped>


.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7FC6D8;

  .title {
    position: absolute;
    top: 30px;
    left: 50px;
    font-size: 50px;
    font-weight: bolder;
    // 调整文字间距
    letter-spacing: 5px;
    color: #fff;
  }


  .login-inner {
    width: 400px;
    padding-top: 20px;
    padding-bottom: 40px;

    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);

    .login-title {
      text-align: center;
      color: #010101;
      padding: 0 25px;


      &:after {
        content: '';
        display: block;
        width: 60%;
        height: 2px;
        background-color: #7E99D7;
        margin: 10px auto 0;
      }
    }

    .login-form {
      margin-top: 20px;
      padding: 0 40px;

      .submit {
        width: 100%;
      }
    }
  }
}

</style>
