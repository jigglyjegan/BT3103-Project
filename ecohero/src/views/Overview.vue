<template>
  <TopBar />
  <div v-if= "user">
    <!-- Add stuff here -->
    This is our Overview Page
  </div>
  <Footer />
  <Logout/>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "@/components/Footer.vue"
import Logout from "@/components/Logout.vue"
import TopBar from "@/components/TopBar.vue";

export default {
  components: {
    Footer,
    Logout,
    TopBar,
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