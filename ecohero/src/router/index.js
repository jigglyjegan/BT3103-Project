import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import ContactUs from "@/views/ContactUs.vue";
import UploadPage from "@/views/UploadPage.vue";
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
    path: "/contactUs",
    name: "ContactUs",
    component: ContactUs,
  },

  {
    path: "/UploadPage",
    name: "UploadPage",
    component: UploadPage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
