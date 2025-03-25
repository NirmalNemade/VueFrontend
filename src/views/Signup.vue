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
      <el-form-item label="Phone Number">
        <el-input v-model="phoneNumber" type="tel" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" type="password" show-password />
      </el-form-item>
      <el-form-item label="Role">
        <el-radio-group v-model="role">
          <el-radio label="INSTRUCTOR">Instructor</el-radio>
          <el-radio label="STUDENT">Student</el-radio>
        </el-radio-group>
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
const phoneNumber = ref('');
const password = ref('');
const role = ref('INSTRUCTOR'); // 👈 Ensure role is stored as a string
const router = useRouter();

const handleSignup = async () => {
  try {
    const payload = {
      name: name.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      password: password.value,
      role: role.value, // 👈 Send as a string
    };
    
    console.log("Payload being sent:", payload); // Debugging log

    await signup(
      name.value,
      email.value,
      phoneNumber.value,
      password.value,
      role.value // 👈 Send as a string
    );

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
