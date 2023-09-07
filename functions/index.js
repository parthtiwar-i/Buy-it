const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Nmf5gSFug6SIV6tyClhYOYz3JqbX6HTApRP9bePw1T7vrLVvNajq4MLChE4tH6H26ITDSvIDEgM0G1L4sH8Y9of00zEJybSUt"
);
//API

//aap config
const app = express();

//- middle ware  cors used for security reasons

app.use(cors({ origin: true }));
app.use(express.json());

//API routes

app.get("/", (req, res) => {
  res.status(200).send("welcom to server");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
//   console.log("payment request reciveed boom !!! ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
