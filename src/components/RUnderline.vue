<template>
  <div class='underline'>
    <div class='underline-line' :style='underLineStyle'></div>
    <div class='underline-content'>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

import { commonLight } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'success' | 'error'
  }
})

const underLineStyle = computed(() => {
  let style
  if (props.type === 'success') style = commonLight.successColor
  else if (props.type === 'error') style = commonLight.errorColor
  else style = commonLight.primaryColor
  return { backgroundColor: style }
})


</script>

<style lang='scss' scoped>

.underline {
  position: relative;
  display: inline-block;

  &:hover {
    .underline-line {
      width: 120%;
      height: 40%;
      bottom: 50%;
      left: -10%;
      transform: translate(0, 50%);
    }
  }
}

.underline-line {
  position: absolute;
  bottom: 0;
  left: 5px;
  width: 100%;
  height: 30%;
  opacity: 0.5;

  transition: all 0.15s;

}

.underline-content {
  position: relative;
  font-size: 14px;
}


</style>
