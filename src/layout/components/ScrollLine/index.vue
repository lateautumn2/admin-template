<script lang="ts" setup>
import { onMounted, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
const plan = ref<number>(0)
const route = useRoute()
const router = useRouter()

onMounted(() => {
  document.addEventListener(
    "scroll",
    (e) => {
      let scrollTop = document.querySelector(".app-main").scrollTop
      let scrollHeight = document.querySelector(".app-main").scrollHeight // 文档总高度
      let clientHeight = document.documentElement.clientHeight // 窗口可视高度
      if (scrollHeight - clientHeight == 0) return
      plan.value = (scrollTop / (scrollHeight - clientHeight)) * 100
    },
    true
  )
})

watch(
  () => route.path,
  () => {
    plan.value = 0
  }
)
</script>

<template>
  <div class="all">
    <div class="active" :style="{ '--plan': plan + '%' }"></div>
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
