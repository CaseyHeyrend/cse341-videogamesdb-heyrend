const { jest } = require('globals');
const gameController = require('../../controllers/gameController');// Import the gameController
const Game = require('../../models/game');// Import the Game model

jest.mock('../../models/game');// Mock the Game model
