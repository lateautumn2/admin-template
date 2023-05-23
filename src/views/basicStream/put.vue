<script setup lang="ts">
import { shortcuts } from "@/utils/index"
import { ref } from "vue"
import { getBasicList } from "@/api/basic"

const columns = [
  {
    title: "sn",
    dataIndex: "sn"
  },
  {
    title: "状态",
    dataIndex: "status"
  },
  {
    title: "更新时间",
    dataIndex: "update_time"
  },
  {
    title: "入库时间",
    dataIndex: "put_time"
  },
  {
    title: "出库时间",
    dataIndex: "out_time"
  }
]
const params = ref({
  sn: "",
  pageSize: 10,
  pageNumber: 1,
  date: []
})
const data = ref()
const search = async () => {
  try {
    let res = await getBasicList(params.value)
  } catch (e) {
    throw e
  }
  console.log(params.value)
}
</script>
<template>
  <div>
    <a-form layout="inline" :model="params">
      <a-form-item label="sn">
        <a-input placeholder="Please enter something" allow-clear v-model="params.sn" />
      </a-form-item>
      <a-form-item label="时间范围">
        <a-range-picker
          :shortcuts="shortcuts"
          v-model="params.date"
          :time-picker-props="{ defaultValue: ['00:00:00', '23:59:59'] }"
          format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="search">搜索</a-button>
      </a-form-item>
    </a-form>

    <a-table :columns="columns" :data="data" />
  </div>
</template>
<style scoped lang="scss"></style>
