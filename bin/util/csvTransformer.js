
const  {formateData, filterData, mergeColumns, createFormulaFieldColumn } = require("./operations/formatter");
const {readFile, writeOutput} = require("./fileHelper");
const {OPERATIONS} = require("./constants");


const transform = async (source, config, output,cb) => {
    const sourceData = await readFile(source, false);
    const configData = await readFile(config, true);
    let outputData;

    try {
        if(configData) {
            if(configData.operation === OPERATIONS.FORMATTER){
                outputData = formateData(configData.formateOptions, sourceData);
            } else if(configData.operation === OPERATIONS.FILTER) {
                outputData = filterData(configData.predicateOptions, sourceData);
            } else if(configData.operation === OPERATIONS.MERGE) {
                outputData = mergeColumns(configData.mergeOptions, sourceData);
            } else if(configData.operation === OPERATIONS.FORMULA) {
                outputData = createFormulaFieldColumn(configData.formulaFieldOptions, sourceData);
            }
        }
    }

    catch(err){
        console.log(err);
    }
    return await writeOutput(outputData,output, cb);
}

module.exports = {
    transform
}