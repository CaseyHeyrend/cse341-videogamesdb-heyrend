const mongoose = require("mongoose");
const Console = require("../models/consoles");
const Copy = require("../models/copies");

describe("Database Models Test Suite", () => {
    beforeAll(async () => {
        // Connect to a test database
        await mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Clean up the database and close the connection
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    describe("Console Model Tests", () => {
        it("should create and save a console successfully", async () => {
            const validConsole = new Console({
                console: "PlayStation 5",
                company: "Sony",
                intro: new Date("2020-11-12"),
            });

            const savedConsole = await validConsole.save();
            expect(savedConsole._id).toBeDefined();
            expect(savedConsole.console).toBe("PlayStation 5");
            expect(savedConsole.company).toBe("Sony");
            expect(savedConsole.intro).toEqual(new Date("2020-11-12"));
        });

        it("should fail to create a console without required fields", async () => {
            const invalidConsole = new Console({
                company: "Sony",
            });

            let error;
            try {
                await invalidConsole.save();
            } catch (err) {
                error = err;
            }
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(error.errors.console).toBeDefined();
        });
    });

    describe("Copy Model Tests", () => {
        it("should create and save a copy successfully", async () => {
            const validCopy = new Copy({
                downloaded: true,
                physical: false,
                gameTitle: "The Legend of Zelda: Breath of the Wild",
                consoles: ["Nintendo Switch"],
            });

            const savedCopy = await validCopy.save();
            expect(savedCopy._id).toBeDefined();
            expect(savedCopy.downloaded).toBe(true);
            expect(savedCopy.physical).toBe(false);
            expect(savedCopy.gameTitle).toBe("The Legend of Zelda: Breath of the Wild");
            expect(savedCopy.consoles).toContain("Nintendo Switch");
        });

        it("should fail to create a copy without required fields", async () => {
            const invalidCopy = new Copy({
                downloaded: true,
            });

            let error;
            try {
                await invalidCopy.save();
            } catch (err) {
                error = err;
            }
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(error.errors.physical).toBeDefined();
            expect(error.errors.gameTitle).toBeDefined();
        });

        it("should convert string boolean fields to actual booleans", async () => {
            const copyWithStrings = new Copy({
                downloaded: "yes",
                physical: "no",
                gameTitle: "Super Mario Odyssey",
                consoles: ["Nintendo Switch"],
            });

            const savedCopy = await copyWithStrings.save();
            expect(savedCopy.downloaded).toBe(true);
            expect(savedCopy.physical).toBe(false);
        });
    });
});