<template>
  <body>
    <div class="pte-ltd">
      <h3>ECO HERO PTE LTD</h3>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contactUs">ContactUs</router-link>
      <router-view />
    </div>
  </body>
</template>




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

#nav a {
  font-weight: bold;
  color: white;
}
</style>
