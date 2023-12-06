const Logger = require("./Logger");
const Util = require("./Util");

let DATE_KEY = "entryDate";

function compareEntries(entry1, entry2) {
    if (!entry1.hasOwnProperty(DATE_KEY) || !entry2.hasOwnProperty(DATE_KEY)) {
        Util.handleError("Entries do not have specified date key");
    }

    let date1 = new Date(entry1[DATE_KEY]);
    let date2 = new Date(entry2[DATE_KEY]);

    return date1 - date2;
}

function removeDuplicateDataWithKey(data, key) {
    let entries = new Map();
    Logger.logRemovingKey(key);

    data.reduce((entries, currentEntry) => {
        if (!currentEntry.hasOwnProperty(key)) {
            Util.handleError(`Entries do not have specified key - ${key}`);
        }

        let entryId = currentEntry[key];

        if (!entries.has(entryId)) {
            entries.set(entryId, currentEntry);
            return entries;
        } 

        let oldEntry = entries.get(entryId);
        let compareEntriesVal = compareEntries(currentEntry, oldEntry);
        if (compareEntriesVal >= 0) {
            Logger.logReplacingEntry(oldEntry, currentEntry, key);
            entries.set(entryId, currentEntry);
        }

        return entries;
    }, entries);

    return [...entries.values()];
}

function removeDuplicates(data, keys) {
    DATE_KEY = keys.dateKey;

    let reducedData = data;
    keys.uniqueKeys.forEach((key) => {
        reducedData = removeDuplicateDataWithKey(reducedData, key);
    });

    return reducedData;
}

exports.removeDuplicates = removeDuplicates;