const fs = require("fs");
const path = require("node:path")

function getJsonData() {
    let jsonFile = process.argv[2];
    return JSON.parse(fs.readFileSync(jsonFile));
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

/*
    Reads process args and returns options object containing specified options from command line
*/
function process_args() {
    return {
        data: getJsonData(),
        logFilePath: getLogFilePath(),
    }
}

exports.process = process_args;