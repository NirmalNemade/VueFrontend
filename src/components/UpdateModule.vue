<template>
    <div class="container">
      <h2>Update Module</h2>
      <el-form v-if="moduleForm" @submit.prevent="handleUpdateModule">
        <el-form-item label="Title" required>
          <el-input v-model="moduleForm.title" />
        </el-form-item>
        <el-form-item label="Course" required>
          <el-input v-model="moduleForm.courseName" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="moduleForm.description" type="textarea" />
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
          <el-button type="primary" native-type="submit">Update Module</el-button>
          <el-button @click="$router.push('/module')">Cancel</el-button>
        </el-form-item>
      </el-form>
      <el-empty v-else description="Loading module..." />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { getModuleById, updateModule } from "../api/modules";
  import { ElMessage } from "element-plus";
  
  const route = useRoute();
  const router = useRouter();
  
  // Reactive state for module form
  const moduleForm = ref<any>(null);
  
  // Fetch module details when component mounts
  onMounted(async () => {
    try {
      const moduleId = Number(route.params.id);
      const response = await getModuleById(moduleId);
      moduleForm.value = response.data;
    } catch (error) {
      console.error("Error fetching module:", error);
      ElMessage.error("Failed to load module details");
      router.push('/module');
    }
  });
  
  // Update module handler
  const handleUpdateModule = async () => {
      try {
        const moduleId = Number(route.params.id);
        await updateModule(moduleId, moduleForm.value);
        ElMessage.success("Module updated successfully");
        router.push('/module');
      } catch (error) {
        console.error("Error updating module:", error);
        ElMessage.error("Failed to update module");
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