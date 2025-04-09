const gameController = require('../../controllers/gameController'); // Import the gameController
const mongodb = require('../database/connnect'); // Import the mongodb library

jest.mock("../database/connnect"); // Mock MongoDB module

describe("gameController", async () => {
  let req, res, next, mockDb, mockCollection, mockCursor;

  beforeEach(() => {
    req = {}; // Mock request object
    res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    // Mock MongoDB methods
    mockCursor = { toArray: jest.fn() };
    mockCollection = { find: jest.fn().mockReturnValue(mockCursor) };
    mockDb = { collection: jest.fn().mockReturnValue(mockCollection) };
    mongodb.getDb.mockReturnValue({ db: jest.fn().mockReturnValue(mockDb) });
  });

  describe("getAllGames", () => {
    test("should return all games with status 200", async () => {
      const mockGames = [{ gameTitle: "R.E.P.O" }, { gameTitle: "Flotsam" }];
      mockCursor.toArray.mockResolvedValue(mockGames);

      await gameController.getAllGames(req, res, next);

      expect(mongodb.getDb).toHaveBeenCalled();
      expect(mockDb.collection).toHaveBeenCalledWith("gamesinfos");
      expect(mockCollection.find).toHaveBeenCalled();
      expect(mockCursor.toArray).toHaveBeenCalled();
      expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockGames);
    });

    test("should return 500 on unexpected error", async () => {
    const mockError = new Error("Database error");
    mockCursor.toArray.mockRejectedValue(mockError);
  
    (async () => {
    await gameController.getAllGames(req, res, next);
  
      expect(mongodb.getDb).toHaveBeenCalled();
      expect(mockDb.collection).toHaveBeenCalledWith("gamesinfos");
      expect(mockCollection.find).toHaveBeenCalled();
      expect(mockCursor.toArray).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "An unexpected error occurred.",
        error: "Database error",
      });
    })();
  });

  describe("getGame", () => {
    test("should return a game by ID with status 200", async () => {
      const mockGame = { gameTitle: "R.E.P.O" };
      const mockGameId = "12345";
      req.params = { id: mockGameId };
      mockCollection.find.mockReturnValueOnce({
        toArray: jest.fn().mockResolvedValueOnce([mockGame]),
      });

      await gameController.getGame(req, res, next);

      expect(mockDb.collection).toHaveBeenCalledWith("gamesinfos");
      expect(mockCollection.find).toHaveBeenCalledWith({ _id: mockGameId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockGame);
    });

    test("should return 404 if game is not found", async () => {
      const mockGameId = "12345";
      req.params = { id: mockGameId };
      mockCollection.find.mockReturnValueOnce({
        toArray: jest.fn().mockResolvedValueOnce([]),
      });

      await gameController.getGame(req, res, next);

      expect(mockDb.collection).toHaveBeenCalledWith("gamesinfos");
      expect(mockCollection.find).toHaveBeenCalledWith({ _id: mockGameId });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Game not found" });
    });
  });

  describe("addGame", () => {
    test("should add a new game and return status 201", async () => {
      const mockGame = {
        gameTitle: "New Game",
        consoles: ["PC"],
        developer: "Dev Studio",
        publisher: "Pub Studio",
        genre: ["Action"],
        rating: "E",
        releaseDate: "2023-01-01",
      };
      req.body = mockGame;
      mockCollection.insertOne = jest.fn().mockResolvedValue({ insertedId: "12345" });

      await gameController.addGame(req, res, next);

      expect(mockDb.collection).toHaveBeenCalledWith("gamesinfos");
      expect(mockCollection.insertOne).toHaveBeenCalledWith(mockGame);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Game added successfully!",
        game: { ...mockGame, _id: "12345" },
      });
    });

    test("should return 400 if required fields are missing", async () => {
      req.body = { gameTitle: "Incomplete Game" };

      await gameController.addGame(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "All required fields must be provided.",
      });
    });
  });
});
  const mockError = new Error("Database error");
  mockCursor.toArray.mockRejectedValue(mockError);

  await gameController.getAllGames(req, res, next);

  expect(mongodb.getDb).toHaveBeenCalled();
  expect(mockDb.collection).toHaveBeenCalledWith("gamesinfos");
  expect(mockCollection.find).toHaveBeenCalled();
  expect(mockCursor.toArray).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({
    message: "An unexpected error occurred.",
    error: "Database error",
  });
});