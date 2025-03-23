const app = require("./app");


jest.mock("app");

describe("server", () => {
    it("should start the server successfully", async () => {
        // Mock the get method to prevent the server from actually starting
        const mockListen = jest.spyOn(app, "listen").mockImplementation(() => {});

        // Call the server's start method
        await server.start();

        //Assert that the listen method was called
        expect(mockListen).toHaveBeenCalled();
        // Restore the original implementation of the listen method
        mockListen.mockRestore();
    }
    );
}
);
it("should handle errors during server start", async () => {
    // Mock the get method to throw an error
    const mockListen = jest.spyOn(app, "listen").mockImplementation(() => {
        throw new Error("Failed to start server");
    });

    // Call the server's start method
    await server.start().rejects.toThrow("Failed to start server");

    mockListen.mockRestore();
}
);
it("should handle a specific route", async () => {
    const mockQuery = require("./src/database/connect").query.mockResolvedValue([{ id: 1, name: "Test" }]);

    //Start the server
    await server.start();
    // Make a request to the server
   // Make a request to the route
   const response = await request(server.app).get("/data");

   // Assert the response
   expect(response.status).toBe(200);
   expect(response.body).toEqual([{ id: 1, name: "Test" }]);
   //stop the server
    await server.stop();
    // Restore the original implementation of the listen method
    mockListen.mockRestore();
});