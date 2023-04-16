/* 
Title: app.js
Author: Megan Walker
Date: 4/01/2023
Description: This is the main file for the WEB 420 RESTful APIs assignment.
References: WEB 420 RESTful APIs GitHub repository & WEB 420 RESTful APIs assignment instructions
*/

const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const composersAPI = require('./routes/walker-composer-routes');
const PersonAPI = require('./routes/walker-person-routes');

// Create a new express app
const app = express();

// Set the port to process.env.PORT || 3000
const port = process.env.PORT || 3000;

// Configure express to use JSON
app.use(express.json());

// connect to MongoDB
const CONN =
  "mongodb+srv://web420_user:s3cret@bellevueuniversity.1txnlsv.mongodb.net/web420DB";

// Mongoose connection string for Atlas here
mongoose
  .connect(CONN)
  .then(() => {
    console.log(
      "Connection to MongoDB database was successful\n  If you see this message it means you were able to connect to your MongoDB Atlas cluster"
    );
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

// Configure express to use URL-encoded data with extended mode
app.use(express.urlencoded({ extended: true }));

//define and object literal named options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 420 RESTful APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // files containing annotations for the OpenAPI specs
};

// Create the Swagger/OpenAPI specification
const openapiSpecification = swaggerJsdoc(options);

app.use('/api', composersAPI);
app.use('/api', PersonAPI);

// Serve the Swagger/OpenAPI specification at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
// Create a new server that listens on the port set in the port variable
http.createServer(app).listen(port, () => {
  console.log(`Application started and listening on port ${port}.`);
});
