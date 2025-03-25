<template>
    <div class="container">
      <h2>Browse Modules</h2>
      <el-table :data="modules">
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="courseName" label="Course" />
        <el-table-column prop="contentType" label="Type" />
        <el-table-column label="Actions">
          <template #default="{ row }">
            <el-button @click="markAsCompleted(row.id)">Mark as Completed</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { browseModules, markModuleCompleted } from '../api/modules';
  
  const modules = ref([]);
  
  const fetchModules = async () => {
    const { data } = await browseModules();
    modules.value = data;
  };
  
  const markAsCompleted = async (moduleId: number) => {
    await markModuleCompleted(moduleId);
    alert('Module marked as completed!');
  };
  
  onMounted(fetchModules);
  </script>
  