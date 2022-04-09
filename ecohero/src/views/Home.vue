<template>
  <TopBar />
  <Welcome />
  <img src="../assets/ecohero.png" alt="">
  <!--<GetStarted />-->
  <HomeChart/>
  <Footer/>
  <Logout/>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import Welcome from "@/components/Welcome.vue";
//import GetStarted from "@/components/GetStarted.vue";
//import BottomBar from "@/components/BottomBar.vue";
import Logout from "@/components/Logout.vue"
import Footer from "@/components/Footer.vue"
import HomeChart from "@/components/HomeChart.vue"

export default {
  name: "Home",
  components: {
    Welcome,
   // GetStarted,
   // BottomBar,
    TopBar,
    Logout,
    Footer,
    HomeChart
  },
};
</script>
