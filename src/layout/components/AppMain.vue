<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const key = computed(() => {
  return route.path
})
</script>

<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <div class="app-container">
          <keep-alive>
            <component :is="Component" :key="key" v-if="!route.meta.Cache" />
          </keep-alive>
          <component :is="Component" :key="key" v-if="route.meta.Cache" />
        </div>
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - var(--v3-navigationbar-height));
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: calc(16px + var(--v3-navigationbar-height));
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--v3-header-height));
  }
  .fixed-header + .app-main {
    padding-top: var(--v3-header-height);
  }
}
</style>
