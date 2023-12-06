const fs = require("fs");
const path = require("node:path");

const Util = require("./Util");

const helpMessage = `
remove_dups reads a json file and can remove entries with duplicate keys keeping the newest. These entries must all have the key(s) that are to be unique and have some sort of date field to compare with.
Keys can either be provided via command line arguments or a config file. If none are provided defaults will be used.

Usage:
    remove_dups <input_file> [(<date_key> <unique_keys> <json_path>)] [options]
    remove_dups -h | --help

Arguments:
    If an optional argument is not included a default will be used. See README.md for defaults.
    input_file      JSON file that has a list of entries to remove duplicates from
    date_key        Key for the date field in the entries to compare
    unique_keys     An array of keys included in the entries that should be unique in the output e.g. "['_id', 'email']"
    json_path       An array of keys/indicies to get to the list of entries in the given JSON e.g. "['leads']"

Options:
    -h  Show this information
    -v  Show all logs in console, does not work when log file is specified
    -l  Relitive path to log file. Will log verbosly to file
    -o  Relative path to output file.
    -c  Relative path to config file that can specify all options and keys
`;

const defaultKeys = {
    dateKey: "entryDate",
    uniqueKeys: ["_id", "email"],
    jsonPath: ["leads"],
}

const argumentIndcies = {
    JSON_FILE_INDEX: 2,
    DATE_KEY_INDEX: 3,
    UNIQUE_KEYS_INDEX: 4,
    JSON_PATH_INDEX: 5,
}

function getJsonData() {
    let jsonFile = process.argv[argumentIndcies.JSON_FILE_INDEX];
    let jsonData = null;
    try {
        jsonData = JSON.parse(fs.readFileSync(jsonFile));
    } catch (e) {
        Util.handleError("Problem reading input file");
    }

    return jsonData;
}

function getDateKey() {
    let dateKey = process.argv[argumentIndcies.DATE_KEY_INDEX];

    if (!dateKey || dateKey.startsWith("-")) {
        return null;
    }

    return dateKey;
}

function getUniqueKeys() {
    let uniqueKeysArg = process.argv[argumentIndcies.UNIQUE_KEYS_INDEX];

    if (!uniqueKeysArg || uniqueKeysArg.startsWith("-")) {
        return null;
    }

    console.log(uniqueKeysArg);

    let uniqueKeys = JSON.parse(uniqueKeysArg);

    if (!Array.isArray(uniqueKeys)) {
        Util.handleError("Unique Keys is not an array");
    }

    return uniqueKeys;
}

function getJsonPath() {
    let jsonPathArg = process.argv[argumentIndcies.JSON_PATH_INDEX];

    if (!jsonPathArg || jsonPathArg.startsWith("-")) {
        return null;
    }

    let jsonPath = JSON.parse(jsonPathArg);

    if (!Array.isArray(jsonPath)) {
        Util.handleError("JSON Path is not an array");
    }

    return jsonPath;
}

function getKeys() {
    if (!getDateKey()) {
        return null;
    }

    return {
        dateKey: getDateKey(),
        uniqueKeys: getUniqueKeys(),
        jsonPath: getJsonPath(),
    }
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

    return null;
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
    return {keys: null};
}

function isHelp() {
    return process.argv.includes("-h");
}

function showHelp() {
    console.log(helpMessage);
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
        keys: getKeys() || config.keys || defaultKeys,
    }
}

exports.process = process_args;