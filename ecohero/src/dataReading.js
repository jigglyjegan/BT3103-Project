// This script contains functions for reading the csv data file that the user uploads
// We have abstracted the functions out as the script is relatively long, due to the
// database rules we have in place.
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

async function updateFs(file, uid) {
  var reader = new FileReader(); // Init file reader
  reader.onload = function () {
    // Define onload method
    var content = reader.result;
    //split csv file using "\r" for new line (each row)
    var lines = content.split('\r');
    for (var i = 1; i < (lines.length -1); i++) {
      var row = lines[i].split(",");
      console.log(row); // Debugging purposes
      var dept = row[0];
      var date = row[1].split("/");
      var day = date[0];
      var month = date[1];
      var year = date[2];
      if (day.length < 2) day = "0" + day;
      if (month.length < 2) month = "0" + month;
      var carbon = parseFloat(row[2]);
      var elec = parseFloat(row[3]);
      var water = parseFloat(row[4]);
      var key = uid + dept + year + month;
      setDoc(doc(db, "carbonUsageDaily", key), {
        [day]: carbon,
      }, {merge : true});
      setDoc(doc(db, "elecUsageDaily", key), {
        [day]: elec,
      }, {merge : true});
      setDoc(doc(db, "waterUsageDaily", key), {
        [day]: water,
      }, {merge : true});
    }
    console.log("Updated FS");
  };
  reader.readAsText(file);
}

// async function getDaily(uid, year, month, metric) {
//   depts = await getDocs(collection(db, depts, String(uid)));
//   res = {};
//   for (var dept in depts) {
//     key = String(uid) + String(dept) + String(year) + String(month);
//     res[String(dept)] = await getDocs(collection(db, metric, key));
//   }
//   return res;
// }

export { updateFs } 
