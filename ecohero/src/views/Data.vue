<template>
  <TopBar />
  <div v-if= "user">
    <CsvImport/>
  </div>
  <Footer />
  <Logout/>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Logout from "@/components/Logout.vue"
import Footer from "@/components/Footer.vue"
import TopBar from "@/components/TopBar.vue";
import CsvImport from '@/components/CsvImport.vue';

export default {
  components: {
    Logout,
    Footer,
    TopBar,
    CsvImport,
  },

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};
</script>

<style>
</style>