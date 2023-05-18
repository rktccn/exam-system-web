<template xmlns='http://www.w3.org/1999/html'>

  <div>
    <n-gradient-text type='info' class='title'>
      系统设置
    </n-gradient-text>

    <n-divider title-placement='left' class='subtitle'>
      数据看板
    </n-divider>


    <div class='static_list'>

      <span class='static_card'>
      <n-card>
        <n-statistic label='学生用户'>
          {{ dataValue.student }}
        </n-statistic>
      </n-card>
    </span>

      <span class='static_card'>
      <n-card>
        <n-statistic label='教师用户'>
          {{ dataValue.teacher }}
        </n-statistic>
      </n-card>
      </span>

      <span class='static_card'>
      <n-card>
        <n-statistic label='试卷数量'>
          1,234,123
        </n-statistic>
      </n-card>
      </span>
    </div>
    <n-divider title-placement='left' class='subtitle'>
      用户设置
    </n-divider>
    <n-card content-style='padding: 0;'>
      <n-tabs
        type='line'
        size='large'
        :tabs-padding='20'
      >
        <n-tab-pane name='用户设置'>
          <n-list hoverable clickable style='width: 100%'>
            <!--展示用户信息-->
            <n-list-item @click='editUser(item)' v-for='(item,index) in userList.rows' :key='index'>
              <n-grid x-gap='10' :cols='5'>
                <n-gi>{{ item.no }}</n-gi>
                <n-gi>{{ item.name }}</n-gi>
                <n-gi>{{ item.email }}</n-gi>
                <n-gi>{{ permissionOpts[item.permission].label }}</n-gi>
                <n-gi>{{ new Date(item.createdAt).toLocaleString() }}</n-gi>
              </n-grid>
            </n-list-item>
          </n-list>
        </n-tab-pane>
        <n-tab-pane name='教师-学生关联设置'>
          <n-list hoverable clickable style='width: 100%'>
            <!--展示用户信息-->
            <n-list-item @click='editLink(item)' v-for='(item,index) in teacherList?.rows' :key='index'>
              <n-grid x-gap='10' :cols='5'>
                <n-gi>{{ item.no }}</n-gi>
                <n-gi>{{ item.name }}</n-gi>
                <n-gi>{{ item.email }}</n-gi>
                <n-gi>{{ permissionOpts[item.permission].label }}</n-gi>
                <n-gi>{{ new Date(item.createdAt).toLocaleString() }}</n-gi>
              </n-grid>
            </n-list-item>
          </n-list>
        </n-tab-pane>
      </n-tabs>
    </n-card>


    <!--用户管理窗口-->
    <n-modal v-model:show='userManage'>
      <n-card
        style='width: 600px'
        title='设置用户'
        :bordered='false'
        size='huge'
        role='dialog'
        aria-modal='true'>
        <n-grid x-gap='10' :cols='2'>
          <n-gi>
            <n-form-item label='用户名'>
              <n-input placeholder='请输入用户名' v-model:value='userValue.info.username' />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label='邮箱'>
              <n-input placeholder='请输入邮箱' v-model:value='userValue.info.email' />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label='年龄'>
              <n-input placeholder='请输入年龄' v-model:value='userValue.info.age' />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label='密码'>
              <n-input placeholder='请输入密码' v-model:value='userValue.password' />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label='权限'>
              <n-select v-model:value='userValue.permission' :options='permissionOpts' />
            </n-form-item>
          </n-gi>
        </n-grid>

        <n-button type='info' @click='submitUpdate'>提交</n-button>

      </n-card>
    </n-modal>


    <!--教师学生关联窗口-->
    <n-modal v-model:show='linkManage'>
      <n-card
        style='width: 600px'
        title='设置用户'
        :bordered='false'
        size='huge'
        role='dialog'
        aria-modal='true'>
        <n-transfer ref='transfer' v-model:value='teacherLink.list' :options='studentList' />
      </n-card>
    </n-modal>

  </div>

</template>

<script setup>
import {
  NDivider,
  NGradientText,
  NTabs,
  NTabPane,
  NCard,
  NStatistic,
  NList,
  NListItem,
  NGrid,
  NGi,
  NInput, NFormItem, NModal, NSelect, NButton, NTransfer
} from 'naive-ui'
import { ref } from 'vue'
import { getAllUser, getUserCount, updateUser } from '../../apis/user.js'

const userManage = ref(false)
const linkManage = ref(false)
const dataValue = ref({
  total: 0,
  teacher: 0,
  student: 0,
  paper: 0
})
const userValue = ref({
  info: {
    userId: 0,
    username: '',
    email: '',
    age: '',
    no: 0
  },
  password: '',
  permission: 0
})
const teacherLink = ref({
  userId: 0,
  name: '',
  list: []
})
const permissionOpts = ref([
  { label: '管理员', value: 0 },
  { label: '教师', value: 1 },
  { label: '学生', value: 2 }
])

// 获取用户数量
getUserCount(2).then(res => {
  dataValue.value.student = res
})
getUserCount(1).then(res => {
  dataValue.value.teacher = res
})

// 获取用户列表
const userList = ref([])
getAllUser().then(res => {
  userList.value = res
})

// 获取教师用户
const teacherList = ref([])
getAllUser({ permission: 1 }).then(res => {
  teacherList.value = res
})
// 获取学生用户
const studentList = ref([])
getAllUser({ permission: 2 }).then(res => {
  res.rows.map(val => {
    studentList.value.push({
      label: `${val.no}_${val.name}`,
      value: val.userId
    })
  })
})

const editUser = (item) => {
  userValue.value.info.username = item.name
  userValue.value.info.email = item.email
  userValue.value.info.age = item.age.toString()
  userValue.value.password = ''
  userValue.value.permission = item.permission
  userValue.value.info.UserId = item.UserId
  userValue.value.info.no = item.no

  userManage.value = true
}

const editLink = (item) => {
  teacherLink.value.UserId = item.UserId
  teacherLink.value.name = item.name

  linkManage.value = true
}

const submitUpdate = () => {
  updateUser(
    userValue.value.info.UserId,
    userValue.value.info.no,
    userValue.value.info.email,
    userValue.value.info.username,
    userValue.value.info.age,
    userValue.value.password,
    userValue.value.permission
  ).then(res => {
    getAllUser().then(res => {
      userList.value = res
    })
    userManage.value = false
  })
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


.static_list {
  display: flex;

  .static_card {
    flex: 1;
    padding: 0 8px;
  }
}

</style>
