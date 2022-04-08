// This file is a standard template with all the user auth added in. // For
standardisation purposes, we will hence make our views // using this template.
// Changelog: // V0: Created template // INSTRUCTIONS for use // 1) Make a COPY
of this file // 2) Rename the COPY to the filename needed // 3) Do everything
inside your COPY of this file // 4) Delete this comment // Note: DO NOT MODIFY
THIS FILE.

<template>
  <div v-if="user">
    <TopBar />
    <img src="../assets/ecohero.png" alt="" />
    <h1>Change your thresholds here</h1>
    <p>
      This page allows you to set your thresholds for the 3 respective metrics
    </p>
    <p>If you exceed your limits, an alert will pop up!</p>
    <form id="form">
      <label for="carbon">Carbon: </label>
      <input
        type="text"
        id="carbon"
        required=""
        placeholder="Enter Threshold"
      />
      <br /><br />
      <label for="water">Water: </label>
      <input type="text" id="water" required="" placeholder="Enter Threshold" />
      <br /><br />
      <label for="electricity ">Electricity: </label>
      <input
        type="number"
        id="electricity"
        required=""
        placeholder="Enter Threshold"
      />
      <br /><br />
      <div class="save">
        <button id="saveButton" type="button" v-on:click="savetofs()">
          Save
        </button>
        <br /><br />
      </div>
    </form>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import TopBar from "@/components/TopBar.vue";

const db = getFirestore(firebaseApp);

export default {
  components: {
    TopBar,
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

  methods: {
    async savetofs() {
      var uid = this.user.uid;
      console.log(uid);
      this.carbon = document.getElementById("carbon").value;
      this.water = document.getElementById("water").value;
      this.electricity = document.getElementById("electricity").value;
      alert("Saving Metrics");
      try {
        const docRef = await setDoc(doc(db, "limits", uid), {
          electricity: this.electricity,
          water: this.water,
          carbon: this.carbon,
        });
        console.log(docRef);
        document.getElementById("form").reset();
        this.$emit("added");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  },
};
</script>

<style></style>
