<template>
  <TopBar />
  <div v-if= "user">
    <CsvImport/>
  </div>
  <BottomBar />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BottomBar from "@/components/BottomBar.vue";
import TopBar from "@/components/TopBar.vue";
import CsvImport from '@/components/CsvImport.vue';

export default {
  components: {
    BottomBar,
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