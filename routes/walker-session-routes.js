/**
 * Title: session-routes.js
 * Author: Megan Walker
 * Date: 4/23/2023
 * Description: session routes file
 * References: WEB 420 RESTful APIs GitHub repository & WEB 420 RESTful APIs assignment instructions
 */

// Require statements
const express = require("express");

// Require the express router
const router = express.Router();

// Require the walker-user model
const User = require("../models/walker-user");

// Require bcrypt
const bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *      - user
 *     summary: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Registered user
 *       401:
 *         description: Username is already in use
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

// Register a new user
router.post("/signup", async (req, res) => {
  try {
    // Get the user name, password, and email address from the request body
    const { userName, password, emailAddress } = req.body;
    const user = await User.findOne({ userName: userName });
    // If the user does not exist, create a new user
    if (!user) {
      const newRegisteredUser = {
        userName: userName,
        password: bcrypt.hashSync(password, saltRounds),
        emailAddress: emailAddress,
      };
      await User.create(newRegisteredUser);
      return res.status(200).send("Registered user");
      // If the user exists, return an error
    } else {
      return res.status(401).send("Username is already in use");
    }
    // Catch any server exceptions
  } catch (err) {
    console.error(err);
    // Catch any MongoDB exceptions
    if (err.name === "MongoError") {
      return res.status(501).send("MongoDB Exception");
    }
    // Catch any other exceptions
    return res.status(500).send("Server Exception");
  }
});

/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *      - user
 *     summary: Authenticate a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in
 *       401:
 *         description: Invalid username and/or password
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

// Authenticate a user
router.post("/login", async (req, res) => {
    // Get the user name and password from the request body
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });
    // If the user exists, compare the password
    if (user) {
        // If the password matches, return a success message
      if (bcrypt.compareSync(password, user.password)) {
        return res.status(200).send("User logged in");
        // If the password does not match, return an error
      } else {
        return res.status(401).send("Invalid username and/or password");
      }
      // If the user does not exist, return an error
    } else {
      return res.status(401).send("Invalid username and/or password");
    }
    // Catch any server exceptions
  } catch (err) {
    console.error(err);
    // Catch any MongoDB exceptions
    if (err.name === "MongoError") {
      return res.status(501).send("MongoDB Exception");
    }
    // Catch any other exceptions
    return res.status(500).send("Server Exception");
  }
});

// Export the router
module.exports = router;
