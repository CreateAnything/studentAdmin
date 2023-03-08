<script setup lang="ts">
import Header from '@/components/single/header/index.vue';
import Menu from '@/components/single/menu/index.vue';
</script>
<template>
  <a-layout>
    <a-layout-sider>
      <Menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <Header />
      </a-layout-header>
      <a-layout-content class="main-page">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<style lang="less" scoped>
.header {
  padding: 0;
  background-color: white;
}
.main-page {
  margin: 24px 16px;
  padding: 24px;
  background-color: #fff;
  padding: 0;
  height: 100vh;
}
</style>
