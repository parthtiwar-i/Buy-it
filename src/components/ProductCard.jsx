import React from "react";
import "./Product.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useStateValue } from "./StateProvider";
import CurrencyFormat from "react-currency-format";

function ProductCard({ title, about, image, price, rating, id }) {
  const [{ basket }, dispatch] = useStateValue();

  // console.log("basket" , {basket});
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        about: about,
      },
    });
  };

  return (
    <div className="product_card">
      <img className="product__image" src={image} alt="" />
      <div className="product__info">
        <strong className="product__name">{title}</strong>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => {
              return <p>⭐</p>;
            })}
        </div>
        <p className="product__about">{about}</p>
        <p className="product__price">
          <strong>
            <CurrencyFormat
              renderText={(value) => (
                <>
                  <strong>{value}</strong>
                </>
              )}
              decimalScale={2}
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              thousandSpacing="2s"
              prefix={"₹"}
            />
          </strong>
        </p>
      </div>
      <button onClick={addToBasket}>
        <strong>Add to cart</strong>
        <AddShoppingCartIcon className="cart" />
      </button>
    </div>
  );
}

export default ProductCard;
