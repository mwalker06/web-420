/**
 * Title: node-shopper-routes.js
 * Author: Megan Walker
 * Date: 4/30/2023
 * Description: node-shopper routes file
 * References: WEB 420 RESTful APIs GitHub repository & WEB 420 RESTful APIs assignment instructions
 */

// modules to require
const express = require("express");

// assign express to router
const router = express.Router();

// the schema for the customers collection
const Customer = require("../models/walker-customer.js");

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - customers
 *     name: createCustomer
 *     summary: Creates a new Customer document
 *     requestBody:
 *       description: Customer Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/customers", async (req, res) => {
  try {
    const newCustomer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
    };

    await Customer.create(newCustomer, function (err, customer) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(customer);
        res.json(customer);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - customers
 *     name: createInvoiceByUserName
 *     description: API for creating a new invoice by username
 *     summary: Create a new invoice by username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The username that creates a new invoice
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: string
 *               tax:
 *                 type: string
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          price:
 *                              type: number
 *                          quantity:
 *                              type: number
 *     responses:
 *       '200':
 *         description: Customer invoice added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/customers/:username/invoices", async (req, res) => {
    console.log(req.params.username);
    try {
    Customer.findOne(
      { userName: req.params.username },
      function (err, customer) {
        let newInvoice = {
          subtotal: req.body.subtotal,
          tax: req.body.tax,
          dateCreated: req.body.dateCreated,
          dateShipped: req.body.dateShipped,
          lineItems: req.body.lineItems,
        };

        console.log(req.params.username);

        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
            console.log(customer);
            console.log(newInvoice);
          customer.invoices.push(newInvoice);


          customer.save(function (err, Customer) {
            if (err) {
              console.log(err);
            } else {
              console.log(Customer);
              res.json(Customer);
            }
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     tags:
 *       - customers
 *     description:  API for looking up an invoice by username
 *     summary: Looks up an invoice by username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Customer userName
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer Found in MongoDB
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/customers/:username/invoices", async (req, res) => {
    console.log(req.params.username);
  try {
    Customer.findOne(
      { userName: req.params.username },
      function (err, customer) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(customer);
          res.json(customer.invoices);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

module.exports = router;
