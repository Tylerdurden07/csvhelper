
const  {formateData, filterData, mergeColumns, createFormulaFieldColumn } = require("./operations/formatter");
const {readFile, writeOutput} = require("./fileHelper");
const {OPERATIONS} = require("./constants");


const transform = async (source, config, output) => {
    // READ data
    const sourceData = await readFile(source, false);
    console.log("read data");
    // Interpret config
   
    const configData = await readFile(config, true);
    console.log("read config");
    let outputData;

    try {
        if(configData) {
            if(configData.operation === OPERATIONS.FORMATTER){
                // formate the configured column
                outputData = formateData(configData.formateOptions, sourceData);
                console.log("got output data!", JSON.stringify(outputData));
            } else if(configData.operation === OPERATIONS.FILTER) {
                outputData = filterData(configData.predicateOptions, sourceData);
                console.log("got output data!", JSON.stringify(outputData));
            } else if(configData.operation === OPERATIONS.MERGE) {
                outputData = mergeColumns(configData.mergeOptions, sourceData);
                console.log("got output data!", JSON.stringify(outputData));
            } else if(configData.operation === OPERATIONS.FORMULA) {
                outputData = createFormulaFieldColumn(configData.mergeOptions, sourceData);
                console.log("got output data!", JSON.stringify(outputData));
            }
        }
    }

    catch(err){
        console.log(err);
    }
   

    await writeOutput(outputData,output);
}



module.exports = {
    transform
}