<template>
  <TopBar />
  <AboutApp />
  <BottomBar />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AboutApp from "@/components/AboutApp.vue";
import BottomBar from "@/components/BottomBar.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "About",
  components: {
    BottomBar,
    AboutApp,
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