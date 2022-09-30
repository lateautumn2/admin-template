<template>
  <div class="echarts">
    <div class="item" ref="EchartsDom"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue"
import * as echarts from "echarts"
type EChartsOption = echarts.EChartsOption

const EchartsDom = ref<HTMLElement>(null)
let myChart = null

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  tooltipName: {
    type: Array<string>,
    default: ["类别一", "类别二"]
  },
  data: {
    type: Object,
    default: () => {}
  },
  color: {
    type: Array,
    default: () => ["#6084FF", "#CBD1E1"]
  }
})

let option: EChartsOption = {
  title: {
    text: props.title,
    top: 0,
    textStyle: {
      color: "#152C5B",
      fontSize: 18
    }
  },
  legend: {
    right: "0%",
    orient: "horizontal"
  },
  tooltip: {
    show: true,
    trigger: "axis",
    backgroundColor: "#152C5B",
    textStyle: {
      color: "#FFFFFF"
    }
  },
  grid: {
    left: "6%",
    right: "6%",
    bottom: "10%"
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    data: props.data?.date,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      // rotate: -45
      margin: 20
    }
  },
  yAxis: {
    // name: props.title,
    type: "value",
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  series: [
    {
      name: props.tooltipName[0],
      data: props.data?.avg,
      type: "line",
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(235, 239, 255)"
          },
          {
            offset: 1,
            color: "rgb(255, 255, 255)"
          }
        ])
      }
    },
    {
      name: props.tooltipName[1],
      data: props.data?.num,
      type: "line",
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(235, 239, 255)"
          },
          {
            offset: 1,
            color: "rgb(255, 255, 255)"
          }
        ])
      }
    }
  ],
  animation: true,
  color: props.color
}
watch(
  () => props.data,
  (newData) => {
    echartsUpdata(newData)
  }
)

onMounted(() => {
  myChart = echarts.init(EchartsDom.value)
  myChart.setOption(option)
  window.addEventListener("resize", (event) => {
    myChart.resize()
  })
})

// 数据更新
const echartsUpdata = (newData) => {
  const opts = myChart.getOption()
  const series = opts.series
  opts.xAxis[0].data = newData?.date
  series[0].data = newData?.avg
  series[1].data = newData?.num

  myChart.clear()
  myChart.setOption(opts)
}
</script>
<style scoped lang="scss">
.echarts {
  // width: 48%;
  height: 400px;
  margin-top: 11px;
  padding: 16px;
  border: 1px solid #eaeef7;
  border-radius: 5px;
  background-color: #fff;
  .item {
    width: 100%;
    height: 100%;
  }
}
</style>
