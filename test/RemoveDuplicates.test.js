const RemoveDuplicates = require("../bin/RemoveDuplicates");

describe("Remove Duplicates", () => {
    describe("compareEntries", () => {
        const oldEntry = {
            entryDate: 'August 19, 2005 23:15:30'
        };

        const newEntry = {
            entryDate: 'August 19, 2005 23:16:30'
        };

        const sameEntry = {
            entryDate: 'August 19, 2005 23:15:30'
        };

        test("Throws error if entries don't have date field", () => {
            let util = require('../bin/Util')
            util.handleError = jest.fn();

            RemoveDuplicates.compareEntries({}, {});

            expect(util.handleError).toHaveBeenCalled();
        });

        test("Returns negative if entry1 is older than entry2", () => {
            const val = RemoveDuplicates.compareEntries(oldEntry, newEntry);
            expect(val).toBeLessThan(0);
        });

        test("Returns positive when entry1 is newer than entry2", () => {
            const val = RemoveDuplicates.compareEntries(newEntry, oldEntry);
            expect(val).toBeGreaterThan(0);
        });

        test("Returns 0 when the entries have the same date", () => {
            const val = RemoveDuplicates.compareEntries(oldEntry, sameEntry);
            expect(val).toBe(0);
        });
    });

    describe("removeDuplicateDataWithKey", () => {
        const entries1 = [
            {
                "_id": "jkj238238jdsnfsj23",
                "email": "foo@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:10+00:00"
            },
            {
                "_id": "jkj238238jdsnfsj23",
                "email": "foot@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            },
            {
                "_id": "jkj238238jdsnfsj23",
                "email": "fool@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            }
        ];

        const entries2 = [
            {
                "_id": "zkj238238jdsnfsj23",
                "email": "foo@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:10+00:00"
            },
            {
                "_id": "akj238238jdsnfsj23",
                "email": "foo@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            },
            {
                "_id": "jkj238238jdsnfsj23",
                "email": "foo@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            }
        ];

        const entries3 = [
            {
                "_id": "akj238238jdsnfsj23",
                "email": "foo@bar.com",
                "firstName":  "Jon",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:10+00:00"
            },
            {
                "_id": "akj238238jdsnfsj23",
                "email": "foo@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            },
            {
                "_id": "jkj238238jdsnfsj23",
                "email": "foot@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            }
        ];

        beforeAll(() => {
            const logger = require('../bin/Logger');
            logger.logRemovingKey = jest.fn();
            logger.logReplacingEntry = jest.fn();
        });

        test("Throws error when entries don't have key", () => {
            let util = require('../bin/Util')
            util.handleError = jest.fn();

            RemoveDuplicates.removeDuplicateDataWithKey(entries1, "testKey");

            expect(util.handleError).toHaveBeenCalled();
        });

        test("Removes correct duplicates - all ids equal", () => {
            let newEntries = RemoveDuplicates.removeDuplicateDataWithKey(entries1, "_id");

            expect(newEntries).toEqual([
                {
                    "_id": "jkj238238jdsnfsj23",
                    "email": "fool@bar.com",
                    "firstName":  "John",
                    "lastName": "Smith",
                    "address": "123 Street St",
                    "entryDate": "2014-05-07T17:20:20+00:00"
                }
            ]);
        });

        test("Removes correct duplicates - all email equal", () => {
            let newEntries = RemoveDuplicates.removeDuplicateDataWithKey(entries2, "_id");

            expect(newEntries).toEqual(entries2);
        });

        test("Removes correct duplicates - mix", () => {
            let newEntries = RemoveDuplicates.removeDuplicateDataWithKey(entries3, "_id");

            expect(newEntries).toEqual([
                {
                    "_id": "akj238238jdsnfsj23",
                    "email": "foo@bar.com",
                    "firstName":  "John",
                    "lastName": "Smith",
                    "address": "123 Street St",
                    "entryDate": "2014-05-07T17:20:20+00:00"
                },
                {
                    "_id": "jkj238238jdsnfsj23",
                    "email": "foot@bar.com",
                    "firstName":  "John",
                    "lastName": "Smith",
                    "address": "123 Street St",
                    "entryDate": "2014-05-07T17:20:20+00:00"
                }
            ]);
        });
    });

    describe("removeDuplicates", () => {
        const entries1 = [
            {
                "_id": "akj238238jdsnfsj23",
                "email": "foo@bar.com",
                "firstName":  "Jon",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:10+00:00"
            },
            {
                "_id": "akj238238jdsnfsj23",
                "email": "foo@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            },
            {
                "_id": "jkj238238jdsnfsj23",
                "email": "foot@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            }
        ];

        const entries2 = [
            {
                "_id": "akj238238jdsnfsj23",
                "email": "foo@bar.com",
                "firstName":  "Jon",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:10+00:00"
            },
            {
                "_id": "akj238238jdsnfsj23",
                "email": "foot@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            },
            {
                "_id": "jkj238238jdsnfsj23",
                "email": "foot@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            }
        ];

        beforeAll(() => {
            const logger = require('../bin/Logger');
            logger.logRemovingKey = jest.fn();
            logger.logReplacingEntry = jest.fn();
        });

        test("Removes duplicates for multiple keys - some ids", () => {
            const newEntries = RemoveDuplicates.removeDuplicates(entries1, {
                uniqueKeys: ["_id", "email"],
                dateKey: "entryDate"
            });

            expect(newEntries).toEqual([{
                "_id": "akj238238jdsnfsj23",
                "email": "foo@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            },
            {
                "_id": "jkj238238jdsnfsj23",
                "email": "foot@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            }]);
        });

        test("Removes duplicates for multiple keys - some ids", () => {
            const newEntries = RemoveDuplicates.removeDuplicates(entries2, {
                uniqueKeys: ["_id", "email"],
                dateKey: "entryDate"
            });

            expect(newEntries).toEqual([{
                "_id": "jkj238238jdsnfsj23",
                "email": "foot@bar.com",
                "firstName":  "John",
                "lastName": "Smith",
                "address": "123 Street St",
                "entryDate": "2014-05-07T17:20:20+00:00"
            }]);
        });
    });
});