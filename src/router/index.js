import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactManagerView from '../views/ContactManagerView.vue'
import AddContactView from '../views/AddContactView.vue'
import EditContactView from '../views/EditContactView.vue'
import ViewContactView from '../views/ViewContactView.vue'
import PageNotFound from '../components/PageNotFoundComponent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:'/contacts',
    component: HomeView
  },
  {
    path: '/contacts',
    name: 'contactManager',
    component: ContactManagerView
  },
  {
    path: '/contacts/add',
    name: 'addContact',
    component: AddContactView
  },
  {
    path: '/contacts/edit/:contactId',
    name: 'editContact',
    component: EditContactView
  },
  {
    path: '/contacts/show/:contactId',
    name: 'viewContact',
    component: ViewContactView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'pageNotFound',
    component:PageNotFound,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
