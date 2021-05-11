const moment = require('moment');

const formateData = (formateOptions, data) => {
    if(formateOptions){
        const {columnName, formate} = formateOptions;
        const output = data.map(eachRow => {
            let dateObj = new Date(eachRow[columnName]);
            return { ...eachRow, [columnName] : moment(dateObj).format(formate)}
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
        const {newColumnName, formate, mergeColumns} = mergeOptions;

        let updatedRows = data.map((eachRow) => {
            let stringInterpolValues = [];
            mergeColumns.forEach(eachColumnName => {
                stringInterpolValues.push(eachRow[eachColumnName]);
            });
            return { ...eachRow, [newColumnName] : (`${formate}`, stringInterpolValues.join(",")) }
        });
        return updatedRows;
    } else {
        console.log("Merge options is not provided");
    }
}

const createFormulaFieldColumn = (formulaFieldOptions, data) => {
    if(formulaFieldOptions){
        let updatedRows = data.map((eachRow) => {
            const { field, operator, value, truthyValue, falsyValue} = formulaFieldOptions.predicate
            let dynamicCondition = `${eachRow[field]} ${operator} ${value}`;
            let evaluate = (condition) => Function(`return ${condition}`)();
             
            let newFormulaColumn = { [formulaFieldOptions.columnName] : evaluate(dynamicCondition) ? truthyValue : falsyValue };
            return {...eachRow, ...newFormulaColumn};
        });
        return updatedRows;
    } else {
        console.log("No formulae field options are provided");
    }
}

module.exports = {
    formateData,
    filterData,
    mergeColumns,
    createFormulaFieldColumn
}