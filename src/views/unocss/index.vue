<script setup lang="ts">
import { addList } from "@/api/serves"
import { ref } from "vue"
const data = ref()
const add = async () => {
  try {
    let res = await addList({ item: 1 })
    console.log(res)
  } finally {
  }
}
</script>

<template>
  <div>
    <div style="height: 150%">{{ data }}</div>
    <button @click="add">添加</button>
  </div>
</template>
