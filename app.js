const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongoose").MongoClient;
const cors = require("cors");
require("dotenv").config();
//const bcrypt = require("bcrypt");

//Auth0
const { auth, requiresAuth } = require('express-openid-connect');
 
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// From env flie
const port = process.env.PORT || 8080;

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// local modules
const connectDB = require("./src/database/connnect");

// Express
const app = express();
app.use(cors());
app.use(bodyParser.json());


// Middleware

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// CORS
app.use((req, res, next) => {
  const allowedOrigin =
    process.env.NODE_ENV === "production" ? "cse341-videogamesdb-heyrend.onrender.com" : "http://localhost:8080";// Add your production domain here
    // https://webservices-videogamesdb.onrender.com - Casey
    // https://webservices-videogamesdb-age0.onrender.com - Team
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-allowedOrigin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    next();
  });

  app.get("/loggedIn", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in ✅" : "Logged out ❌");
  });

  app.get("/logout", (req, res) => {
    // Logs out the user and redirects to the home page or any page you want
    res.oidc.logout({ returnTo: process.env.BASE_URL || "http://localhost:3000" });
  });  

// Swagger
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api-docs", requiresAuth(), swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", require("./src/routes"));
app.use("/games", requiresAuth(), require("./src/routes/games"));
app.use("/consoles", requiresAuth(), require("./src/routes/consoles"));
app.use("/users", requiresAuth(), require("./src/routes/users"));
app.use("/copies", requiresAuth(), require("./src/routes/copies"));
//app.use("/games", require("./src/routes/games"));
//app.use("/consoles", require("./src/routes/consoles"));
//app.use("/users", require("./src/routes/users"));

app.use(express.static("public"));

// Error handling
// 404 Not Found
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
}
);
// global error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
});



// local mongodb connection and server start

connectDB().then(() => {
    app.listen(port);
    console.log(`Server running on port ${port}`); 
  }
).catch((err) => {
    console.error(err);
    process.exit(1);
  }
);
module.exports = app;