<template>
  <body>
    <div class="pte-ltd">
      <h3>ECO HERO PTE LTD</h3>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contactUs">Contact Us</router-link> |
      <router-link to="/forgetPass" v-if="!user"> Forget Password </router-link>
      <router-view />
    </div>
  </body>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
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
  }
}
</script>

<style scoped>
body {
  background-color: black;
}

.pte-ltd {
  height: 55px;
  color: gray;
  text-align-last: center;
  font-family: "Josefin Sans";
  font-size: 15px;
}

.nav {
  padding: 30px;
  text-align: center;
}

.nav a {
  font-weight: bold;
  color: brown;
}

.nav a.router-link-exact-active {
  color: #32a96f;
}
</style>
