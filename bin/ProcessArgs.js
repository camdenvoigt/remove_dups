const fs = require("fs");
const path = require("node:path")

function getJsonData() {
    let jsonFile = process.argv[2];
    let jsonData = null;
    try {
        jsonData = JSON.parse(fs.readFileSync(jsonFile));
    } catch (e) {
        let error = new Error("Problem reading input file");
        console.error(error);
        process.exit(1);
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
            let error = new Error("Invalid output file path provided");
            console.error(error);
            process.exit(1);
        }
        return outputFilePath;
    }
}

function getLogFilePath() {
    if (process.argv.includes("-l")) {
        let index = process.argv.indexOf("-l") + 1;
        let logFilePath = null;
        try {
            logFilePath = path.normalize(process.argv[index]);
        } catch (e) {
            let error = new Error("Invalid log file path provided");
            console.error(error);
            process.exit(1);
        }
        return logFilePath;
    }
    return null
}

function getIsVerbose() {
    return process.argv.includes("-v");
}

function isHelp() {
    return process.argv.includes("-h") || process.argv.includes("--help");
}

function showHelp() {
    console.log(`
    remove_dups reads a json file and can remove entries with duplicate keys keeping the newest. These entries must all have the key(s) that are to be unique and have some sort of date field to compare with.

    Usage:
        remove_dups <input_file>
        remove_dups -h | --help

    Options:
        -h, --help              Show this information
        -v, --verbose           Show all logs in console, does not work when log file is specified
        -l, --logFilePath       Realitive path to log file. Will log verbosly to file
        -o, --outputFilePath    Realative path to output file.
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

    return {
        data: getJsonData(),
        logFilePath: getLogFilePath(),
        outputFilePath: getOutputFilePath(),
        isVerbose: getIsVerbose(),
    }
}

exports.process = process_args;