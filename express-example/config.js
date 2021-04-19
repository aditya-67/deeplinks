/**
 * config.js
 * Maesh Express Example. Created by Aditya Gannavarapu (https://github.com/aditya-67)
 */

'use strict';

// Load environment variables from the `.env` file.
require('dotenv').config();

module.exports = {

  // Server port.
  port: process.env.PORT || 5000,
  schemeID : process.env.schemeID,
  secret: process.env.secret,
  productID : process.env.productID
};
