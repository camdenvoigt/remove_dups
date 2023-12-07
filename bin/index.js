#!/usr/bin/env node

const fs = require("fs");

const ProcessArgs = require("./ProcessArgs");
const RemoveDuplicates = require("./RemoveDuplicates");
const Logger = require("./Logger");
const Util = require("./Util");


let options = ProcessArgs.process();
Logger.init(options.logFilePath, options.isVerbose);

let data = Util.getData(options);

Logger.logFullEntries(data);

let cleanedEntries = RemoveDuplicates.removeDuplicates(data, options.keys);

Logger.logReducedEntries(cleanedEntries);

let output = Util.constructOutput(options, cleanedEntries);

if (options.outputFilePath) {
    fs.writeFileSync(options.outputFilePath, output);
} else {
    console.log(output);
}
