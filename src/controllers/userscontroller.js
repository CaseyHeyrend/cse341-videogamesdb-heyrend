const User = require("../models/users");
const bcrypt = require("bcrypt");


const usersController = {}

// Get all users
usersController.getAllUsers = async (req, res) => {
    /*
    #swagger.summary = "Get all users"
    #swagger.description = "Returns all users in the database"
    #swagger.tags = ['Users']
    */
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Get a user by username
usersController.getUser = async (req, res) => {
        /*
    #swagger.summary = " Get a user by username"
    #swagger.description = " Get a user by username"
    #swagger.tags = ['Users']
    */
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Add or update a user (with password hashing)
usersController.addOrUpdateUser = async (req, res) => {
        /*
    #swagger.summary = "Add or update a user (with password hashing)"
    #swagger.description = "Add or update a user (with password hashing)"
    #swagger.tags = ['Users']
    */
    try {
        const { username, password, email, name } = req.body;

        if (!username || !password || !email || !name) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOneAndUpdate(
            { username },
            { username, password: hashedPassword },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: "User added/updated successfully!", user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a user by username
usersController.deleteUser = async (req, res) => {
        /*
    #swagger.summary = "Delete a user by username"
    #swagger.description = "Delete a user by username"
    #swagger.tags = ['Users']
    */
    try {
        const { username } = req.params;
        const user = await User.findOneAndDelete({ username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Search users by name or email
usersController.searchUsers = async (req, res) => {
        /*
    #swagger.summary = "Search users by name or email"
    #swagger.description = "Search users by name or email."
    #swagger.tags = ['Users']
    */
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: "Query parameter is required." });
        }

        // Check if the query is a valid ObjectId (MongoDB's user ID)
        const userId = mongoose.Types.ObjectId.isValid(query) ? query : null;

        const users = await User.find({
            $or: [
                { _id: userId }, // Search by user ID
                { username: { $regex: query, $options: "i" } }, // Search by username
                { name: { $regex: query, $options: "i" } }, // Search by name
                { email: { $regex: query, $options: "i" } } // Search by email
            ]
        });

        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = usersController;
