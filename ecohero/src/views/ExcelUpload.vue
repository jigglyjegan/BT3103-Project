<template>
  <div id="fileUpload">
    <input type="file" id="inputFile"><br>
  </div>
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
  },

  methods: {
    onChange(event) {

      /*const csvFilePath='<path to csv file>'
      const csv=require('csvtojson')
      const jsonArray=await csv().fromFile(csvFilePath);*/
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result
          const lines = result.split('\n') 
          const header = lines[0].split(',') 
          const output = lines.slice(1).map(line => {
          const fields = line.split(',') 
          return Object.fromEntries(header.map((h, i) => [h, fields[i]])) 
            })

            console.log(output)
          }
      }
    }
  }
  
}

</script>

<style>

</style>