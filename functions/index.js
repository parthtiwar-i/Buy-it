// const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(process.env("STRIPE_KEY"));
//  API

//  app config
const app = express();

//  - middle ware  cors used for security reasons

app.use(cors({origin: true}));
app.use(express.json());

//  API routes

app.get("/", (req, res) => {
  res.status(200).send("welcom to server");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  //  console.log("payment request reciveed boom !!! ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

<<<<<<< Updated upstream
module.exports = app;
=======

// exports.api = functions.https.onRequest(app);
>>>>>>> Stashed changes
