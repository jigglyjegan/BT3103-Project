<template>
  <img id="logo" src="@/assets/icon.png" />
  <div id="notLogged" v-if= "!user">
    <!-- Not logged in -->
    <div class="nav">
      <router-link to="/registration"> Sign Up </router-link> | 
      <router-link to="/login"> Login </router-link>
    </div>
  </div>

  <div id="logged" v-if= "user">
    <div class="nav">
      <router-link to="/"> Home </router-link> | 
      <router-link to="/overview"> Overview </router-link> | 
      <router-link to="/data"> Data </router-link> |
      <router-link to="/reports"> Reports </router-link> |
      <button id="userBtn" type="button" v-if="user">
        {{user.displayName}}
      </button>
    </div>


    <div class="account">
      <Dropdown title = "Account Settings" :items="account"/> 
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dropdown from "@/components/Dropdown.vue"


export default {
  name: "TopBar",
  components: {
    Dropdown,

  },
  data() {
    return {
      user: false,
      account:[
        {title: 'Change Password',
        },

        {title: 'Change Limit',
        },

        {title: 'Logout',        
        }
      ]
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

<style scoped>
img {
  position: left;
}

#notLogged {
  position: right;
}

#logged {
  position: left;
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
