#!/usr/bin/env node

const fs = require("fs");

const ProcessArgs = require("./ProcessArgs");
const RemoveDuplicates = require("./RemoveDuplicates");
const Logger = require("./Logger");

let options = ProcessArgs.process();
Logger.init(options.logFilePath, options.isVerbose);

// more generic than .leads ideally
let cleanedEntries = RemoveDuplicates.removeDuplicates(options.data.leads);

let output = JSON.stringify({
    leads: cleanedEntries
});

if (options.outputFilePath) {
    fs.writeFileSync(options.outputFilePath, output);
} else {
    console.log(output);
}
