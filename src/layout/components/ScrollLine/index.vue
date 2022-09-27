<script lang="ts" setup>
import { onMounted, ref } from "vue"
const plan = ref<string>("")

const getScroll = () => {}
onMounted(() => {
  document.addEventListener(
    "scroll",
    (e) => {
      let scrollTop = document.querySelector(".app-main").scrollTop
      let scrollHeight = document.querySelector(".app-main").scrollHeight // 文档总高度
      let clientHeight = document.documentElement.clientHeight // 窗口可视高度
      plan.value = +(scrollTop / (scrollHeight - clientHeight)).toFixed(2) * 100 + "%"
    },
    true
  )
})
</script>

<template>
  <div class="all">
    <div class="active" :style="{ '--plan': plan }"></div>
  </div>
</template>

<style lang="scss" scoped>
.all {
  position: fixed;
  z-index: 9999;
  bottom: 0;
  width: 100%;
  height: 5px;
  background-color: transparent;
  .active {
    height: 5px;
    width: var(--plan);
    background-color: var(--v3-scroll-line-bg-color);
  }
}
</style>
