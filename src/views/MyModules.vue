<!-- <template>
    <div class="container">
      <h2>My Modules</h2>
  
    
      <div class="module-form">
        <h3>Create Module</h3>
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
            <el-select v-model="moduleForm.contentType" placeholder="Select Type">
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
          </el-form-item>
        </el-form>
      </div>
  
    
      <el-table :data="modules">
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="courseName" label="Course" />
        <el-table-column prop="contentType" label="Type" />
        <el-table-column label="Actions">
          <template #default="{ row }">
            <el-button type="primary" @click="editModule(row)">Edit</el-button>
            <el-button type="warning" @click="togglePublish(row)">Toggle Publish</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { getMyModules, createModule, updateModule, togglePublishModule } from "../api/modules";
  
  // Reactive state
  const modules = ref<Array<any>>([]);
  const moduleForm = ref({
    title: "",
    courseName: "",
    description: "",
    contentType: "VIDEO",
    contentUrl: "",
    id: null,
  });
  
  // Fetch modules from API
  const fetchModules = async () => {
    try {
      const { data } = await getMyModules();
      modules.value = data;
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };
  
  // Save Module (Create or Update)
  const saveModule = async () => {
    try {
      if (moduleForm.value.id) {
        await updateModule(moduleForm.value.id, moduleForm.value);
      } else {
        await createModule(moduleForm.value);
      }
      moduleForm.value = { title: "", courseName: "", description: "", contentType: "VIDEO", contentUrl: "", id: null };
      await fetchModules(); // Refresh list after save
    } catch (error) {
      console.error("Error saving module:", error);
    }
  };
  
  // Edit Module
  const editModule = (module: any) => {
    moduleForm.value = { ...module };
  };
  
  // Toggle Publish Status
  const togglePublish = async (module: any) => {
    try {
      await togglePublishModule(module.id, !module.published);
      await fetchModules();
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };
  
  // Fetch modules on component mount
  onMounted(fetchModules);
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
  }
  
  .module-form {
    background: #f9f9f9;
    padding: 16px;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  </style>
   -->

   <template>
    <div class="container">
      <h2>My Modules</h2>
  
      <!-- Create Module Form (Always Visible) -->
      <div class="module-form">
        <h3>Create Module</h3>
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
            <el-select v-model="moduleForm.contentType" placeholder="Select Type">
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
          </el-form-item>
        </el-form>
      </div>
  
      <!-- Modules Table -->
      <el-table :data="modules">
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="courseName" label="Course" />
        <el-table-column prop="contentType" label="Type" />
        <el-table-column label="Actions">
          <template #default="{ row }">
            <el-button type="primary" @click="editModule(row)">Edit</el-button>
            <el-button type="warning" @click="togglePublish(row)">Toggle Publish</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { getMyModules, createModule, updateModule, togglePublishModule } from "../api/modules";
  
  // Reactive state
  const modules = ref<Array<any>>([]);
  const moduleForm = ref({
    title: "",
    courseName: "",
    description: "",
    contentType: "VIDEO",
    contentUrl: "",
    id: null,
  });
  
  // Fetch modules from API
  const fetchModules = async () => {
    try {
      const { data } = await getMyModules();
      modules.value = data;
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };
  
  // Save Module (Create or Update)
  const saveModule = async () => {
    try {
      if (moduleForm.value.id) {
        await updateModule(moduleForm.value.id, moduleForm.value);
        // Update the edited module in the table
        const index = modules.value.findIndex(m => m.id === moduleForm.value.id);
        if (index !== -1) modules.value[index] = { ...moduleForm.value };
      } else {
        const { data } = await createModule(moduleForm.value);
        // Push the new module to the list without refetching
        modules.value.push(data);
      }
  
      // Reset form
      moduleForm.value = { title: "", courseName: "", description: "", contentType: "VIDEO", contentUrl: "", id: null };
    } catch (error) {
      console.error("Error saving module:", error);
    }
  };
  
  // Edit Module
  const editModule = (module: any) => {
    moduleForm.value = { ...module };
  };
  
  // Toggle Publish Status
  const togglePublish = async (module: any) => {
    try {
      await togglePublishModule(module.id, !module.published);
      await fetchModules();
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };
  
  // Fetch modules on component mount
  onMounted(fetchModules);
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
  }
  
  .module-form {
    background: #f9f9f9;
    padding: 16px;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  </style>
  