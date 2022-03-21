import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import ContactUs from '@/views/ContactUs.vue'
const routes = [
{
path: '/',
name: 'Home',
component: Home
},

{  
path: '/about',
name: 'About',
component: About
},

{
path: '/contactUs',
name: 'ContactUs',
component: ContactUs
}
]
const router = createRouter({
history: createWebHistory(),
routes
})
export default router