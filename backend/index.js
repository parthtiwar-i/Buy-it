const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Nmf5gSFug6SIV6tyClhYOYz3JqbX6HTApRP9bePw1T7vrLVvNajq4MLChE4tH6H26ITDSvIDEgM0G1L4sH8Y9of00zEJybSUt"
);

const app = express();

// const corsOptions = {
//     // Replace with your Firebase app's URL
//   origin: "https://buy-it-f0426.web.app/payment", 
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// };

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welsome to localhost server 3000");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  // const total = req.query.total;
   console.log("payment request reciveed boom !!! ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });

  res.status(201).json({
    clientSecret: paymentIntent.client_secret,
  });
});

// try {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: total,
//     currency: "INR",
//   });

//   res.status(201).send({
//     clientSecret: paymentIntent.client_secret,
//   });
// } catch (error) {
//   res.status(500).send({
//     error: error.message,
//   });
// }
//   });

app.listen(process.env.PORT || "3001", (req, res) => {
  console.log("server is running at port 3000");
});
