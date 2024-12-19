import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';

const routes = [
  {
    path: '/admin',
    meta: { title: 'ArtDecco', name: 'Index', parent: true },
    component: () => import('../components/Layouts/IndexLayout.vue'),
    children: [
      {
        path: '/admin_login',
        alias: '/admin_login',
        component: () => import('../views/admin/AdminLoginView.vue'),
        meta: { title: 'Admin Login', ParentName: 'Index'}
      },
    ]
  },
 
  {
    path: '/signup',
    alias: '/signup',
    component: () => import('../components/Modals/customers/SignupModal.vue'), 
    meta: { title: 'Landing Page', ParentName: 'Home'}
  },

 
 
  {
    path: "/",
    meta: { title: "ArtDecco - Home", name: "Home", parent: true },
    component: () => {
      const role = store.state.user;
  
      if (role) {
        return import("../components/Layouts/customers/AuthenticatedLayout.vue");
      } else {
        return import("../components/Layouts/customers/IndexLayout.vue");
      }
    },
    key: () => {
      const role = store.state.user;
      return role ? "authenticated-layout" : "index-layout"; // Key changes based on role
    }
 ,
  
    children: [
      {
        path: '/home',
        alias: '/home',
        component: () => import('../views/customers/LandingPageView.vue'), 
        meta: { title: 'Landing Page', ParentName: 'Home'}
      },
      {
        path: '/about',
        alias: '/about',
        component: () => import('../views/customers/AboutView.vue'),
        meta: { title: 'About', ParentName: 'Home'}
      },
      {
        path: '/collections',
        alias: '/collections',
        component: () => import('../views/customers/CollectionsView.vue'),
        meta: { title: 'Collections', ParentName: 'Home'}
      },
      {
        path: '/catalogs',
        alias: '/catalogs',
        component: () => import('../views/customers/CatalogsView.vue'),
        meta: { title: 'Catalogs', ParentName: 'Home'}
      },
      {
        path: '/products',
        alias: '/products',
        component: () => import('../views/customers/ProductsView.vue'),
        meta: { title: 'Products', ParentName: 'Home'}
      },
      {
        path: '/products/:id',
        alias: '/products/:id',
        component: () => import('../views/customers/SelectedProductView.vue'),
        meta: { title: 'Products', ParentName: 'Home'}
      },
      {
        path: '/preview/:sku',
        alias: '/preview/:sku',
        component: () => import('../views/customers/PreviewProduct.vue'),
        meta: { title: 'Preview Product', ParentName: 'Home'}
      },
      {
        path: '/my-cart/',
        alias: '/my-cart/',
        component: () => import('../views/customers/guestCart.vue'),
        meta: { title: 'My Cart', ParentName: 'Home'}
      },
      
      ...(() => {
        const role = store.state.user; // Check if the user has a valid role from the store
  
        if (role) { // If user is authenticated (has a role)
          return [
            {
              path: '/homes/',
              alias: '/homes/',
              component: () => import('../views/customers/LandingPageView.vue'), 
              meta: { title: 'Landing Page', ParentName: 'Home'}
            },
            {
              path: '/cart/',
              alias: '/cart/',
              component: () => import('../views/customers/ShoppingCartView.vue'),
              meta: { title: 'My Shopping Cart', ParentName: 'Home'}
            },
            {
              path: '/profile/',
              alias: '/profile/',
              component: () => import('../views/customers/UserAccount/profileView.vue'), 
              meta: { title: 'User Account', ParentName: 'Home'}
            }
          ];
        } else {
          return []; // If not authenticated, return no additional routes
        }
      })()
    ]
  },
  
  {
    path: '/home',
    meta: { title: 'Home', name: 'Home', parent: true },
    component: () => import('../components/Layouts/DashboardLayout.vue'),
    children: [
      {
        path: '/admin_dashboard',
        alias: '/admin_dashboard',
        component: () => import('../views/admin/AdminDashboardView.vue'),
        meta: { title: 'Admin Dashboard', ParentName: 'Home'}
      },
      {
        path: '/create_product',
        alias: '/create_product',
        component: () => import('../views/admin/CreateProductView.vue'),
        meta: { title: 'Create Product', ParentName: 'Home'}
      },
      {
        path: '/list_products',
        alias: '/list_products',
        component: () => import('../views/admin/ListProductView.vue'),
        meta: { title: 'List of Products', ParentName: 'Home'}
      },
      {
        path: '/user_menu',
        alias: '/user_menu',
        component: () => import('../views/admin/UserMenuListView.vue'),
        meta: { title: 'User Menu', ParentName: 'Home'}
      },
      {
        path: '/assign_user',
        alias: '/assign_user',
        component: () => import('../views/admin/AssignUserMenuView.vue'),
        meta: { title: 'Assign User Menu', ParentName: 'Home'}
      },
    ]
  },  
]
 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const role = store.state.user;
  if (to.matched.some(record => record.meta.Index)) {
      if (!role) {
          next({ path: '/artdecco'})
      } else {
        document.title = "Artdecco - " + to.meta.title;
        next()
      }
  }
  else {
    document.title = "Artdecco - " + to.meta.title;
      next()
  }
})

export default router
