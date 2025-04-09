const mongoose = require("mongoose");
const Console = require("../../models/consoles");

describe("Console Model Test Suite", () => {
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

    it("should exclude __v field from the response", async () => {
        const consoleData = new Console({
            console: "Xbox Series X",
            company: "Microsoft",
            intro: new Date("2020-11-10"),
        });

        const savedConsole = await consoleData.save();
        const foundConsole = await Console.findById(savedConsole._id).exec();
        expect(foundConsole.__v).toBeUndefined();
    });

    it("should update a console successfully", async () => {
        const consoleData = new Console({
            console: "Nintendo Switch",
            company: "Nintendo",
            intro: new Date("2017-03-03"),
        });

        const savedConsole = await consoleData.save();
        savedConsole.company = "Nintendo Co., Ltd.";
        const updatedConsole = await savedConsole.save();

        expect(updatedConsole.company).toBe("Nintendo Co., Ltd.");
    });

    it("should delete a console successfully", async () => {
        const consoleData = new Console({
            console: "Sega Genesis",
            company: "Sega",
            intro: new Date("1988-10-29"),
        });

        const savedConsole = await consoleData.save();
        await Console.findByIdAndDelete(savedConsole._id);

        const foundConsole = await Console.findById(savedConsole._id);
        expect(foundConsole).toBeNull();
    });
});