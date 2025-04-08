// Test suite for userscontroller
const usersController = require('../../controllers/userscontroller');// Import the usersController
const User = require('../../models/user');// Import the User model

jest.mock('../../models/user');// Mock the User model

describe('usersController.deleteUser', () => {
    let req, res;
    beforeEach(() => {
        req = { params: { username: 'testuser'}};// Mock request
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    test("should delete a user and return 200 status", async () => {
        const mockDeleteUser = {username: 'testuser', password: 'testpassword', email: 'testemail', name: 'testname'};

        User.findOneAndDelete.mockResolvedValue(mockDeleteUser);

        await usersController.deleteUser(req, res, next);

        expect(User.findOneAndDelete).toHaveBeenCalledWith({ username: 'testuser' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "User deleted successfully" });
    });
});

test("should return 404 if user not found", async () => {
    User.findOneAndDelete.mockResolvedValue(null);

    await usersController.deleteUser(req, res, next);

    expect(User.findOneAndDelete).toHaveBeenCalledWith({ username: 'testuser' });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
});

test("should return 500 if an error occurs", async () => {
    const mockError = new Error('Database error');

    User.findOneAndDelete.mockRejectedValue(error);

    await usersController.deleteUser(req, res, next);

    expect(User.findOneAndDelete).toHaveBeenCalledWith({ username: 'testuser' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
}
);
