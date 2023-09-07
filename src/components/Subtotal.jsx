import React from "react";
import CurrencyFormat from "react-currency-format";
import "./Subtotal.css";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "../reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const Navigate = useNavigate();

  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a Gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        thousandSpacing="2s"
        prefix={"₹"}
      />
      <button
        onClick={(e) => {
          if (user) Navigate("/payment");
          else {
            Navigate("/Login");
          }
        }}
      >
        Proceed to checkout
      </button>
    </div>
  );
}

export default Subtotal;
