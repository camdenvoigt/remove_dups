const Util = require('../bin/Util');

describe("Util", () => {
    describe("getData", () => {
        test("Gets correct data from complex object", () => {
            let options = {
                data: {
                    very: {
                        complex: {
                            data: {
                                structure: {
                                    test: "object"
                                }
                            }
                        }
                    }
                },
                keys: {
                    jsonPath: ["very", "complex", "data", "structure"]
                }
            }

            const data = Util.getData(options);

            expect(data).toEqual({
                test: "object"
            });
        });

        test("Gets correct data from simple object", () => {
            let options = {
                data: {
                    very: {
                        test: "object"
                    }
                },
                keys: {
                    jsonPath: ["very"]
                }
            }

            const data = Util.getData(options);

            expect(data).toEqual({
                test: "object"
            });
        });
    });

    describe("constructOutput", () => {
        test("construct complex output", () => {
            let options = {
                data: {
                    very: {
                        complex: {
                            data: {
                                structure: {
                                    test: "object"
                                }
                            }
                        }
                    }
                },
                keys: {
                    jsonPath: ["very", "complex", "data", "structure"]
                }
            }
            const cleanedEntries = []

            const data = Util.constructOutput(options, cleanedEntries);

            expect(data).toEqual(JSON.stringify({
                very: {
                    complex: {
                        data: {
                            structure: []
                        }
                    }
                }
            }));
        });

        test("construct simple output", () => {
            let options = {
                data: {
                    very: {
                        test: "object"
                    }
                },
                keys: {
                    jsonPath: ["very"]
                }
            }
            const cleanedEntries = []

            const data = Util.constructOutput(options, cleanedEntries);

            expect(data).toEqual(JSON.stringify({
                very: []
            }));
        });
    });
});