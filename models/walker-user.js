/* 
Title: user.js
Author: Megan Walker
Date: 4/23/2023
Description: This is the user model file for the WEB 420 RESTful APIs assignment.
References: WEB 420 RESTful APIs GitHub repository & WEB 420 RESTful APIs assignment instructions
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  password: String,
  emailAddress: [String],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
