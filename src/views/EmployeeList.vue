<!-- <template>
    <div>
      <h2>Employee List</h2>
      <el-table :data="employees" style="width: 100%">
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="department" label="Department" />
        <el-table-column prop="contact" label="Contact" />
        <el-table-column prop="dateOfJoining" label="Date of Joining" />
        <el-table-column label="Actions">
          <template v-slot="{ row }">
            <el-button @click="editEmployee(row.id)">Edit</el-button>
            <el-button type="danger" @click="deleteEmployee(row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
import { getEmployees, deleteEmployee } from '../api/employee';
  import { useRouter } from 'vue-router';
  
  import type { Employee } from '../api/employee';
  
  const employees = ref<Employee[]>([]);
  const router = useRouter();
  
  const fetchEmployees = async () => {
    employees.value = await getEmployees();
  };
  
  const editEmployee = (id: number) => {
    router.push(`/employees/edit/${id}`);
  };
  
  const removeEmployee = async (id: number) => {
    await deleteEmployee(id);
    fetchEmployees();
  };
  
  onMounted(fetchEmployees);
  </script>
   -->

   <!--  -->

   <template>
    <div class="employee-container">
      <h2>Employee Management</h2>
  
      <!-- Add Employee Form -->
      <el-form v-if="showForm" :model="newEmployee" @submit.prevent="handleAddEmployee">
        <el-form-item label="Full Name">
          <el-input v-model="newEmployee.fullName" placeholder="Enter full name" />
        </el-form-item>
        <el-form-item label="Department">
          <el-input v-model="newEmployee.department" placeholder="Enter department" />
        </el-form-item>
        <el-form-item label="Contact Number">
          <el-input v-model="newEmployee.contactNumber" placeholder="Enter 10-digit number" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="newEmployee.email" type="email" placeholder="Enter email" />
        </el-form-item>
        <el-form-item label="Date of Joining">
          <el-date-picker
            v-model="newEmployee.dateOfJoining"
            type="date"
            placeholder="Select date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-button type="primary" native-type="submit">{{ editingId ? 'Update' : 'Add' }} Employee</el-button>
        <el-button @click="cancelEdit">Cancel</el-button>
      </el-form>
      <el-button v-else type="success" @click="showForm = true">Add New Employee</el-button>
  
      <!-- Employee List -->
      <el-table :data="employees" style="width: 100%" v-loading="loading">
        <el-table-column prop="fullName" label="Full Name" />
        <el-table-column prop="department" label="Department" />
        <el-table-column prop="contactNumber" label="Contact Number" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="dateOfJoining" label="Date of Joining" />
        <el-table-column label="Actions">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import { getEmployees, addEmployee, updateEmployee, deleteEmployee, type Employee, type EmployeeResponse } from '../api/employee';
  import { useAuthStore } from '../store/authStore';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  // State
  const employees = ref<Employee[]>([]); // Always an array
  const loading = ref<boolean>(true);
  const showForm = ref<boolean>(false);
  const editingId = ref<number | undefined>(undefined);
  
  const newEmployee = ref<Employee>({
    fullName: '',
    department: '',
    contactNumber: '',
    email: '',
    dateOfJoining: '',
  });
  
  // Fetch employees on component mount
  onMounted(async () => {
    if (!authStore.isAuthenticated) {
      router.push('/login');
      return;
    }
    await fetchEmployees();
  });
  
  // Methods
  const fetchEmployees = async (): Promise<void> => {
    try {
      const result = await getEmployees();
      employees.value = Array.isArray(result) ? result : []; // Ensure array
      console.log('Fetched employees:', employees.value); // Debug
    } catch (error: any) {
      ElMessage.error('Failed to load employees: ' + (error.response?.data?.message || 'Unknown error'));
      console.error('Fetch error:', error);
      employees.value = []; // Reset to empty array on error
    } finally {
      loading.value = false;
    }
  };
  
  const handleAddEmployee = async (): Promise<void> => {
    try {
      if (editingId.value) {
        const response: EmployeeResponse = await updateEmployee(editingId.value, newEmployee.value);
        employees.value = employees.value.map(emp => (emp.id === editingId.value ? response.data : emp));
        ElMessage.success('Employee updated successfully');
      } else {
        const response: EmployeeResponse = await addEmployee(newEmployee.value);
        employees.value.push(response.data); // Push should work now
        ElMessage.success('Employee added successfully');
      }
      resetForm();
    } catch (error: any) {
      ElMessage.error('Failed to save employee: ' + (error.response?.data?.message || 'Unknown error'));
      console.error('Add/Update error:', error);
    }
  };
  
  const handleEdit = (employee: Employee): void => {
    editingId.value = employee.id;
    newEmployee.value = { ...employee };
    showForm.value = true;
  };
  
  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteEmployee(id);
      employees.value = employees.value.filter(emp => emp.id !== id);
      ElMessage.success('Employee deleted successfully');
    } catch (error: any) {
      ElMessage.error('Failed to delete employee: ' + (error.response?.data?.message || 'Unknown error'));
      console.error(error);
    }
  };
  
  const cancelEdit = (): void => {
    resetForm();
  };
  
  const resetForm = (): void => {
    newEmployee.value = {
      fullName: '',
      department: '',
      contactNumber: '',
      email: '',
      dateOfJoining: '',
    };
    editingId.value = undefined;
    showForm.value = false;
  };
  </script>
  
  <style scoped>
  .employee-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .el-form {
    max-width: 400px;
    margin-bottom: 20px;
  }
  
  .el-table {
    margin-top: 20px;
  }
  </style>