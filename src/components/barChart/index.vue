<template>
  <div class="echarts">
    <div class="Company">单位：（{{ props.Company }}）</div>
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
  Company: {
    type: String,
    default: "个"
  },
  data: {
    type: Object,
    default: () => {}
  },
  color: {
    type: Array,
    default: "#6084FF"
  }
})

let option: EChartsOption = {
  title: {
    text: props.title
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  legend: {},
  grid: {
    left: "3%",
    right: "3%",
    bottom: "0%",
    containLabel: true
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
    axisLine: {
      lineStyle: {
        color: "#cccccc"
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: "#6B788A"
    }
  },
  yAxis: {
    type: "category",
    inverse: true, //升叙
    data: props.data?.key,
    axisLine: {
      lineStyle: {
        color: "#cccccc"
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: "#6B788A"
    }
  },
  series: [
    {
      type: "bar",
      realtimeSort: true,
      data: props.data?.value,
      barMaxWidth: 12,
      label: {
        show: true,
        position: "right"
      },
      itemStyle: {
        borderRadius: [0, 10, 10, 0]
      }
    }
  ],
  color: props.color,
  dataZoom: [
    {
      type: "slider",
      show: true,
      // 设置组件控制的y轴
      yAxisIndex: 0,
      right: 0,
      start: 0,
      end: 100,
      brushSelect: false,
      width: 8,
      // height: 450,
      // // 组件的背景颜色
      backgroundColor: "#EAEEF7",
      // // 选中范围的填充颜色
      fillerColor: "#CBD1E1",
      // // 边框颜色
      borderColor: "#EAEEF7",
      // // 是否显示detail，即拖拽时候显示详细数值信息
      showDetail: false,
      // // 控制手柄的尺寸
      handleSize: 0
      // // 是否在 dataZoom-silder 组件中显示数据阴影。数据阴影可以简单地反应数据走势。
      // showDataShadow: false
    },
    {
      type: "inside",
      yAxisIndex: 0,
      start: 29,
      end: 36,
      // // 不按任何功能键，鼠标滚轮能触发缩放
      zoomOnMouseWheel: false,
      // // 不按任何功能键，鼠标移动能触发数据窗口平移
      moveOnMouseWheel: true
    }
  ]
}
watch(
  () => props.data,
  (newData) => {
    echartsUpdata(newData)
  },
  {
    deep: true
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
  opts.yAxis[0].data = props.data?.key
  const series = opts.series
  series[0].data = props.data?.value
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
  border-radius: 10px;
  position: relative;
  .item {
    width: 100%;
    height: 100%;
  }
  .Company {
    position: absolute;
    right: 50px;
    font-size: 14px;
    color: #9ba5ba;
  }
}
</style>
