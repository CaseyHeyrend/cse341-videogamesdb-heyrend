const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongoose").MongoClient;
const cors = require("cors");
//const bcrypt = require("bcrypt");


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

// CORS
app.use((req, res, next) => {
  const allowedOrigin =
    process.env.NODE_ENV === "production" ? "https://webservices-videogamesdb-age0.onrender.com" : "http://localhost:8080";// Add your production domain here
    // https://webservices-videogamesdb.onrender.com - Casey
    // https://webservices-videogamesdb-age0.onrender.com - Team
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-allowedOrigin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    next();
  });

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", require("./src/routes"));
app.use("/games", require("./src/routes/games"));
app.use("/consoles", require("./src/routes/consoles"));
app.use("/users", require("./src/routes/users"));

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