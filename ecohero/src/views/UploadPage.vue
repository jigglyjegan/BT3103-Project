// This file is a standard template with all the user auth added in.
// For standardisation purposes, we will hence make our views 
// using this template.

// Changelog:
// V0: Created template

// INSTRUCTIONS for use
// 1) Make a COPY of this file
// 2) Rename the COPY to the filename needed
// 3) Do everything inside your COPY of this file
// 4) Delete this comment

// Note: DO NOT MODIFY THIS FILE.

<template>
  <div>
    Upload your data here!
    <CsvImport/>

  </div>
</template>

<script>
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import CsvImport from "@/components/CsvImport.vue"

export default {
    name: "UploadPage",
    components: {
    CsvImport,
  },
    
    data() {
        return {
            user: false,
        };
    },

//     mounted() {
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         this.user = user;
//       }
//     });
//   },
}

</script>

<style>
</style>