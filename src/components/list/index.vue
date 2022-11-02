<script setup lang="ts">
import { ref, computed, onMounted } from "vue"

const props = defineProps({
  itemHeight: {
    type: Number,
    default: 40
  },
  //单屏展示数据条数
  remain: {
    type: Number,
    default: 8
  },
  //总数据
  dataList: {
    type: Array as () => any,
    default: () => []
  }
})

const start = ref(0)
const end = ref(props.remain)

const visibleData: any = computed(() => {
  let started = start.value - preveCount.value
  let ended = end.value + nextCount.value
  return props.dataList.slice(started, ended)
})
// 计算内容区域 当前距离顶部的距离----优化(防止最后一屏白屏)
const scrollTop = computed(() => {
  return start.value * props.itemHeight - props.itemHeight * preveCount.value
})
// 优化-----避免下方出现的空白和当用户快速滚动时，出现空白屏
const preveCount = computed(() => {
  // 前面预留的个数---- 当前面的个数小于 8 个时，有几个就预留几个
  return Math.min(start.value, props.remain)
})
const nextCount = computed(() => {
  // 后面预先加载的个数
  return Math.min(props.remain, props.dataList.length - end.value)
})
const vitualConRef = ref(null)
const scrollBarRef = ref(null)
onMounted(() => {
  //主屏幕高度
  vitualConRef.value.style.height = props.itemHeight * props.remain + "px"
  //滚动条高度
  scrollBarRef.value.style.height = props.itemHeight * props.dataList.length + "px"
})

const handleScroll = () => {
  start.value = Math.floor(vitualConRef.value.scrollTop / props.itemHeight)
  end.value = start.value + props.remain
}
</script>

<template>
  <!-- 主高度 -->
  <div class="vitual-con" ref="vitualConRef" @scroll="handleScroll">
    <!-- 滚动条 -->
    <div class="scroll-bar" ref="scrollBarRef">
      <div class="scroll-list" ref="scrollListRef" :style="{ 'padding-top': scrollTop + 'px' }">
        <div
          class="listItem"
          v-for="(item, index) in visibleData"
          :key="item.id"
          :style="{ height: `${itemHeight}px` }"
        >
          <slot :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vitual-con {
  overflow-y: scroll;
  position: relative;
}
</style>
