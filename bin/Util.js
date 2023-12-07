function getData(options) {
    let data = options.data;

    try {
        for (let i = 0; i < options.keys.jsonPath.length; i++) {
            data = data[options.keys.jsonPath[i]];
        }
    } catch(e) {
        handleError("json path does not match json object");
    }

    return data;
}

function constructOutput(options, cleanedEntries) {
    let output = options.data;

    try {
        for (let i = 0; i < options.keys.jsonPath.length; i++) {
            if (i === options.keys.jsonPath.length - 1) {
                output[options.keys.jsonPath[i]] = cleanedEntries;
            } else {
                output = output[options.keys.jsonPath[i]];
            }
        }
    } catch(e) {
        handleError("json path does not match json object");
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