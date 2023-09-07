import React from "react";
import "./order.css";
import moment from "moment/moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      {/* install moment for getting the sorted date so we can show the orders based on the date 
        so its like a time stamp */}
      <p>{moment.unix(order.data.created).format("MMMM Do YY, h:mm a")}</p>

      <p className="order_id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          about={item.about}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
          <h3 className="order_total">Order total : {value} </h3>
          </>
        )}
        decimalScale={2}
        value={order.data.amount}
        displayType={"text"}
        thousandSeparator={true}
        thousandSpacing="2s"
        prefix={"₹"}
      />

    </div>
  );
}

export default Order;
