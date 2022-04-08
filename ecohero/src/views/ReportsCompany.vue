<template>
  <TopBar />
  <div v-if= "user">
    <!-- Add stuff here -->
    This is our Reports Page
  </div>
  <ChartCompany/>
  <BottomBar />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BottomBar from "@/components/BottomBar.vue";
import TopBar from "@/components/TopBar.vue";
import ChartCompany from "@/components/ChartCompany.vue";


export default {
  components: {
    BottomBar,
    TopBar,
    ChartCompany
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