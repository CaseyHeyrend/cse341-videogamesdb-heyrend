const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
    info: {
      version: "1.2.0",
      title: "CSE 341 Final Video Game API",
      description: "Project API for BYU-Idaho CSE 341 Winter 2025",
      contact: {
        name: "API Support - Casey Heyrend, Daniel Emerson, and Alejandro Vinay Mollinedo ",
        email: "hey12008@byui.edu, @byui.edu, and  @byui.edu",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/license/mit"
      },
    },
    servers: [
      {
        url: "cse341-videogamesdb-heyrend.onrender.com",// Add your production domain here
        // https://webservices-videogamesdb.onrender.com - Casey
        // https://webservices-videogamesdb-age0.onrender.com - Team
        description: "Production server",
      },
      {
        url: "http://localhost:8080",
        description: "Local development server",
      }
    ],
  "tags": [
  {
    "name": "Games",
    "description": "Operations about Video Games"
  },
  {
    "name": "Users",
    "description": "Operations about Users"
  },
  {
    "name": "Consoles",
    "description": "Operations about Consoles"
  },
  {
    "name": "Copies",
    "description": "Operations about Copies"
  }
],
components: {
  securitySchemes: {
    
    openIdConnect: {
      type: "oauth2",
      flows: {
        authorizationCode: {
          authorizationUrl: "https://dev-goq8gdaydc0qfbbz.us.auth0.com/authorize",
          tokenUrl: "https://dev-goq8gdaydc0qfbbz.us.auth0.com/oauth/token",
          scopes: {
            read: "Grants read access",
            write: "Grants write access",
            admin: "Grants access to admin operations",
          },
        },
      },
    },
  },
},
};

  
  // Output file
  const outputFile = "./swagger.json";
  
  /* NOTE: If you are using the express Router, you must pass in the 'routes' only the
  root file where the route starts, such as index.js, app.js, routes.js, etc ... */
  const routes = ["./src/routes/index.js", "./src/routes/games.js"];
  
  // generate swagger.json
  swaggerAutogen(outputFile, routes, doc);
