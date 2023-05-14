/* 
Title: team.js
Author: Megan Walker
Date: 5/14/2023
Description: This is the team model file for the WEB 420 RESTful APIs assignment.
References: WEB 420 RESTful APIs GitHub repository & WEB 420 RESTful APIs assignment instructions
*/

// Require mongoose and assign it to a variable named mongoose
const mongoose = require("mongoose");

// Add a variable named Schema and assign it the mongoose.Schema object
const Schema = mongoose.Schema;

// Create playerSchema
const playerSchema = new Schema({
  firstName: String,
  lastName: String,
  salary: Number,
});

// Create teamSchema
const teamSchema = new Schema({
  name: String,
  mascot: String,
  players: [playerSchema],
});

// Name the model “Team” and export it using module.exports
module.exports = mongoose.model("Team", teamSchema);
