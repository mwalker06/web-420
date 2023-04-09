/* 
Title: composer.js
Author: Megan Walker
Date: 4/09/2023
Description: This is the composer model file for the WEB 420 RESTful APIs assignment.
References: WEB 420 RESTful APIs GitHub repository & WEB 420 RESTful APIs assignment instructions
*/

//require statement for mongoose assigned to the variable named mongoose
const mongoose = require("mongoose");

//variable named Schema assigned to the Schema property of the mongoose object
const Schema = mongoose.Schema;

// variable named composerSchema assigned to the Schema object
const composerSchema = new Schema({
  firstName: String,
  lastName: String,
});

//variable named Composer assigned to the model method of the mongoose object
const Composer = mongoose.model("Composer", composerSchema);

//export the Composer object
module.exports = Composer;

