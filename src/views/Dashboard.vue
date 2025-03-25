<template>
    <div class="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <p>Manage employees and view statistics.</p>
      <router-link to="/employees">
        <button>View Employees</button>
      </router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .dashboard {
    text-align: center;
    margin-top: 50px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #42b883;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #36976a;
  }
  </style>
  