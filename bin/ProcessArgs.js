const fs = require("fs");
const path = require("node:path");

const Util = require("./Util");

function getJsonData() {
    let jsonFile = process.argv[2];
    let jsonData = null;
    try {
        jsonData = JSON.parse(fs.readFileSync(jsonFile));
    } catch (e) {
        Util.handleError("Problem reading input file");
    }

    return jsonData;
}

function getOutputFilePath() {
    if (process.argv.includes("-o")) {
        let index = process.argv.indexOf("-o") + 1;
        let outputFilePath = null;
        try {
            outputFilePath = path.normalize(process.argv[index]);
        } catch (e) {
            Util.handleError("Invalid output file path provided");
        }
        return outputFilePath;
    }

    return undefined;
}

function getLogFilePath() {
    if (process.argv.includes("-l")) {
        let index = process.argv.indexOf("-l") + 1;
        let logFilePath = null;
        try {
            logFilePath = path.normalize(process.argv[index]);
        } catch (e) {
            Util.handleError("Invalid log file path provided");
        }
        return logFilePath;
    }
    return null
}

function getIsVerbose() {
    return process.argv.includes("-v");
}

function getConfig() {
    if (process.argv.includes("-c")) {
        let index = process.argv.indexOf("-c") + 1;
        let configFilePath = null;
        try {
            configFilePath = path.normalize(process.argv[index]);
        } catch (e) {
            Util.handleError("Invalid config file path provided");
        }

        let configData = null;
        try {
            configData = JSON.parse(fs.readFileSync(configFilePath));
        } catch (e) {
            Util.handleError("Problem reading config file");
        }

        return configData;
    }
    return {};
}

function isHelp() {
    return process.argv.includes("-h");
}

function showHelp() {
    console.log(`
    remove_dups reads a json file and can remove entries with duplicate keys keeping the newest. These entries must all have the key(s) that are to be unique and have some sort of date field to compare with.

    Usage:
        remove_dups <input_file>
        remove_dups -h | --help

    Options:
        -h  Show this information
        -v  Show all logs in console, does not work when log file is specified
        -l  Relitive path to log file. Will log verbosly to file
        -o  Relative path to output file.
        -c  Relative path to config file that can specify all options and keys
    `);
    process.exit(0);
}

/*
    Reads process args and returns options object containing specified options from command line
*/
function process_args() {
    if (isHelp()) {
        showHelp();
    }

    let config = getConfig();

    return {
        data: getJsonData(),
        logFilePath: getLogFilePath() || config.logFilePath,
        outputFilePath: getOutputFilePath() || config.outputFilePath,
        isVerbose: getIsVerbose() || config.isVerbose,
        keys: config.keys,
    }
}

exports.process = process_args;