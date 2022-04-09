<template>
    <div v-if="user"> 
        <h1>Your current metrics</h1>
        <p>Click here to refresh</p>
        <button id = "refreshbutton" type = "button" v-on:click="graphData(this.user)">Refresh</button>
        <p>Carbon Emissions</p>
        <pie-chart :donut="true" :data="this.dataCarbon" :colors="['red', 'turquoise']"></pie-chart>
        <p>Water Usage</p>
        <pie-chart :donut="true" :data="this.dataWater" :colors="['red', 'turquoise']"></pie-chart>
        <p>Electricity Usage</p>
        <pie-chart :donut="true" :data="this.dataElectric" :colors="['red', 'turquoise']"></pie-chart>

 
    </div>
    

  
</template>

<script>
import firebaseApp from "@/firebase.js";
//import { onMounted, reactive } from "@vue/runtime-core";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'chartkick/chart.js';
import { getFirestore, getDoc, doc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
 
    data() {
        return {
         user: false,
         dataElectric: {},
         dataWater: {},
         dataCarbon: {},

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
        async graphData(user) {
            var uid = user.uid
            console.log(uid)
            const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            const date = new Date()
            var monthName = month[date.getMonth()]
            const year = date.getFullYear()

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
            var dataRef2 = uid + "HR" + year 

            var electricityFinance = await getDoc(doc(db, "/elecUsageMthly",dataRef1))
            var electricityHR = await getDoc(doc(db, "/elecUsageMthly",dataRef2))
            var electricityFinanceValue = electricityFinance.data()
            console.log(electricityFinanceValue)
            var electricityHRValue = electricityHR.data()
            var thisMonthElectric = electricityFinanceValue[String(monthName)] + electricityHRValue[String(monthName)]
            console.log(thisMonthElectric)
            if (electricityThresholdValue - thisMonthElectric <= 0 ){
                this.dataElectric = {'Used': thisMonthElectric, 'Left': 0}
            }
            else{
                this.dataElectric = {'Used': thisMonthElectric, 'Left': electricityThresholdValue - thisMonthElectric}
            }

            var waterFinance = await getDoc(doc(db, "/waterUsageMthly",dataRef1))
            var waterHR = await getDoc(doc(db, "/waterUsageMthly",dataRef2))
            var waterFinanceValue = waterFinance.data()
            console.log(waterFinanceValue)
            var waterHRValue = waterHR.data()
            var thisMonthWater = waterFinanceValue[String(monthName)] + waterHRValue[String(monthName)]
            console.log(thisMonthWater)
            if (waterThresholdValue - thisMonthWater <= 0 ){
                this.dataWater = {'Used': thisMonthWater, 'Left': 0}
            }
            else{
                this.dataWater = {'Used': thisMonthWater, 'Left': waterThresholdValue - thisMonthWater}
            }


            var carbonFinance = await getDoc(doc(db, "/carbonUsageMthly",dataRef1))
            var carbonHR = await getDoc(doc(db, "/carbonUsageMthly",dataRef2))
            var carbonFinanceValue = carbonFinance.data()
            console.log(carbonFinanceValue)
            var carbonHRValue = carbonHR.data()
            var thisMonthCarbon = carbonFinanceValue[String(monthName)] + carbonHRValue[String(monthName)]
            console.log(thisMonthCarbon)
           if (carbonThresholdValue - thisMonthCarbon <= 0 ){
                this.dataCarbon = {'Used': thisMonthCarbon, 'Left': 0}
            }
            else{
                this.dataCarbon = {'Used': thisMonthCarbon, 'Left': carbonThresholdValue - thisMonthCarbon}
            }

        }
    }



}
</script>

<style>

</style>