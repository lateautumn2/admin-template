<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import List from "@/components/list/index.vue"
import CalenDars from "@/components/calendars/index.vue"

const list = ref([
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line0"
  },
  {
    id: 0,
    value: "line999"
  }
])
</script>

<template>
  <div class="list" data-tilt>
    <List :data-list="list">
      <template #default="{ item }">
        <div>这是一条虚拟列表数据{{ item.id }}</div>
      </template>
    </List>
    <CalenDars />
  </div>
</template>

<style lang="scss" scoped>
.list {
  background-color: #fff;
}
</style>
