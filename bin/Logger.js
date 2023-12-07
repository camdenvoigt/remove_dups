const fs = require("fs");

let logger = null;
let isVerbose = false;

function init(logFilePath, verbose) {
    if (logFilePath) {
        try {
            logger = fs.createWriteStream(logFilePath, {
                flags: 'a'
            });
        } catch (err) {
            console.log("Invalid log file path");
        }
    }

    isVerbose = verbose;
}

function writeLine(message) {
    logger.write(`${message}\n`);
}

function log(message) {
    if (logger) {
        writeLine(message);
        return;
    }

    if (isVerbose) {
        console.log(message);
    }
}

function logRemovingKey(key) {
    log(`Removing entries with duplicate ${key}`);
}

function logReplacingEntry(oldEntry, newEntry, key) {
    log(`Replacing ${JSON.stringify(oldEntry)} with ${JSON.stringify(newEntry)} because of duplicate value in ${key}`)
}

function logFullEntries(entries) {
    log(`Removing duplicates from ${JSON.stringify(entries)}`);
}

function logReducedEntries(entries) {
    log(`Entries with removed duplicates ${JSON.stringify(entries)}`)
}

exports.init = init;
exports.log = log;
exports.logRemovingKey = logRemovingKey;
exports.logReplacingEntry = logReplacingEntry;
exports.logFullEntries = logFullEntries;
exports.logReducedEntries = logReducedEntries;