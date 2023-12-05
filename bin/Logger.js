let fs = require("fs");

let logger = null;

function init(logFilePath) {
    if (logFilePath) {
        try {
            logger = fs.createWriteStream(logFilePath, {
                flags: 'a'
            });
        } catch (err) {
            console.log("Invalid log file path");
        }
    }
}

function writeLine(message) {
    logger.write(`${message}\n`);
}

function log(message) {
    if (logger) {
        writeLine(message);
        return;
    }

    console.log(message);
}

function logRemovingKey(key) {
    log(`Removing entries with duplicate ${key}`);
}

function logReplacingEntry(oldEntry, newEntry, key) {
    log(`Replacing ${JSON.stringify(oldEntry)} with ${JSON.stringify(newEntry)} because of duplicate value in ${key}`)
}

exports.init = init;
exports.log = log;
exports.logRemovingKey = logRemovingKey;
exports.logReplacingEntry = logReplacingEntry;