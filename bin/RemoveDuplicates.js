function compareEntries(entry1, entry2) {
    let date1 = new Date(entry1["entryDate"]);
    let date2 = new Date(entry2["entryDate"]);

    return date1 - date2;
}

function removeDuplicates(data) {
    let entries = {};

    // remove duplicate ids
    data.reduce((entries, currentEntry) => {
        let entryId = currentEntry["_id"];

        if (!entries.hasOwnProperty(entryId)) {
            entries[entryId] = currentEntry;
            return entries;
        } 

        let compareEntriesVal = compareEntries(currentEntry, entries[entryId])
        if (compareEntriesVal >= 0) {
            entries[entryId] = currentEntry
        }

        return entries;
    }, entries);

    let reducedData = Object.values(entries);
    entries = {};

    // remove duplicate emails
    reducedData.reduce((entries, currentEntry) => {
        let entryId = currentEntry["email"];

        if (!entries.hasOwnProperty(entryId)) {
            entries[entryId] = currentEntry;
            return entries;
        } 

        let compareEntriesVal = compareEntries(currentEntry, entries[entryId])
        if (compareEntriesVal >= 0) {
            entries[entryId] = currentEntry
        }

        return entries;
    }, entries);

    return Object.values(entries);
}

exports.removeDuplicates = removeDuplicates;