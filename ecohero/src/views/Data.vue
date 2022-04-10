<template>
  <NewTopBar />
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
import NewTopBar from "@/components/NewTopBar.vue";
import CsvImport from '@/components/CsvImport.vue';

export default {
  components: {
    Logout,
    Footer,
    NewTopBar,
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