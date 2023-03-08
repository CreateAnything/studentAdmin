<script setup lang="ts">
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
const selectedKeys = ref<string[]>([]);
</script>

<template>
  <div class="menu-logo">Admin Pro</div>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1">
      <user-outlined />
      <span>nav 1</span>
    </a-menu-item>
    <a-menu-item key="2">
      <video-camera-outlined />
      <span>nav 2</span>
    </a-menu-item>
    <a-menu-item key="3">
      <upload-outlined />
      <span>nav 3</span>
    </a-menu-item>
  </a-menu>
</template>
<style lang="less" scoped>
.menu-logo {
  box-sizing: border-box;
  height: 32px;
  background: rgba(232, 210, 210, 0.3);
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: @theme-color;
  font-weight: 600;
  font-size: @text-size-large;
}
.menu-wrapper {
  height: 100vh;
  .menu-list {
    background-color: red;
  }
}
</style>
