<script setup lang="ts">
import { ref, onMounted, computed } from "vue"

const width = ref<number>(0)
const height = ref<number>(0)
const card = ref(null)

onMounted(() => {
  width.value = card.value.offsetWidth
  height.value = card.value.offsetHeight
})
const mouseX = ref<number>(0)
const mouseY = ref<number>(0)
const mousePX = computed(() => {
  return mouseX.value / width.value
})
const mousePY = computed(() => {
  return mouseY.value / height.value
})
const cardStyle = computed(() => {
  const rX = mousePX.value * 30
  const rY = mousePY.value * -30
  return {
    transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
  }
})

const handleMouseMove = (e) => {
  mouseX.value = e.pageX - card.value.offsetLeft - width.value / 2 - 220
  mouseY.value = e.pageY - card.value.offsetTop - height.value / 2
}
const mouseLeaveDelay = ref<any>(null)
const handleMouseEnter = () => {
  clearTimeout(mouseLeaveDelay.value)
}
const handleMouseLeave = () => {
  mouseLeaveDelay.value = setTimeout(() => {
    mouseX.value = 0
    mouseY.value = 0
  }, 500)
}
</script>

<template>
  <div
    class="card-wrap"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="card"
  >
    <div class="card" :style="cardStyle"></div>
  </div>
</template>

<style lang="scss" scoped>
.card-wrap {
  width: 240px;
  height: 320px;
  margin: 10px;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  // background-color: #fff;

  &:hover {
    .card {
      transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    }
  }
}
.card {
  position: relative;
  flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #eef1ff;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(black, 0.66) 0 30px 60px 0, inset #b1b2ff 0 0 0 5px, inset rgba(white, 0.5) 0 0 0 6px;
  transition: 0.6s;
}
</style>
