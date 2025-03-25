<template>
    <div class="container">
      <h2>Progress & Completion Report</h2>
      <h3>My Progress</h3>
      <el-progress :percentage="progress" />
  
      <h3>Completion Report</h3>
      <el-table :data="completionReport">
        <el-table-column prop="studentName" label="Student" />
        <el-table-column prop="completedModules" label="Completed Modules" />
      </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getProgress, getCompletionReport } from '../api/modules';
  
  const progress = ref(0);
  const completionReport = ref([]);
  
  const fetchData = async () => {
    const { data: progressData } = await getProgress();
    progress.value = progressData.percentage;
  
    const { data: reportData } = await getCompletionReport();
    completionReport.value = reportData;
  };
  
  onMounted(fetchData);
  </script>
  