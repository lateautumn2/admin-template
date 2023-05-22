<script setup lang="ts">
import { shortcuts } from "@/utils/index"
</script>
<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="sn">
        <a-input placeholder="Please enter something" allow-clear />
      </a-form-item>
      <a-form-item label="时间范围">
        <a-range-picker :shortcuts="shortcuts" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary">搜索</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<style scoped lang="scss"></style>
