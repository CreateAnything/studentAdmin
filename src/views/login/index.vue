<script setup lang="ts">
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import useLogin from './useLogin';
const { formState, onFinish } = useLogin();
</script>

<template>
  <a-row class="login-wrapper">
    <a-col class="login-left-col" :span="12"></a-col>
    <a-col class="login-right-col center" :span="12">
      <a-col class="login-right-from" :span="12">
        <h2>Admin Pro</h2>
        <a-form
          :model="formState"
          name="loginForm"
          autocomplete="off"
          @finish="onFinish"
        >
          <a-form-item name="username">
            <a-input
              v-model:value="formState.username"
              placeholder="请输入账号"
            >
              <template #prefix>
                <user-outlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password">
            <a-input-password
              v-model:value="formState.password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <lock-outlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item name="remember">
            <a-checkbox v-model:checked="formState.remember"
              >自动登录</a-checkbox
            >
          </a-form-item>

          <a-form-item>
            <a-button class="full-width" type="primary" html-type="submit"
              >Submit</a-button
            >
          </a-form-item>
        </a-form>
      </a-col>
    </a-col>
  </a-row>
</template>

<style lang="less" scoped>
@import url('./index.less');
</style>
