/**
 * Title: team-routes.js
 * Author: Megan Walker
 * Date: 5/14/2023
 * Description: team routes file
 * References: WEB 420 RESTful APIs GitHub repository & WEB 420 RESTful APIs assignment instructions
 */

// Require express and get router
const express = require("express");
const router = express.Router();

// Get Team model
const Team = require("../models/walker-team");

/**
 * @openapi
 * /api/teams:
 *  get:
 *   tags:
 *    - teams
 *   description: API for returning all teams
 *   summary: Returns all teams in the database
 *   responses:
 *     '200':
 *       description: Array of team documents
 *     '500':
 *       description: Server Exception
 *     '501':
 *       description: MongoDB Exception
 *  */
router.get("/teams", async (req, res) => {
    try {
        Team.find({}, function (err, teams) {
        if (err) {
            console.log(err);
            res.status(501).send({
                message: "MongoDB Exception",
            });
        } else {
            res.json(teams);
        }
        });
    } catch (err) {
        res.status(500).send({
            message: "Server Exception",
        });
    }
    }
);

module.exports = router;