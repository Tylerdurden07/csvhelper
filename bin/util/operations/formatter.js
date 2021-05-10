const moment = require('moment');

const formateData = (formateOptions, data) => {
    if(formateOptions){
        const output = data.map(eachRow => {
            let dateObj = new Date(eachRow[formateOptions.columnName]);
            return { ...eachRow, [formateOptions.columnName] : moment(dateObj).format(formateOptions.formate)}
        });
        return output;
    }
    else {
        throw Error("No Formatting options provided");
    }
}

const filterData = (filterOptions, data) => {
    if(filterOptions && filterOptions.length > 0) {
        let filterData = data;
        filterOptions.forEach((eachOption) => {
            filterData = filterData.filter((eachRow) => {
                let dynamicCondition = `${eachRow[eachOption.columnName]} ${eachOption.operator} ${eachOption.value}`;
                let evaluate = (condition) => Function(`return ${condition}`)();
                return !evaluate(dynamicCondition);
            });
        });
        return filterData;
    } else {
        console.log("Predicate options is not provided");
    }
}

const mergeColumns = (mergeOptions, data) => {
    if(mergeOptions){
        let updatedRows = data.map((eachRow) => {
            let stringInterpolValues = [];
            mergeOptions.mergeColumns.forEach(eachColumnName => {
                stringInterpolValues.push(eachRow[eachColumnName]);
            });
            return { ...eachRow, [mergeOptions.newColumnName] : (`${mergeOptions.formate}`, stringInterpolValues.join(",")) }
        });
        return updatedRows;
    } else {
        console.log("Merge options is not provided");
    }
}

const createFormulaFieldColumn = (formulaFieldOptions, data) => {

}

module.exports = {
    formateData,
    filterData,
    mergeColumns,
    createFormulaFieldColumn
}