<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <el-form @submit.prevent="handleSignup">
      <el-form-item label="Name">
        <el-input v-model="name" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="email" type="email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" type="password" show-password />
      </el-form-item>
      <el-button type="primary" native-type="submit">Sign Up</el-button>
    </el-form>
    <p>Already have an account? <router-link to="/">Login</router-link></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { signup } from '../api/auth';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const handleSignup = async () => {
  try {
    await signup(name.value, email.value, password.value);
    router.push('/');
  } catch (error) {
    console.error('Signup failed', error);
  }
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
}
</style>
