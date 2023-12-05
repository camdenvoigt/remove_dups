#!/usr/bin/env node

let ProcessArgs = require("./ProcessArgs");
let RemoveDuplicates = require("./RemoveDuplicates");
let Logger = require("./Logger");

let options = ProcessArgs.process();
Logger.init(options.logFilePath);

// more generic than .leads ideally
let cleanedEntries = RemoveDuplicates.removeDuplicates(options.data.leads);

Logger.log(JSON.stringify({
    leads: cleanedEntries
}));
