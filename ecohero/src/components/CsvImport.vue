<template>
<div id="import">
    <!-- <img alt="Vue logo" src="./assets/logo.png" width="25%" /> -->
    <vue-csv-import
      v-model="csv"
      :autoMatchFields="true"
      :autoMatchIgnoreCase="true"
      :map-fields="[
        'ID',
        'Date',
        'Department',
        'Carbon (metric tonne)',
        'Electricity (kwh)',
        'Water (m3)',
      ]"
    >
    </vue-csv-import>
    <div style="padding-top: 50px">
      <p>Results</p>
      {{ csv }}
    </div>
  </div>
</template>

<script>
import { VueCsvImport } from "vue-csv-import";

export default {
  name: "CsvImport",
  components: {
    VueCsvImport,
  },
  data() {
    return {
      csv: null,
    };
  },
};
</script>

<style>
#CsvImport {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>