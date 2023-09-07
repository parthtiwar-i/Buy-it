import React, { forwardRef } from "react";
import "./CheckputProduct.css";
import { useStateValue } from "./StateProvider";

const CheckoutProduct = forwardRef(
  ({ id, title, image, about, price, rating, hideButton }, ref) => {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
      // console.log("removed" , {id});
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id,
      });
    };

    return (
      <div ref={ref} className="checkout__product">
        <img className="product_img" src={image} alt="" />
        <div className="product_info">
          <p className="product_title">
            <strong>{title}</strong>
          </p>
          <p className="product_about">{about}</p>
          <p className="product_price">
            <small>₹</small>
            <strong>{price}</strong>
          </p>
          <div className="product_rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>⭐</p>
              ))}
          </div>
          {!hideButton && (
            <button onClick={removeFromBasket}>Remove from cart</button>
          )}
        </div>
      </div>
    );
  }
);

export default CheckoutProduct;
