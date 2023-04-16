/* 
Title: person.js
Author: Megan Walker
Date: 4/16/2023
Description: This is the person model file for the WEB 420 RESTful APIs assignment.
References: WEB 420 RESTful APIs GitHub repository & WEB 420 RESTful APIs assignment instructions
*/

// Require mongoose and assign it to a variable named mongoose
const mongoose = require("mongoose");

// Add a variable named Schema and assign it the mongoose.Schema object
const Schema = mongoose.Schema;

// Create roleSchema
const roleSchema = new Schema({
  text: String,
});

// Create dependentSchema
const dependentSchema = new Schema({
  firstName: String,
  lastName: String,
});

// Create personSchema
const personSchema = new Schema({
  firstName: String,
  lastName: String,
  roles: [roleSchema],
  dependents: [dependentSchema],
  birthDate: String,
});

// Name the model “Person” and export it using module.exports
module.exports = mongoose.model("Person", personSchema);
