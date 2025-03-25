<!-- <template>
  <div class="container">
    <h2>Modules List</h2>

    <el-button type="primary" @click="$router.push('/add-module')">Add Module</el-button>

    <el-table :data="modules">
      <el-table-column prop="title" label="Title" />
      <el-table-column prop="courseName" label="Course" />
      <el-table-column prop="description" label="Description" />
      <el-table-column prop="contentType" label="Type" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getModules } from "../api/modules";
import Cookies from "universal-cookie";

// Reactive state for modules
const modules = ref<Array<any>>([]);
const cookies = new Cookies();

// Fetch modules from API
const fetchModules = async () => {
  try {
    // Get JWT token from cookies
    const token = cookies.get("accessToken");
    if (!token) {
      console.error("No access token found! Redirecting to login.");
      return;
    }

    // Fetch modules with authorization
    const response = await getModules(token);
    console.log("Full API Response:", response);

    // Ensure correct data mapping
    if (response.data && response.data.data) {
      modules.value = response.data.data;
    } else {
      console.error("Invalid API response structure:", response);
    }
  } catch (error) {
    console.error("Error fetching modules:", error);
  }
};

// Fetch modules when component loads
onMounted(fetchModules);
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
}
</style> -->


<template>
  <div class="layout">
    <!-- Navbar -->
    <el-header class="navbar">
      <div class="navbar-left">
        <!-- <img src="/logo.png" alt="Logo" class="logo" /> -->
        <h1>Learning Management System</h1>
      </div>
      <div class="navbar-right">
        <div class="user-info">
          <el-avatar :src="userAvatar" class="user-avatar" />
          <span class="username">{{ username }}</span>
          <el-dropdown @command="handleCommand">
            <el-button type="text" class="user-dropdown">
              <el-icon><More /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">Profile</el-dropdown-item>
                <el-dropdown-item command="settings">Settings</el-dropdown-item>
                <el-dropdown-item command="logout" divided>Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <!-- Main Content -->
    <el-main class="content-wrapper">
      <div class="dashboard-header">
        <h2>Modules Dashboard</h2>
        <div class="dashboard-actions">
          <el-button type="primary" @click="$router.push('/add-module')" icon="Plus">
            Add New Module
          </el-button>
          <el-input 
            v-model="searchQuery" 
            placeholder="Search modules..." 
            class="search-input"
            prefix-icon="Search"
          />
        </div>
      </div>

      <!-- Modules Grid -->
      <el-row :gutter="20" class="modules-grid">
        <el-col 
          v-for="module in filteredModules" 
          :key="module.id" 
          :xs="24" 
          :sm="12" 
          :md="8" 
          :lg="6"
          class="module-card-wrapper"
        >
          <el-card 
            class="module-card" 
            shadow="hover"
            @click="viewModuleDetails(module)"
          >
            <template #header>
              <div class="card-header">
                <span>{{ module.title }}</span>
                <el-tag :type="getModuleTypeTag(module.contentType)">
                  {{ module.contentType }}
                </el-tag>
              </div>
            </template>
            <div class="module-card-content">
              <p class="module-description">{{ truncateText(module.description, 100) }}</p>
              <div class="module-meta">
                <span>Course: {{ module.courseName }}</span>
              </div>
              <div class="module-actions">
                <el-button 
                  type="primary" 
                  size="small" 
                  @click="navigateToUpdateModule(module.id)"
                >
                  Update
                </el-button>
                <el-button 
                  type="danger" 
                  size="small" 
                  @click="deleteModule(module.id)"
                >
                  Delete
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <!-- Footer -->
    <el-footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          © 2024 Learning Management System
        </div>
        <div class="footer-right">
          <el-link href="#" type="info">Privacy Policy</el-link>
          <el-link href="#" type="info">Terms of Service</el-link>
        </div>
      </div>
    </el-footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getModules } from "../api/modules";
import Cookies from "universal-cookie";
import { ElMessage,ElMessageBox } from 'element-plus';
import { More, Search, Plus } from '@element-plus/icons-vue';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'vue-router';

// Reactive state
const router = useRouter();
const modules = ref<Array<any>>([]);
const searchQuery = ref('');
const username = ref('');
const userAvatar = ref('/default-avatar.png');
const cookies = new Cookies();

// Fetch modules from API
const fetchModules = async () => {
  try {
    const token = cookies.get("accessToken");
    if (!token) {
      ElMessage.error("No access token found! Redirecting to login.");
      return;
    }

    // Decode JWT to get user information
    const decodedToken: any = jwtDecode(token);
    username.value = decodedToken.username || 'User';

    const response = await getModules(token);
    if (response.data && response.data.data) {
      modules.value = response.data.data;
    } else {
      ElMessage.warning("No modules found.");
    }
  } catch (error) {
    ElMessage.error("Error fetching modules");
    console.error("Error fetching modules:", error);
  }
};

// Navigate to update module page
const navigateToUpdateModule = (moduleId: number) => {
  router.push(`/update-module/${moduleId}`);
};

// Delete module
const deleteModule = async (moduleId: number) => {
  try {
    await ElMessageBox.confirm(
      'Are you sure you want to delete this module?', 
      'Confirm Deletion', 
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    );

    // Implement delete logic here
    // For example:
    // await deleteModuleById(moduleId);
    
    // Refresh modules after deletion
    await fetchModules();
    
    ElMessage.success('Module deleted successfully');
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Failed to delete module');
      console.error('Delete error:', error);
    }
  }
};

// Computed filtered modules
const filteredModules = computed(() => {
  return modules.value.filter(module => 
    module.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    module.courseName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Utility functions
const truncateText = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const getModuleTypeTag = (type: string) => {
  const tagMap: { [key: string]: string } = {
    'Video': 'success',
    'Text': 'info',
    'Quiz': 'warning',
    'Assignment': 'danger'
  };
  return tagMap[type] || 'info';
};

// Dropdown menu handler
const handleCommand = (command: string) => {
  switch(command) {
    case 'profile':
      // Navigate to profile page
      break;
    case 'settings':
      // Navigate to settings page
      break;
    case 'logout':
      // Logout logic
      cookies.remove('accessToken');
      // Redirect to login page
      break;
  }
};

// View module details
const viewModuleDetails = (module: any) => {
  // Navigate to module details page
};

// Fetch modules on component mount
onMounted(fetchModules);
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  height: 70px;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 15px;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  cursor: pointer;
}

.content-wrapper {
  flex-grow: 1;
  padding: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dashboard-actions {
  display: flex;
  gap: 15px;
}

.modules-grid {
  display: flex;
  flex-wrap: wrap;
}

.module-card-wrapper {
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.module-card {
  height: 100%;
  cursor: pointer;
  transition: all 0.3s;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.module-card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.module-description {
  color: #666;
  margin-bottom: 10px;
}

.module-meta {
  color: #999;
  font-size: 0.9em;
}

.footer {
  background-color: #ffffff;
  border-top: 1px solid #e9ecef;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.footer-right {
  display: flex;
  gap: 15px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .dashboard-actions {
    width: 100%;
    flex-direction: column;
  }
  .module-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.module-actions .el-button {
  width: 48%; /* Ensure buttons take up almost equal width */
}
}
</style>