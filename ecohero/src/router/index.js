import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import ContactUs from "@/views/ContactUs.vue";
import ExcelUpload from "@/views/ExcelUpload.vue"
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/about",
    name: "About",
    component: About,
  },

  {
    path: "/excel",
    name: "Excel",
    component: ExcelUpload,
  },

  {
    path: "/contactUs",
    name: "ContactUs",
    component: ContactUs,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
