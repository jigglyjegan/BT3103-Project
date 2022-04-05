// This script contains functions for reading the csv data file that the user uploads
// We have abstracted the functions out as the script is relatively long, due to the
// database rules we have in place.

async function updateDaily(csvFile) {
  // convert csv to json
  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target.result;
    const lines = result.split("\n");
    const header = lines[0].split(",");
    const output = lines.slice(1).map((line) => {
      const fields = line.split(",");
      return Object.fromEntries(header.map((h, i) => [h, fields[i]]));
    });

    console.log(output);
    // var json = JSON.parse(output) //parsing but not sure how to get the {{json}} out
  };
}

async function getDaily(uid, year, month, metric) {
  depts = await getDocs(collection(db, depts, String(uid)))
  res = {}
  for (var dept in depts) {
    key = String(uid) + String(dept) + String(year) + String(month)
    res[String(dept)] = await getDocs(collection(db, metric, key))
  }
  return res
}