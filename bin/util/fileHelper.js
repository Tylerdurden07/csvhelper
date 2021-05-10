const CSVToJSON = require("csvtojson");
const jsonToCsv = require('json-2-csv');
const createFile = require('create-file');
var fs = require("fs");

const readFile = async (path, isJSON) => {
  let data;
  try {
    data = isJSON
      ? JSON.parse(fs.readFileSync(path, "utf8"))
      : await CSVToJSON().fromFile(path);
  } catch (err) {
    console.log(err);
  }
  return data;
};

const writeOutput =async (outputJson, outputPath) => {

    console.log("output json in write method",outputJson);
  // Write JSON array to a file
  // convert JSON array to CSV string
  try {
    const csv = await jsonToCsv.json2csvAsync(outputJson, {output:outputPath});

    // print CSV string
    console.log(csv);

    // write CSV to a file
    //fs.writeFileSync(outputPath, csv, { flag: 'wx' });
    //console.log("dirname", process.cwd()); /Users/gnanasekar/Desktop
    //console.log("outputpath given", outputPath);
    if(fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
    }
    createFile(outputPath, csv, function (err) {
        if(err){
            console.log(err);
        }
      });

} catch (err) {
    console.log(err);
}
};

module.exports = {
  readFile,
  writeOutput,
};
