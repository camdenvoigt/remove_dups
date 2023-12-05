const Logger = require("./Logger");

const ID_KEY_VALUE = "_id";
const EMAIL_KEY_VALUE = "email";
const DATE_KEY_VALUE = "entryDate";

function compareEntries(entry1, entry2) {
    let date1 = new Date(entry1[DATE_KEY_VALUE]);
    let date2 = new Date(entry2[DATE_KEY_VALUE]);

    return date1 - date2;
}

function removeDuplicateDataWithKey(data, key) {
    let entries = {};
    Logger.logRemovingKey(key);

    data.reduce((entries, currentEntry) => {
        let entryId = currentEntry[key];

        if (!entries.hasOwnProperty(entryId)) {
            entries[entryId] = currentEntry;
            return entries;
        } 

        let compareEntriesVal = compareEntries(currentEntry, entries[entryId])
        if (compareEntriesVal >= 0) {
            Logger.logReplacingEntry(entries[entryId], currentEntry, key);
            entries[entryId] = currentEntry
        }

        return entries;
    }, entries);

    return Object.values(entries);
}

function removeDuplicates(data) {
    let reducedData = removeDuplicateDataWithKey(data, ID_KEY_VALUE);
    return removeDuplicateDataWithKey(reducedData, EMAIL_KEY_VALUE);
}

exports.removeDuplicates = removeDuplicates;