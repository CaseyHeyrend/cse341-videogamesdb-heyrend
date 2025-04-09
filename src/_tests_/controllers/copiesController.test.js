const request = require("supertest");
const app = require("../../app"); // Assuming app.js is the main Express app
const Copy = require("../../models/copies");

jest.mock("../../models/copies");

describe("Copies Controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /copies", () => {
        it("should return all copies", async () => {
            const mockCopies = [
                { gameTitle: "Game 1", consoles: ["PS5"], downloaded: true, physical: false },
                { gameTitle: "Game 2", consoles: ["Xbox"], downloaded: false, physical: true }
            ];
            Copy.find.mockResolvedValue(mockCopies);

            const response = await request(app).get("/copies");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCopies);
            expect(Copy.find).toHaveBeenCalledTimes(1);
        });

        it("should handle server errors", async () => {
            Copy.find.mockRejectedValue(new Error("Database error"));

            const response = await request(copiesController).get("/copies");

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Internal Server Error" });
        });
    });

    describe("GET /copies/:id", () => {
        it("should return a copy by ID", async () => {
            const mockCopy = { gameTitle: "Game 1", consoles: ["PS5"], downloaded: true, physical: false };
            Copy.findById.mockResolvedValue(mockCopy);

            const response = await request(app).get("/copies/123");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCopy);
            expect(Copy.findById).toHaveBeenCalledWith("123");
        });

        it("should return 404 if copy not found", async () => {
            Copy.findById.mockResolvedValue(null);

            const response = await request(copiesController).get("/copies/123");

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: "Copy not found" });
        });

        it("should handle server errors", async () => {
            Copy.findById.mockRejectedValue(new Error("Database error"));

            const response = await request(copiesController).get("/copies/123");

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Internal Server Error" });
        });
    });

    describe("POST /copies", () => {
        it("should add or update a copy", async () => {
            const mockCopy = { gameTitle: "Game 1", consoles: ["PS5"], downloaded: true, physical: false };
            Copy.findOneAndUpdate.mockResolvedValue(mockCopy);

            const response = await request(app)
                .post("/copies")
                .send({ gameTitle: "Game 1", consoles: ["PS5"], downloaded: true, physical: false });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCopy);
            expect(Copy.findOneAndUpdate).toHaveBeenCalledWith(
                { gameTitle: "Game 1" },
                { gameTitle: "Game 1", consoles: ["PS5"], downloaded: true, physical: false },
                { new: true, upsert: true }
            );
        });

        it("should return 400 if required fields are missing", async () => {
            const response = await request(copiesController).post("/copies").send({ downloaded: true });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: "Game title and consoles are required." });
        });

        it("should handle server errors", async () => {
            Copy.findOneAndUpdate.mockRejectedValue(new Error("Database error"));

            const response = await request(copiesController)
                .post("/copies")
                .send({ gameTitle: "Game 1", consoles: ["PS5"], downloaded: true, physical: false });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Internal Server Error" });
        });
    });

    describe("DELETE /copies/:id", () => {
        it("should delete a copy", async () => {
            const mockCopy = { gameTitle: "Game 1", consoles: ["PS5"], downloaded: true, physical: false };
            Copy.findOneAndDelete.mockResolvedValue(mockCopy);

            const response = await request(app).delete("/copies/123");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "Copy deleted successfully" });
            expect(Copy.findOneAndDelete).toHaveBeenCalledWith("123");
        });

        it("should return 404 if copy not found", async () => {
            Copy.findOneAndDelete.mockResolvedValue(null);

            const response = await request(copiesController).delete("/copies/123");

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: "Copy not found" });
        });

        it("should handle server errors", async () => {
            Copy.findOneAndDelete.mockRejectedValue(new Error("Database error"));

            const response = await request(copiesController).delete("/copies/123");

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Internal Server Error" });
        });
    });
});