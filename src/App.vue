<script setup>
import { BOrchestrator } from 'bootstrap-vue-next'
</script>

<template>
  <div id="app" data-app>
    <router-view />
    <!-- Modal 및 Toast와 같은 동적 컴포넌트를 관리하는 컨테이너 -->
    <BOrchestrator />
  </div>
</template>

<style scoped></style>
