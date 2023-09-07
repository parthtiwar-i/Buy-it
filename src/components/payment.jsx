import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getBasketTotal } from "../reducer";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { db } from "../firebase";
import { collection, doc, setDoc } from 'firebase/firestore';


function Payment() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeded, setSucceded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  // console.log("the secret is >>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment Confermation
        const orderRef = doc(
          collection(db, "users", user?.uid, "orders"),
          paymentIntent.id
        );
        setDoc(orderRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        })
          .then(() => {
            console.log("Order data has been successfully added to Firestore.");
          })
          .catch((error) => {
            console.error("Error adding order data to Firestore: ", error);
          });

        setSucceded(true);
        setError(false);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate("/orders", { replace: true });
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to={"/checkout"}> {basket?.length} items </Link>){" "}
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h1>Delivery Address</h1>
          </div>
          <div className="payment_address">
            <p>{!user ? "your" : user.email}, 1374, east town Los Angeles</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h1>Review items and Delivery </h1>
          </div>
          <div className="payment_products">
            {basket?.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                about={item.about}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h1>Payment Method</h1>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Order total ({basket.length} items):{" "}
                        <strong>{value}</strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  thousandSpacing="2s"
                  prefix={"₹"}
                />
              </div>
              <button  disabled={processing || disabled || succeded}>
                <span>{processing ? <p>Processing</p> : "Buy it"}</span>
              </button>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
