<template>
  <div class = "login">
      <section class = "forms">
          <form class="register">
              <h2>Register Today!</h2>
              <input type = "email" placeholder="Email Address" v-model = "register_form.email"/>
              <input type = "password" placeholder="Password" v-model = "register_form.password"/>
              <input type = "submit" value = "Reigister"/>
          </form>

          <form class="login">
              <h2>Login Here</h2>
              <input type = "email" placeholder="Email Address" v-model = "login_form.email"/>
              <input type = "password" placeholder="Password" v-model = "login_form.password"/>
              <input type = "submit" value = "Login"/>
          </form>
      </section>
  </div>
</template>

<script>
import { ref } from 'vue'
//import { useStore } from 'vuex'

export default {
    setup () {
        const login_form = ref({});
        const register_form = ref({});
        //const store = useStore();

        return {
            login_form,
            register_form
        }
    }
}
</script>

<style>

</style>