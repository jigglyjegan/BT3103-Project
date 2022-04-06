<template>
  <TopBar />
  <Welcome />
  <!--<GetStarted />-->
  <Mission/>
  <Team/>
  <Footer/>
  <Logout/>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import Welcome from "@/components/Welcome.vue";
//import GetStarted from "@/components/GetStarted.vue";
//import BottomBar from "@/components/BottomBar.vue";
import Logout from "@/components/Logout.vue"
import Mission from "@/components/Mission.vue"
import Footer from "@/components/Footer.vue"
import Team from "@/components/Team.vue"

export default {
  name: "Home",
  components: {
    Welcome,
   // GetStarted,
   // BottomBar,
    TopBar,
    Logout,
    Mission,
    Footer,Team
  },
};
</script>
