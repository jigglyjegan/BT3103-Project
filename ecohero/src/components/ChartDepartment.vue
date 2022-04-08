<template>
  <div v-if= "user">
    <select id = "type" @onchange="selectNum" v-model = "selected">
      <option disabled value="">Please select one</option>
      <option value="day">By Day</option>
      <option value="month">By Month</option>
      <option value="year">By Year</option>
    </select>
    <span>Selected: {{ selected }}</span>

    <select id = "metric" @onchange="selectNum" v-model = "selected1">
      <option disabled value="">Please select one</option>
      <option value="Electricity">Electricity</option>
      <option value="Water">Water</option>
      <option value="Carbon">Carbon</option>
      
    </select>
    <span>Selected: {{ selected1 }}</span>

    <select id = "dept" @onchange="selectNum" v-model = "selected2">
      <option disabled value="">Please select one</option>
      <option value="Finance">Finance</option>
      <option value="HR">HR</option>  
    </select>
    <span>Selected: {{ selected2 }}</span>
    <button id = "savebutton" type = "button" v-on:click="graphData(this.user)">Save</button>
    <line-chart :data="this.dataSet"></line-chart>
    <section class = "w-full flex justify-center">
        <div @click="refresh" class = "border-2 px-3 py-1 mt-6 cursor-pointer">refresh</div>
    </section>
  </div>
</template>



<script>
import firebaseApp from "@/firebase.js";
//import { onMounted, reactive } from "@vue/runtime-core";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'chartkick/chart.js';
import { getFirestore, getDoc, doc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
var usage = {};

export default {
  data() {
    
    
    return {
      user: false,
      selected : '',
      selected1: '',
      selected2: '',
      dataSet: {},
    }
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },

  //idea is to have a go button to refresh the page which are going to have new values
  methods: {
    refresh(){
        window.location.reload()
    },

    async graphData(user) {
      var uid = user.uid
      console.log(uid)
      var selectType = document.getElementById('type');
      var valueType = selectType.options[selectType.selectedIndex].value;
      var selectMetric = document.getElementById('metric');
      var valueMetric = selectMetric.options[selectMetric.selectedIndex].value;
      var selectDept = document.getElementById('dept');
      var valueDept = selectDept.options[selectDept.selectedIndex].value;
      //change "RcKRjeuP7ybC3KxJsDBthyQrDlI3" to uid
      var dataRef = valueDept + valueType + valueMetric //RcKRjeuP7ybC3KxJsDBthyQrDlI3" + valueDept + valueYear + valueMonth
      console.log(dataRef)
      //include dropdown option for collection
      const z = await getDoc(doc(db, "elecUsageDaily", dataRef))
      usage = z.data()
      
      const objectArray = Object.entries(usage);

      objectArray.forEach(([key, value]) => {
        console.log(key); 
        console.log(value); 
      });

      var sortedArray = objectArray.sort(function(a, b) { return a[0] - b[0]; });


      console.log(sortedArray)
      this.dataSet = sortedArray;
    }
  }
};
</script>

<style></style>
