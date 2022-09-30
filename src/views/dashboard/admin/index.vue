<script lang="ts" setup>
import { ref } from "vue"
import SuspendDom from "@/components/SuspendDom/index.vue"
import { getChart } from "@/api/chart"
import LineChart from "@/components/lineChart/index.vue"

// 模块统计数据
const chartMap = ref({
  line: {
    title: "客户总数",
    label: ["平均客户总数", "客户总数"],
    data: null,
    color: ["#CBD1E1", "#A276FF"]
  },
  line2: {
    title: "复访转化率",
    label: ["平均复访转化率", "复访转化率"],
    data: null,
    color: ["#CBD1E1", "#4DC9C1"]
  },
  line3: {
    title: "总接待时长",
    label: ["平均总接待时长", "总接待时长"],
    data: null,
    color: ["#CBD1E1", "#14A5FF"]
  },
  line4: {
    title: "平均接待时长",
    label: ["项目平均接待时长", "平均接待时长"],
    data: null,
    color: ["#CBD1E1", "#FFA05D"]
  },
  pie: {
    title: "平均接待时长",
    label: ["项目平均接待时长", "平均接待时长"],
    data: null,
    color: ["#CBD1E1", "#6084FF"]
  },
  bar: {
    title: "总体话术执行率趋势",
    label: ["项目总体话术执行率", "总体话术执行率"],
    data: null,
    color: ["#CBD1E1", "#FFC933"]
  }
})

const getList = async () => {
  try {
    const res = await getChart()
    for (const item in res.data) {
      let date = res.data[item].map((item) => item.date)
      let avg = res.data[item].map((item) => item.avgNum)
      let num = res.data[item].map((item) => item.num)
      chartMap.value[item].data = { date, avg, num }
    }
  } finally {
  }
}
getList()
</script>

<template>
  <div class="app-container">
    <div class="flex_xy_evenly">
      <SuspendDom></SuspendDom>
      <SuspendDom></SuspendDom>
      <SuspendDom></SuspendDom>
      <SuspendDom></SuspendDom>
    </div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12" v-for="(item, index) in chartMap" :key="item.title">
        <LineChart :title="item.title" :color="item.color" :tooltipName="item.label" :data="item.data" />
      </el-col>
    </el-row>
  </div>
</template>
