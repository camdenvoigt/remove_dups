const fs = require("fs");

const ProcessArgs = require("../bin/ProcessArgs");
const Util = require("../bin/Util");

describe("ProcessArgs", () => {
    describe("getJsonData", () => {
        let readFileMock;

        beforeAll(() => {
            readFileMock = jest.fn();
        });

        test("good file", () => {
            readFileMock.mockReturnValueOnce(`{"test": "tester"}`);
            fs.readFileSync = readFileMock;
            jest.replaceProperty(process, 'argv', [0, "filePath"]);

            const val = ProcessArgs.getJsonData();

            expect(val).toEqual({
                test: "tester"
            });
        });

        test("bad file", () => {
            readFileMock.mockImplementation(() => {
                throw new Error();
            });
            fs.readFileSync = readFileMock;
            jest.replaceProperty(process, 'argv', [0, 1, "filePath"]);
            Util.handleError = jest.fn();

            const val = ProcessArgs.getJsonData();

            expect(Util.handleError).toHaveBeenCalled();
        });
    });

    describe("getDateKey", () => {
        test("good value", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "dateKey"]);

            const val = ProcessArgs.getDateKey();

            expect(val).toEqual("dateKey");
        });

        test("no value", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath"]);
            Util.handleError = jest.fn();

            const val = ProcessArgs.getDateKey();

            expect(val).toBeNull();
        });

        test("option value", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "-c"]);
            Util.handleError = jest.fn();

            const val = ProcessArgs.getDateKey();

            expect(val).toBeNull();
        });
    });

    describe("getUniqueKeys", () => {
        test("good value", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "dateKey", '["_id"]']);

            const val = ProcessArgs.getUniqueKeys();

            expect(val).toEqual(["_id"]);
        });

        test("no value", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "dateKey"]);
            Util.handleError = jest.fn();

            const val = ProcessArgs.getUniqueKeys();

            expect(val).toBeNull();
        });

        test("option value", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "dateKey", "-c"]);
            Util.handleError = jest.fn();

            const val = ProcessArgs.getUniqueKeys();

            expect(val).toBeNull();
        });

        test("Invalid argument", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "dateKey", "test"]);
            Util.handleError = jest.fn();

            ProcessArgs.getUniqueKeys();

            expect(Util.handleError).toHaveBeenCalled();
        });

        test("not an array", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "dateKey", `{"test": "test"}`]);
            Util.handleError = jest.fn();

            ProcessArgs.getUniqueKeys();

            expect(Util.handleError).toHaveBeenCalled();
        });
    });

    describe("getJsonPath", () => {
        test("good value", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "dateKey", '["_id"]', '["leads"]']);

            const val = ProcessArgs.getJsonPath();

            expect(val).toEqual(["leads"]);
        });

        test("no value", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "dateKey", '["_id"]']);
            Util.handleError = jest.fn();

            const val = ProcessArgs.getJsonPath();

            expect(val).toBeNull();
        });

        test("option value", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "dateKey", '["_id"]', "-c"]);
            Util.handleError = jest.fn();

            const val = ProcessArgs.getJsonPath();

            expect(val).toBeNull();
        });

        test("Invalid argument", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "dateKey", '["_id"]', "test"]);
            Util.handleError = jest.fn();

            ProcessArgs.getJsonPath();

            expect(Util.handleError).toHaveBeenCalled();
        });

        test("not an array", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "dateKey", '["_id"]', `{"test": "test"}`]);
            Util.handleError = jest.fn();

            ProcessArgs.getJsonPath();

            expect(Util.handleError).toHaveBeenCalled();
        });
    });

    describe("getOutputFilePath", () => {
        test("good value", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "-o", "../example.txt"]);

            const val = ProcessArgs.getOutputFilePath();

            expect(val).toEqual("../example.txt");
        });

        test("does not contain option tag", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath"]);

            const val = ProcessArgs.getOutputFilePath();

            expect(val).toBeNull();
        });
    });

    describe("getLogFilePath", () => {
        test("good value", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "-l", "../example.txt"]);

            const val = ProcessArgs.getLogFilePath();

            expect(val).toEqual("../example.txt");
        });

        test("does not contain option tag", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath"]);

            const val = ProcessArgs.getLogFilePath();

            expect(val).toBeNull();
        });
    });

    describe("getConfig", () => {
        test("good value", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath", "-c", "../example.txt"]);
            let fileSyncMock = jest.fn();
            fileSyncMock.mockReturnValueOnce('{"test": "test"}');
            fs.readFileSync = fileSyncMock;

            const val = ProcessArgs.getConfig();

            expect(val).toEqual({test: "test"});
        });

        test("does not contain option tag", () => {
            jest.replaceProperty(process, 'argv', [0, 1, "filePath"]);

            const val = ProcessArgs.getConfig();

            expect(val).toEqual({keys: null});
        });
    });
});