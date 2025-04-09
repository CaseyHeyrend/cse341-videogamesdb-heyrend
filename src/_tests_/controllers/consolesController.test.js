const request = require("supertest");
const app = require("../../app"); // Adjust the path to your app entry point
const Console = require("../../models/consoles");

jest.mock("../../models/consoles");

describe("Consoles Controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /consoles", () => {
        it("should return all consoles", async () => {
            const mockConsoles = [
                { console: "PlayStation 5", company: "Sony", intro: "2020" },
                { console: "Xbox Series X", company: "Microsoft", intro: "2020" }
            ];
            Console.find.mockResolvedValue(mockConsoles);

            const response = await request(app).get("/consoles");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockConsoles);
            expect(Console.find).toHaveBeenCalledTimes(1);
        });

        it("should handle server errors", async () => {
            Console.find.mockRejectedValue(new Error("Database error"));

            const response = await request(app).get("/consoles");

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Internal Server Error" });
        });
    });

    describe("GET /consoles/:id", () => {
        it("should return a console by ID", async () => {
            const mockConsole = { console: "PlayStation 5", company: "Sony", intro: "2020" };
            Console.findById.mockResolvedValue(mockConsole);

            const response = await request(app).get("/consoles/123");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockConsole);
            expect(Console.findById).toHaveBeenCalledWith("123");
        });

        it("should return 404 if console not found", async () => {
            Console.findById.mockResolvedValue(null);

            const response = await request(app).get("/consoles/123");

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: "Console not found" });
        });

        it("should handle server errors", async () => {
            Console.findById.mockRejectedValue(new Error("Database error"));

            const response = await request(app).get("/consoles/123");

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Internal Server Error" });
        });
    });

    describe("POST /consoles", () => {
        it("should add or update a console", async () => {
            const mockConsole = { console: "PlayStation 5", company: "Sony", intro: "2020" };
            Console.findOneAndUpdate.mockResolvedValue(mockConsole);

            const response = await request(app)
                .post("/consoles")
                .send({ console: "PlayStation 5", company: "Sony", intro: "2020" });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Console added/updated successfully!",
                consoleData: mockConsole
            });
            expect(Console.findOneAndUpdate).toHaveBeenCalledWith(
                { console: "PlayStation 5" },
                { console: "PlayStation 5", company: "Sony", intro: "2020" },
                { new: true, upsert: true }
            );
        });

        it("should return 400 if required fields are missing", async () => {
            const response = await request(app).post("/consoles").send({ company: "Sony" });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: "Console name must be provided." });
        });

        it("should handle server errors", async () => {
            Console.findOneAndUpdate.mockRejectedValue(new Error("Database error"));

            const response = await request(app)
                .post("/consoles")
                .send({ console: "PlayStation 5", company: "Sony", intro: "2020" });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Internal Server Error" });
        });
    });

    describe("DELETE /consoles/:id", () => {
        it("should delete a console", async () => {
            const mockConsole = { console: "PlayStation 5", company: "Sony", intro: "2020" };
            Console.findOneAndDelete.mockResolvedValue(mockConsole);

            const response = await request(app).delete("/consoles/123");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "Console deleted successfully!" });
            expect(Console.findOneAndDelete).toHaveBeenCalledWith("123");
        });

        it("should return 404 if console not found", async () => {
            Console.findOneAndDelete.mockResolvedValue(null);

            const response = await request(app).delete("/consoles/123");

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: "Console not found" });
        });

        it("should handle server errors", async () => {
            Console.findOneAndDelete.mockRejectedValue(new Error("Database error"));

            const response = await request(app).delete("/consoles/123");

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Internal Server Error" });
        });
    });
});