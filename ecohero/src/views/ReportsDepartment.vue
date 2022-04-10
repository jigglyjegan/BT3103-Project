<template>
  <TopBar />
  <div v-if= "user">
    <!-- Add stuff here -->
    <h1> Reports at Department Level </h1>
  </div>
  <ChartDepartment/>
  <BottomBar />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BottomBar from "@/components/BottomBar.vue";
import TopBar from "@/components/TopBar.vue";
import ChartDepartment from "@/components/ChartDepartment.vue";


export default {
  components: {
    BottomBar,
    TopBar,
    ChartDepartment
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