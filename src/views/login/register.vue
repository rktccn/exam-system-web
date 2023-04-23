<template>

  <div class='login'>
    <div class='title'>在线考试平台</div>

    <div class='login-inner'>
      <!--  标题   -->
      <div class='login-title'>
        <h1>用户注册</h1>
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
          <div class='form'>
            <div class='left'>
              <p class='subtitle'>基本信息</p>
              <n-form-item path='user.name'>
                <n-input v-model:value='model.user.name' placeholder='输入姓名' />
              </n-form-item>
              <n-form-item path='user.age'>
                <n-input v-model:value='model.user.age' placeholder='输入年龄' />
              </n-form-item>
            </div>
            <div class='right'>
              <p class='subtitle'>注册信息</p>
              <n-form-item path='user.id'>
                <n-input v-model:value='model.user.id' placeholder='输入编号' />
              </n-form-item>
              <n-form-item path='user.email'>
                <n-input v-model:value='model.user.email' placeholder='输入邮箱' />
              </n-form-item>
              <n-form-item path='user.password'>
                <n-input v-model:value='model.user.password' placeholder='输入密码' />
              </n-form-item>
            </div>
          </div>
          <n-form-item>
            <n-button color='#7FC6D8' class='submit' attr-type='button' @click='handleValidateClick'>
              提交注册
            </n-button>
          </n-form-item>
        </n-form>

        <!--        <n-button class='submit' attr-type='button' @click='goToRegister()'>-->
        <!--          注册-->
        <!--        </n-button>-->
      </div>
    </div>

  </div>


</template>

<script>
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { ref } from 'vue'
import { register } from '../../apis/user.js'

export default {
  name: 'Register',
  setup() {
    const formRef = ref(null)
    const modelRef = ref({
      user: {
        name: '',
        age: '',
        id: '',
        email: '',
        password: ''
      }
    })


    return {
      formRef,
      model: modelRef,
      rules: {
        user: {
          name: {
            required: true,
            message: '请输入姓名',
            trigger: ['input', 'blur']
          },
          age: {
            required: true,
            message: '请输入年龄',
            trigger: ['input', 'blur']
          },
          id: {
            required: true,
            message: '请输入编号',
            trigger: ['input', 'blur']
          },
          email: {
            required: true,
            message: '请输入邮箱',
            trigger: ['input', 'blur']
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
          console.log('success')

          const { name, age, id: no, email, password } = modelRef.value.user

          register(no, password, email, name, age).then((res) => {
            console.log(res)
          }).catch(() => {
            console.log('error')
          })


        }).catch(() => {
          console.log('error')
        })
      }
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
    width: 580px;
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

      .form {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .subtitle {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
          color: rgba(1, 1, 1, 0.5);
        }

        .left {
          width: 50%;
          padding-right: 10px;
        }

        .right {
          width: 50%;
          padding-left: 10px;
        }
      }

      .submit {
        width: 100%;
      }
    }
  }
}

</style>
