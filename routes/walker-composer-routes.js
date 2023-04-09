/**
 * Title: composer-routes.js
 * Author: Megan Walker
 * Date: 4/09/2023
 * Description:
 * References: WEB 420 RESTful APIs GitHub repository & WEB 420 RESTful APIs assignment instructions
 */

//require statement for express assigned to the variable named express
const express = require("express");

//require statement for router assigned to the variable named router
const router = express.Router();

//require statement for composer assigned to the variable named Composer
const Composer = require("../models/walker-composer");

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - composers
 *     description: Retrieves all composers
 *     summary: Retrieves all composers
 *     responses:
 *       '200':
 *         description: Array of composer documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/composers", async (req, res) => {
  try {
    Composer.find({}, function (err, composers) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception",
        });
      } else {
        console.log(composers);
        res.json(composers);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Server Exception",
    });
  }
});

/**
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *    tags:
 *      - composers
 *    description: Retrieves a composer by ID
 *    summary: Retrieves a composer by ID
 *    parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       description: ID of the composer
 *       schema:
 *         type: string
 *    responses:
 *      '200':
 *        description: Composer document
 *      '500':
 *        description: Server Exception
 *      '501':
 *        description: MongoDB Exception
 */
router.get("/composers/:id", async (req, res) => {
  try {
    Composer.findOne({ _id: req.params.id }, function (err, composer) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception",
        });
      } else {
        console.log(composer);
        res.json(composer);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Server Exception",
    });
  }
});

/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - composers
 *     name: createComposer
 *     description: Creates a new composer
 *     summary: Creates a new composer
 *     requestBody:
 *       description: Fields for the new composer
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *              - firstName
 *              - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/composers", async (req, res) => {
  try {
    const newComposer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    await Composer.create(newComposer, function (err, composer) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception",
        });
      } else {
        console.log(composer);
        res.json(composer);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Server Exception",
    });
  }
});

module.exports = router;
