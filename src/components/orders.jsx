import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import { db } from "../firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Order from "./order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // const ref = doc(collection(db , "users" , user?.uid , "orders"));
    // const q  = query(ref , orderBy("created" , "desc"));
    const userDocRef = doc(db, "users", user?.uid); // Reference to the user's document
    const ordersCollectionRef = collection(userDocRef, "orders"); // Reference to the "orders" collection within the user's document
    const q = query(ordersCollectionRef, orderBy("created", "desc"));

    onSnapshot(q, (snapshot) => {
      //   console.log("snapshot", snapshot);
      //   snapshot.forEach((doc) => {
      //     console.log(doc.data().basket);
      //   });
      //   console.log("data of snapshot-id is", snapshot.data());
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [user]);

  //   console.log(" the orders are", orders);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="order_container">
        {orders?.map((order) => [<Order order={order} />])}
      </div>
    </div>
  );
}

export default Orders;
