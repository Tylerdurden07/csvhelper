#!/usr/bin/env node

const yargs = require("yargs");
const {transform} = require("./util/csvTransformer")

const options = yargs
 .usage("Usage: -s <source>")
 .option("s", { alias: "source", describe: "Path to your source file", type: "string", demandOption: true })
 .option("c", { alias: "config", describe: "Path to your config file", type: "string", demandOption: true })
 .option("o", { alias: "output", describe: "Path to your output file", type: "string", demandOption: true })
 .argv;

transform(options.source, options.config, options.output,
    () => { console.log("Completed Conversion!");}).
    then(() => {
    console.log("happy hacking!!");
});


