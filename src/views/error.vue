<template>
  <main>
    <n-result
      class='result'
      status='warning'
      title='警告'
      :description='route.params.message'
    >
      <template #footer>
        <n-button @click='goBack'>返回上一页</n-button>
      </template>
    </n-result>
  </main>
</template>

<script setup>
import { NResult, NButton } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const goBack = () => {
  router.go(-2)
}
</script>

<style lang='scss' scoped>
main {
  display: flex;
  width: 100%;
  height: 100vh;

  justify-content: center;
  align-items: center;
}


</style>
