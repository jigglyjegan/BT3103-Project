<template>
  <TopBar />
  <AboutApp />
  <Mission/>
  <Team/>
  <Footer/>
  <Logout/>

</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AboutApp from "@/components/AboutApp.vue";
import TopBar from "@/components/TopBar.vue";
import Mission from "@/components/Mission.vue"
import Footer from "@/components/Footer.vue"
import Logout from "@/components/Logout.vue"
import Team from "@/components/Team.vue"

export default {
  name: "About",
  components: {
    AboutApp,
    TopBar,
    Logout,
    Mission,
    Footer,
    Team,

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