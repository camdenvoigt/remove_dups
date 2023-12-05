let fs = require("fs");

/*
    Reads process args and returns options object containing specified options from command line
*/
function process_args() {
    let jsonFile = process.argv[2];
    let jsonData = JSON.parse(fs.readFileSync(jsonFile));

    return {
        data: jsonData
    }
}

exports.process = process_args;