/**
 * app.js
 * Maesh Express Example. Created by Aditya Gannavarapu (https://github.com/aditya-67)
 */

// create an express app
const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config");
const fs = require("fs");
const crypto = require("crypto");
const setuUPI = require("@setu/upi-deep-links");

// use the express-static middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("public"));

let products = [
  {
    id: 1,
    sku: "DEMO001",
    name: "This Pretty Plant",
    description: "Look at this pretty plant. Photo by Galina N on Unsplash.",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&h=600&q=80",
    amount: 1000,
    currency: "SGD",
    quantity: 20,
  },
  {
    id: 2,
    sku: "DEMO002",
    name: "Adventure Mug",
    description:
      "We’re going on an adventure! Photo by Annie Spratt on Unsplash.",
    image:
      "https://images.unsplash.com/photo-1454329001438-1752daa90420?auto=format&fit=crop&w=600&h=600&q=80",
    amount: 1500,
    currency: "SGD",
    quantity: 20,
  },
];

let orders = [];

// define the first route
app.get("/", function (req, res) {
  res.send("Hello from Maesh.");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/api-key", (req, res) => {
  res.json(config.api_key);
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.get("/orders/:id", (req, res) => {
  let order = orders.find((o) => o.reference_code === req.params.id);
  res.json(order);
});

app.post("/order-details", (req, res) => {
  reference_code = Math.random().toString(36).substring(5).toUpperCase();
  let order = req.body;
  order["payment"] = "Unpaid";
  order["status"] = "Pending";
  order["reference_code"] = reference_code;
  order["payment_method"] = "";
  orders.push(order);
  var redirect_url = "/payment?reference=" + reference_code;
  res.redirect(redirect_url);
});

app.post("/place-order", (req, res) => {
  let body = req.body;
  let order = orders.find((o) => o.reference_code === body["reference_code"]);
  order["payment"] = "Paid";
  order["status"] = "Success";
  order["payment_method"] = "Cash on Delivery";
  let product = products.find((p) => p.sku === order.sku);
  product["quantity"] -= order["quantity"];
  var redirect_url = "/redirect?reference=" + body["reference_code"];
  res.redirect(redirect_url);
});

app.post("/upi-pay", async (req, res) => {

  var setu = new setuUPI({
    schemeId: config.schemeID,
    jwtSecret: config.secret,
    setuProductInstanceId: config.productID,
    mode: "SANDBOX",
  });

  let paymentLinkBody = {
    amountValue: 100,
    billerBillID: "TEST" + ("" + Math.random()).substring(2, 8),
    amountExactness: "EXACT",
  };
  console.log(paymentLinkBody);
  let data = await setu.createPaymentLink(paymentLinkBody);
  console.log(data);
  let status = await setu.checkPaymentStatus(data["data"]["platformBillID"]);

  res.send({ data: data, status: status });
});

app.post("/complete-payment", async (req, res) => {
  var setu = await new setuUPI({
    schemeId: config.schemeID,
    jwtSecret: config.secret,
    setuProductInstanceId: config.productID,
    mode: "SANDBOX",
  });
  console.log('here');

  let request_body = req.body;
  try {
    const upi_id = request_body["upi_id"];
    const amount = parseInt(request_body["amount"]);
    let data = await setu.triggerMockPayment({
      amountValue: amount,
      upiId: upi_id,
    });
    console.log(data);
    let status = await setu.checkPaymentStatus(upi_id);
    res.send({ data: data, status: status });
  } catch (error) {
    console.error("Error completing request", error);
  }
});

// start the server listening for requests
app.listen(config.port || 3000, () => console.log("Server is running..."));
