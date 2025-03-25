<template>
  <div class="container">
    <h2>Add New Module</h2>

    <el-form @submit.prevent="saveModule">
      <el-form-item label="Title" required>
        <el-input v-model="moduleForm.title" />
      </el-form-item>
      <el-form-item label="Course" required>
        <el-input v-model="moduleForm.courseName" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="moduleForm.description" />
      </el-form-item>
      <el-form-item label="Content Type">
        <el-select v-model="moduleForm.contentType">
          <el-option label="Video" value="VIDEO" />
          <el-option label="Document" value="DOCUMENT" />
          <el-option label="Quiz" value="QUIZ" />
        </el-select>
      </el-form-item>
      <el-form-item label="Content URL">
        <el-input v-model="moduleForm.contentUrl" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Save Module</el-button>
        <el-button @click="$router.push('/module')">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createModule } from "../api/modules";
import { useRouter } from "vue-router";

const router = useRouter();

const moduleForm = ref({
  title: "",
  courseName: "",
  description: "",
  contentType: "VIDEO",
  contentUrl: "",
});

// Save Module
const saveModule = async () => {
  try {
    await createModule(moduleForm.value);
    router.push("/module");
  } catch (error) {
    console.error("Error saving module:", error);
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
}
</style>
