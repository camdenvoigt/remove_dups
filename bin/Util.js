function getData(options) {
    let data = options.data;

    for (let i = 0; i < options.keys.jsonPath.length; i++) {
        data = data[options.keys.jsonPath[i]];
    }

    return data;
}

function constructOutput(options, cleanedEntries) {
    let output = options.data;
    for (let i = 0; i < options.keys.jsonPath.length; i++) {
        if (i === options.keys.jsonPath.length - 1) {
            output[options.keys.jsonPath[i]] = cleanedEntries;
        } else {
            output = options.data[options.keys.jsonPath[i]];
        }
    }
    return JSON.stringify(options.data);
}

function handleError(message) {
    let err = new Error(message);
    console.error(err);
    process.exit(1);
}

exports.getData = getData;
exports.constructOutput = constructOutput;
exports.handleError = handleError;