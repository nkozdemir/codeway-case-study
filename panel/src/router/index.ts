import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SignIn from '../views/SignIn.vue';
import Home from '../views/Home.vue';

const routes = [
  { path: '/signin', component: SignIn },
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true } // Protect Home page
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard to check authentication
router.beforeEach((to, _, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        next('/signin'); // Redirect to sign-in if not logged in
      } else {
        next(); // Proceed to the requested route
      }
    });
  } else {
    next(); // Allow navigation for routes without authentication requirement
  }
});

export default router;
