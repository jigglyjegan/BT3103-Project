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
import { getFirestore, getDoc, doc, setDoc} from "firebase/firestore";

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
            const date = new Date()
            var month = date.getMonth() + 1
            if (month < 10){
                var monthName = String(month).padStart(2,'0')
            }
            else {
                monthName = String(month)
            }
            console.log("month:" + monthName)
            const year = date.getFullYear()

            var userThreshold = await getDoc(doc(db, "/limits", uid))
            if (userThreshold.exists()){
                var userThresholdValue = userThreshold.data() 
                console.log(userThresholdValue)
                var carbonThresholdValue = userThresholdValue['carbon']
                console.log(carbonThresholdValue)
                var waterThresholdValue = userThresholdValue['water']
                console.log(waterThresholdValue)
                var electricityThresholdValue = userThresholdValue['electricity']
                console.log(electricityThresholdValue)
            } else {
                setDoc(doc(db, "/limits", uid),{
                    'carbon':0,
                    'water':0,
                    'electricity':0
                })

                carbonThresholdValue = 0
                waterThresholdValue = 0
                electricityThresholdValue = 0



            }

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
            electricityFinanceValue[monthName] + electricityITValue[monthName] + electrictyLogisticsValue[monthName]
            console.log(thisMonthElectric)
            if (electricityThresholdValue - thisMonthElectric <= 0 ){
                this.dataElectric = {'Used': thisMonthElectric, 'Left': 0}
            }
            else{
                this.dataElectric = {'Used': thisMonthElectric, 'Left': electricityThresholdValue - thisMonthElectric}
            }

            var waterFinance = await getDoc(doc(db, "/waterUsageMthly",dataRef1))
            var waterIT = await getDoc(doc(db, "/waterUsageMthly",dataRef2))
            var waterLogistics = await getDoc(doc(db, "/waterUsageMthly",dataRef3))
            var waterFinanceValue = waterFinance.data()
            console.log(waterFinanceValue)
            var waterITValue = waterIT.data()
            console.log(waterITValue)
            var waterLogisticsValue = waterLogistics.data()
            console.log(waterLogisticsValue)
            var thisMonthWater = waterFinanceValue[monthName] + waterITValue[monthName] + waterLogisticsValue[monthName]
            console.log(thisMonthWater)
            if (waterThresholdValue - thisMonthWater <= 0 ){
                this.dataWater = {'Used': thisMonthWater, 'Left': 0}
            }
            else{
                this.dataWater = {'Used': thisMonthWater, 'Left': waterThresholdValue - thisMonthWater}
            }


           var carbonFinance = await getDoc(doc(db, "/carbonUsageMthly",dataRef1))
            var carbonIT = await getDoc(doc(db, "/carbonUsageMthly",dataRef2))
            var carbonLogistics = await getDoc(doc(db, "/carbonUsageMthly",dataRef3))
            var carbonFinanceValue = carbonFinance.data()
            console.log(carbonFinanceValue)
            var carbonITValue = carbonIT.data()
            console.log(carbonITValue)
            var carbonLogisticsValue = carbonLogistics.data()
            console.log(carbonLogisticsValue)
            var thisMonthCarbon = carbonFinanceValue[monthName] + carbonITValue[monthName] + carbonLogisticsValue[monthName]
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