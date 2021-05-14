# CSVHelper
## _A simple CSV Convertor, Ever_


This is command line interface tool to perform some conversion operation given in a config file on any given csv file and will write the converted csv file to the given output location

## Features

- Formate date column by cofigured formate using moment package.
- Filtering data by configurable dynamic predicate.
- Create new column by aggregating existing column together in the configured order.
- Create a new column value based on a predicate expression evalauted from existing column values.

## Tech

CSVHelper uses a number of open source projects to work properly:

- [create-file] - file system operations!
- [csv-parser] - parsing input csv files 
- [csvtojson] - convert csv to json to perform transformation easily
- [json-2-csv] - convert json back to csv
- [moment] - perform manipulation on date values
- [yargs] - configure command args for this cli tool


And of course CSVHelper itself is open source with a [public repository][csvhelperrepo]
 on GitHub.

## Installation

CSVHelper requires [Node.js](https://nodejs.org/) v10+ to run.

Install 
```sh
npm install -g csvhelper
```
Usage
from any where in the cmd execute below commands with mentioned args
```sh
csvhelper -s <sourceCSVpath> -c <configJSONfilePath> -o <outputFilePath>
```


#### Config JSON options

below is the total JSON config options, based on the operations concerned options should be provided to perform the transformation

```javascript
{
    "operation": "",  
    // allowed operation values
    // formatter , filter, merge, formulaField
    "predicateOptions": {
        "columnName" : "mention column name base on which predicate should perform",
        "value": "threshold value",
        "operator": "operator for comparison"
    },
    // predicateOptions is required when the operation is filter
    "formateOptions": {
        "columnName": "column name on which formating should happen currently supports date column type",
        "formate" : "formate option ex MMM d, YYYY"
    },
    // formateOptions is required when the operation is formatter
    "mergeOptions": {
        "newColumnName": "new column name",
        "mergeColumns": ["array of column names in string"], ex ["col1", "col2"]
        "formate": "string inpeterpolation order based on which columns should be merged ex: ${0}, ${1} will give col1, col2"
    }
    // mergeOptions is required when the operation is merge
    "formulaFieldOptions" : {
        "columnName": "new column name",
        "predicate": {
            "field":"field on which predicate should be performed",
            "value": "threshold value",
            "operator": "comparison operator",
            "truthyValue":"what value should be added to column if predicate is true",
            "falsyValue": "what value should be added to column if predicate is fals"
        }
    }
    //formulaFieldOptions is required when the operation is formulaField
}
```

## sample configs

for formatter operation
```json
{
    "operation" : "formatter",
    "formateOptions" : {
        "columnName" : "dob",
        "formate": "MMM d, YYYY"
    }
}
```

filter operation config
```json
{
    "operation" : "filter",
    "predicateOptions" : [{
        "columnName": "age",
        "value": "50",
        "operator": ">"
        
    }]
}
```

Merge operation config
```json
{
    "operation" : "merge",
    "mergeOptions": {
        "newColumnName": "name",
        "mergeColumns": ["first_name","last_name"],
        "formate": "${0}, ${1}"
    }
}
```
Formula field config
```json
{
    "operation" : "formulaField",
    "formulaFieldOptions": {
        "columnName": "eligible_for_voting",
        "predicate": {
            "field":"age",
            "value": "18",
            "operator": ">",
            "truthyValue":"T",
            "falsyValue": "F"
        }
    }
}
```
## License

MIT

**Free Software, Hell Yeah!**


   [csvhelperrepo]: <https://github.com/Tylerdurden07/csvhelper>

