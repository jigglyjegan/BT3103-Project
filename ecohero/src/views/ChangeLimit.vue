// This file is a standard template with all the user auth added in. // For
standardisation purposes, we will hence make our views // using this template.
// Changelog: // V0: Created template // INSTRUCTIONS for use // 1) Make a COPY
of this file // 2) Rename the COPY to the filename needed // 3) Do everything
inside your COPY of this file // 4) Delete this comment // Note: DO NOT MODIFY
THIS FILE.

<template>
  <div v-if="user">
    <NewTopBar />
    <img src="../assets/ecohero.png" alt="" />
    <h1>Change your thresholds here</h1>
    <p>
      This page allows you to set your thresholds for the 3 respective metrics
    </p>
    <p>If you exceed your limits, an alert will pop up!</p>
    <form id="form">
      <label for="carbon">Carbon (metric tonnes): </label>
      <input
        type="text"
        id="carbon"
        required=""
        placeholder="Enter Threshold"
      />
      <br /><br />
      <label for="water">Water (cubic metres): </label>
      <input type="text" id="water" required="" placeholder="Enter Threshold" />
      <br /><br />
      <label for="electricity ">Electricity (kWh): </label>
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
        <p>Check if you have exceeded your thresholds here</p>
         <button id="checkButton" type="button" v-on:click="checkLimits()">
          Check
        </button>
        <br /><br />
      </div>
    </form>
    <Footer/>
    <Logout/>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import NewTopBar from "@/components/NewTopBar.vue";
import Logout from "@/components/Logout.vue"
import Footer from "@/components/Footer.vue"

const db = getFirestore(firebaseApp);
export default {
  components: {
    NewTopBar,
    Logout,
    Footer
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

    async checkLimits(){
      var notExceededAny = true
      const date = new Date()
      var month = date.getMonth() + 1
        if (month < 10){
          console.log("here")
          var monthName = String(month).padStart(2,'0')
        }
        else {
          monthName = String(month)
        }
      const year = date.getFullYear()
      var uid = this.user.uid;
      console.log(uid);

      var userThreshold = await getDoc(doc(db, "/limits", uid));
      var userThresholdValue = userThreshold.data() 
      console.log(userThresholdValue)
      var carbonThresholdValue = userThresholdValue['carbon']
      console.log(carbonThresholdValue)
      var waterThresholdValue = userThresholdValue['water']
      console.log(waterThresholdValue)
      var electricityThresholdValue = userThresholdValue['electricity']
      console.log(electricityThresholdValue)

      var dataRef1 = uid + "Finance" + year;
      var dataRef2 = uid + "IT" + year 
      var dataRef3 = uid + "Logistics" + year

      var electricityFinance = await getDoc(doc(db, "/elecUsageMthly",dataRef1))
      var electricityIT = await getDoc(doc(db, "/elecUsageMthly",dataRef2))
      var electricityLogistics = await getDoc(doc(db, "/elecUsageMthly",dataRef3))
      var electricityFinanceValue = electricityFinance.data()
      console.log(electricityFinanceValue)
      var electricityITValue = electricityIT.data()
      console.log(electricityITValue)
      var electrictyLogisticsValue = electricityLogistics.data()
      console.log(electrictyLogisticsValue)
      var thisMonthElectric = 
      electricityFinanceValue[String(monthName)] + electricityITValue[String(monthName)] + electrictyLogisticsValue[String(monthName)]
      console.log(thisMonthElectric)

      var waterFinance = await getDoc(doc(db, "/waterUsageMthly",dataRef1))
      var waterIT = await getDoc(doc(db, "/waterUsageMthly",dataRef2))
      var waterLogistics = await getDoc(doc(db, "/waterUsageMthly",dataRef3))
      var waterFinanceValue = waterFinance.data()
      console.log(waterFinanceValue)
      var waterITValue = waterIT.data()
      console.log(waterITValue)
      var waterLogisticsValue = waterLogistics.data()
      console.log(waterLogisticsValue)
      var thisMonthWater = waterFinanceValue[String(monthName)] + waterITValue[String(monthName)] + waterLogisticsValue[String(monthName)]
      console.log(thisMonthWater)

      var carbonFinance = await getDoc(doc(db, "/carbonUsageMthly",dataRef1))
      var carbonIT = await getDoc(doc(db, "/carbonUsageMthly",dataRef2))
      var carbonLogistics = await getDoc(doc(db, "/carbonUsageMthly",dataRef3))
      var carbonFinanceValue = carbonFinance.data()
      console.log(carbonFinanceValue)
      var carbonITValue = carbonIT.data()
      console.log(carbonITValue)
      var carbonLogisticsValue = carbonLogistics.data()
      console.log(carbonLogisticsValue)
      var thisMonthCarbon = carbonFinanceValue[String(monthName)] + carbonITValue[String(monthName)] + carbonLogisticsValue[String(monthName)]
      console.log(thisMonthCarbon)

      if(waterThresholdValue < thisMonthWater){
        alert("You have exceeded your water usage limit")
        notExceededAny = false
      }
      if(carbonThresholdValue < thisMonthCarbon){
        alert("You have exceeded your carbon emissions limit")
        notExceededAny = false
      }
      if(electricityThresholdValue < thisMonthElectric){
        alert("You have exceeded your electricity usage limit")
        notExceededAny = false
      }

      if(notExceededAny){
        alert("No metrics exceeded")
      }

    }


  },
};
</script>

<style></style>
