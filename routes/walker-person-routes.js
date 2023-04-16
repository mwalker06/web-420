/**
 * Title: person-routes.js
 * Author: Megan Walker
 * Date: 4/15/2023
 * Description: person routes file
 * References: WEB 420 RESTful APIs GitHub repository & WEB 420 RESTful APIs assignment instructions
 */

//require statement for express assigned to the variable named express
const express = require("express");

//require statement for router assigned to the variable named router
const router = express.Router();

//require statement for person assigned to the variable named Person
const Person = require("../models/walker-person");

// Find all persons operation
/**
 @openapi
* /api/persons:
*     get:
*       tags:
*         - persons
*       description: Get all persons
*       responses:
*         '200':
*           description: A list of persons
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*         '500':
*           description: Server exception
*         '501':
*           description: MongoDB exception
*/
router.get("/persons", async (req, res) => {
  try {
    Person.find({}, function (err, persons) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception",
        });
      } else {
        console.log(persons);
        res.json(persons);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Server Exception",
    });
  }
});

/** createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - persons
 *     name: createPerson
 *     description: Creates a new person
 *     summary: Creates a new person
 *     requestBody:
 *       description: Fields for the new person
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *              - firstName
 *              - lastName
 *              - birthDate
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roles:
 *                 type: array
 *               dependents:
 *                 type: array
 *               birthDate:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/persons", async (req, res) => {
  try {
    const newPerson = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles,
      dependents: req.body.dependents,
      birthDate: req.body.birthDate,
    };

    await Person.create(newPerson, function (err, person) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception",
        });
      } else {
        console.log(person);
        res.json(person);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Exception",
    });
  }
});

// Export the router
module.exports = router;
