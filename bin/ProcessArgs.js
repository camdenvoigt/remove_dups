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

/*
    Reads process args and returns options object containing specified options from command line
*/
function process_args() {
    return {
        data: getJsonData(),
        logFilePath: getLogFilePath(),
        outputFilePath: getOutputFilePath(),
        isVerbose: getIsVerbose(),
    }
}

exports.process = process_args;