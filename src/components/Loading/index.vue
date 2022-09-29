<script lang="ts" setup>
import { ref } from "vue"
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: "加载中..."
  },
  fontColor: {
    type: String,
    default: "pink"
  },
  graphColor: {
    type: String,
    default: "pink"
  },
  bgColor: {
    type: String,
    default: "rgba(0, 0, 0, 0.5)"
  }
})
const newshow = ref(true)
</script>

<template>
  <div
    class="loading"
    v-if="show"
    :style="{ '--fontColor': fontColor, '--graphColor': graphColor, '--bgColor': bgColor }"
  >
    <div class="waterfall">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="text">{{ text }}</div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: var(--bgColor);
  z-index: 9999;
}
.text {
  position: absolute;
  font-size: 24px;
  color: var(--fontColor);
  left: 50%;
  top: 55%;
  transform: translateX(-50%);
}
@-webkit-keyframes waterfall {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-250%);
    transform: translateY(-250%);
  }
  40%,
  60% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(250%);
    transform: translateY(250%);
  }
}
@keyframes waterfall {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-250%);
    transform: translateY(-250%);
  }
  40%,
  60% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(250%);
    transform: translateY(250%);
  }
}

.waterfall div {
  -webkit-animation: waterfall 1.5s infinite;
  animation: waterfall 1.5s infinite;
  background-color: var(--graphColor);
  height: 20px;
  left: 50%;
  margin-top: -10px;
  opacity: 0;
  position: absolute;
  top: 50%;
  width: 20px;
}
.waterfall div:nth-of-type(1) {
  -webkit-animation-delay: 0.25s;
  animation-delay: 0.25s;
  margin-left: -10px;
}
.waterfall div:nth-of-type(2) {
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
  margin-left: 15px;
}
.waterfall div:nth-of-type(3) {
  -webkit-animation-delay: 0.75s;
  animation-delay: 0.75s;
  margin-left: -35px;
}
.waterfall div:nth-of-type(4) {
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
  margin-left: 40px;
}
.waterfall div:nth-of-type(5) {
  -webkit-animation-delay: 1.25s;
  animation-delay: 1.25s;
  margin-left: -60px;
}
</style>
