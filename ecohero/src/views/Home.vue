<template>
  <TopBar />
  <Welcome />
  <GetStarted />
  <BottomBar />
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import Welcome from "@/components/Welcome.vue";
import GetStarted from "@/components/GetStarted.vue";
import BottomBar from "@/components/BottomBar.vue";

export default {
  name: "Home",
  components: {
    Welcome,
    GetStarted,
    BottomBar,
    TopBar,
  },
};
</script>
