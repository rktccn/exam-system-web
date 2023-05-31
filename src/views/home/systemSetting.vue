<template>
  <main>
    <n-gradient-text type='info' class='title'> 系统设置</n-gradient-text>

    <n-divider title-placement='left' class='subtitle'> 数据看板</n-divider>

    <div class='static_list'>
      <span class='static_card'>
        <n-card>
          <n-statistic label='学生用户'>
              <n-number-animation ref='numberAnimationInstRef' :from='0' :to=' dataValue.student' />
          </n-statistic>
        </n-card>
      </span>

      <span class='static_card'>
        <n-card>
          <n-statistic label='教师用户'>
              <n-number-animation ref='numberAnimationInstRef' :from='0' :to='dataValue.teacher' />
          </n-statistic>
        </n-card>
      </span>

      <span class='static_card'>
        <n-card>
          <n-statistic label='试卷数量'>
              <n-number-animation ref='numberAnimationInstRef' :from='0' :to='dataValue.paper' />
          </n-statistic>
        </n-card>
      </span>
    </div>
    <n-divider title-placement='left' class='subtitle'>用户设置</n-divider>
    <n-data-table
      :columns='columns'
      :data='userData'
      :max-height='480'
      virtual-scroll
      :row-props='rowProps'
      :on-scroll='onScroll'
      :loading='loading'
      class='user-table'
    />

    <!--用户管理窗口-->
    <n-modal v-model:show='userManage'>
      <n-card
        style='width: 600px'
        title='设置用户'
        :bordered='false'
        size='huge'
        role='dialog'
        aria-modal='true'
      >
        <n-grid x-gap='10' :cols='2'>
          <n-gi>
            <n-form-item label='用户名'>
              <n-input
                placeholder='请输入用户名'
                v-model:value='userValue.info.username'
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label='邮箱'>
              <n-input
                placeholder='请输入邮箱'
                v-model:value='userValue.info.email'
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label='年龄'>
              <n-input
                placeholder='请输入年龄'
                v-model:value='userValue.info.age'
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label='密码'>
              <n-input
                placeholder='请输入密码'
                v-model:value='userValue.password'
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label='权限'>
              <n-select
                v-model:value='userValue.permission'
                :options='permissionOpts'
              />
            </n-form-item>
          </n-gi>
        </n-grid>

        <n-space justify='space-around'>
          <n-button type='info' @click='submitUpdate'>提交</n-button>
          <n-button type='error' @click='submitDelete'>删除</n-button>
        </n-space>
      </n-card>
    </n-modal>
  </main>
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
  NInput,
  NFormItem,
  NModal,
  NSelect,
  NButton,
  NTransfer,
  NNumberAnimation,
  NSpace,
  NDataTable
} from 'naive-ui'
import { h, ref } from 'vue'
import { deleteUser, getAllUser, getUserCount, updateUser } from '../../apis/user.js'
import { getPaperList } from '../../apis/paper.js'

const userManage = ref(false)

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

const dataValue = ref({
  student: 0,
  teacher: 0,
  paper: 0
})

const permissionOpts = ref([
  {
    label: '管理员',
    value: 0
  },
  {
    label: '教师',
    value: 1
  },
  {
    label: '学生',
    value: 2
  }
])


const columns = [
  {
    title: '序号',
    key: 'index',
    fixed: 'left',
    render(row, index) {
      return h('span', [index + 1])
    }
  },
  {
    title: '工号',
    key: 'no',
    fixed: 'left'
  },
  {
    title: '姓名',
    key: 'name',
    fixed: 'left'
  },
  {
    title: '邮箱',
    key: 'email',
    fixed: 'left',
    ellipsis: true
  }, {
    title: '角色',
    key: 'permission',
    fixed: 'left',
    render(row, index) {
      return h('span', [row.permission === 0 ? '管理员' : row.permission === 1 ? '教师' : '学生'])
    }
  },
  {
    title: '创建时间',
    key: 'createTime',
    fixed: 'left'
  }
]

const userData = ref([])


// 获取用户数量
getUserCount(2).then((res) => {
  dataValue.value.student = res
})
getUserCount(1).then((res) => {
  dataValue.value.teacher = res
})

getPaperList(null).then((res) => {
  dataValue.value.paper = res.count
})


// 获取用户列表
const userList = ref([])
const loading = ref(false)

const getUserList = (limit, offset) => {
  loading.value = true
  getAllUser({ limit, offset }).then((res) => {
    dataValue.value.user = res.count
    const temp = res.rows.map((val, index) => {
      return {
        userId: val.userId,
        no: val.no,
        name: val.name,
        email: val.email,
        age: val.age,
        permission: val.permission,
        createTime: new Date(val.createdAt).toLocaleString()
      }
    })

    userData.value.push(...temp)
    loading.value = false
  })
}

getUserList(20, 0)


const editUser = (item) => {
  userValue.value.info.username = item.name
  userValue.value.info.email = item.email
  userValue.value.info.age = item.age.toString()
  userValue.value.password = ''
  userValue.value.permission = item.permission
  userValue.value.info.userId = item.userId
  userValue.value.info.no = item.no

  userManage.value = true
}


const rowProps = (row) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      editUser(row)
    }
  }
}

const onScroll = (e) => {
  // 滚动到底部
  if (userData.value.length === dataValue.value.user) return
  if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 80) {
    getUserList(20, userData.value.length)
  }
}

const submitUpdate = () => {
  updateUser(
    userValue.value.info.userId,
    userValue.value.info.no,
    userValue.value.info.email,
    userValue.value.info.username,
    userValue.value.info.age,
    userValue.value.password,
    userValue.value.permission
  ).then((res) => {
    getAllUser().then((res) => {
      userList.value = res
    })
    userManage.value = false
  })
}

const submitDelete = () => {
  deleteUser(userValue.value.info.userId).then((res) => {
    getAllUser().then((res) => {
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


.user-table {
  width: 100%;
}

.static_list {
  display: flex;

  .static_card {
    flex: 1;
    padding: 0 8px;
  }
}
</style>
