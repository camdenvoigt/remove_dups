#!/usr/bin/env node

let ProcessArgs = require("./ProcessArgs");
let RemoveDuplicates = require("./RemoveDuplicates");

let options = ProcessArgs.process();

// more generic than .leads ideally
let cleanedEntries = RemoveDuplicates.removeDuplicates(options.data.leads);

console.log(cleanedEntries);
