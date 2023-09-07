import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import FlipMove from "react-flip-move";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://m.media-amazon.com/images/S/sonata-images-prod/ATV_IN_Desktop_leaked_v1/eea3c081-a7bb-4d99-9cb8-5e720b5010b9.__SX2375__SY475__QL60__._TTH_.jpeg"
          alt=""
        />

        <h1 className="checkout_title">
          {!user ? "Your" : user.email + "'s"} cart{" "}
        </h1>

        <FlipMove>
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              about={item.about}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </FlipMove>
      </div>

      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
