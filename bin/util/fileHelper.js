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

const writeOutput =async (outputJson, outputPath, cb) => {
  try {
    const csv = await jsonToCsv.json2csvAsync(outputJson, {output:outputPath});
    if(fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
    }
    createFile(outputPath, csv, function (err) {
        if(err){
            console.log(err);
        }
        console.log(`Data Generated successfully. View the file at ${outputPath}`);
        cb();
      });

} catch (err) {
    console.log(err);
}
};

module.exports = {
  readFile,
  writeOutput,
};
