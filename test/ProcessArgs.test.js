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
});