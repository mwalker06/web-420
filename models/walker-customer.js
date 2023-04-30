/* 
Title: customer.js
Author: Megan Walker
Date: 4/30/2023
Description: This is the customer model file for the WEB 420 RESTful APIs assignment.
References: WEB 420 RESTful APIs GitHub repository & WEB 420 RESTful APIs assignment instructions
*/

// import statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set line item schema
const lineItemSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number
});

// set invoice schema
const invoiceSchema = new Schema({
  subtotal: Number,
  tax: Number,
  dateCreated: String,
  dateShipped: String,
  lineItems: [lineItemSchema]
});

// set customer schema
const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  invoices: [invoiceSchema]
});


module.exports = mongoose.model('Customer', customerSchema);
