<template>
  <div class="login-container">
    <h2>Login</h2>
    <el-form @submit.prevent="handleLogin">
      <el-form-item label="Email">
        <el-input v-model="email" type="email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" type="password" show-password />
      </el-form-item>
      <el-button type="primary" native-type="submit">Login</el-button>
    </el-form>
    <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const authStore = useAuthStore();
const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');

const handleLogin = async (): Promise<void> => {
  try {
    await authStore.login(email.value, password.value);
    ElMessage.success('Login successful');
    router.push('/module');
  } catch (error) {
    ElMessage.error('Login failed');
    console.error('Login failed', error);
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
}
</style>