import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Dashboard from '../views/Dashboard.vue';
import EmployeeList from '../views/EmployeeList.vue';
import EmployeeForm from '../views/EmployeeForm.vue';
import { useAuthStore } from '../store/authStore';

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
