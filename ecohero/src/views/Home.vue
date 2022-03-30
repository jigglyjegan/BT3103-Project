<template>
  <TopBar />
  <Welcome />
  <GetStarted />
  <BottomBar />
  <Logout/>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import Welcome from "@/components/Welcome.vue";
import GetStarted from "@/components/GetStarted.vue";
import BottomBar from "@/components/BottomBar.vue";
import Logout from "@/components/Logout.vue"

export default {
  name: "Home",
  components: {
    Welcome,
    GetStarted,
    BottomBar,
    TopBar,
    Logout
  },
};
</script>
