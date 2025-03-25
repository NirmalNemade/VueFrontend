import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Dashboard from '../views/Dashboard.vue';
import EmployeeList from '../views/EmployeeList.vue';
import EmployeeForm from '../views/EmployeeForm.vue';
import { useAuthStore } from '../store/authStore';
import MyModules from '../views/MyModules.vue';
import BrowseModules from '../views/BrowseModules.vue';
import ProgressReport from '../views/ProgressReport.vue';
import ModulesList from "../views/ModulesList.vue";
import AddModule from "../views/AddModule.vue";
import UpdateModule from "../components/UpdateModule.vue";


const routes = [
  { path: '/', component: Login },
  { path: '/signup', component: Signup },
  { 
    path: '/dashboard', 
    component: Dashboard, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/employees', 
    component: EmployeeList, 
    meta: { requiresAuth: true }
  },
  { 
    path: '/employees/add', 
    component: EmployeeForm, 
    meta: { requiresAuth: true }
  },
  { 
    path: '/employees/edit/:id', 
    component: EmployeeForm, 
    meta: { requiresAuth: true }
  },
  { path: '/my-modules', component: MyModules },
  { path: '/browse', component: BrowseModules },
  { path: '/progress', component: ProgressReport },
  { path: "/module", component: ModulesList },
  { path: "/add-module", component: AddModule },
  {
    path: '/update-module/:id',
    name: 'UpdateModule',
    component: UpdateModule
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
