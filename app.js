// Title: app.js
// Author: Megan Walker
// Date: 4/01/2023
// Description: This is the main file for the WEB 420 RESTful APIs assignment.
// References: WEB 420 RESTful APIs GitHub repository & WEB 420 RESTful APIs assignment instructions

const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");

// Create a new express app
const app = express();

// Set the port to process.env.PORT || 3000
const port = process.env.PORT || 3000;

// Configure express to use JSON
app.use(express.json());

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

// Serve the Swagger/OpenAPI specification at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
// Create a new server that listens on the port set in the port variable
http.createServer(app).listen(port, () => {
  console.log(`Application started and listening on port ${port}.`);
});
