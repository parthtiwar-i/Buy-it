import Header from "./Header";
import Home from "./Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./checkout";
import Login from "./Login";
import Orders from "./orders";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const promise = loadStripe(
    "pk_test_51Nmf5gSFug6SIV6tSl0Oe4wjVz5SoPnZC0kkA46F18HNwTPDc6JpOEtStayu6sxR5kKDSRsR77RQdnyXB4e8zoyR00u5OaTo8d"
  );

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("the user logged in is >>", authUser);
      if (authUser) {
        // console.log(authUser);
        //user logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // console.log("no previous user");
        //user loggd out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={[<Header />, <Home />]}></Route>
          <Route path="/checkout" element={[<Header />, <Checkout />]}></Route>
          <Route path="/orders" element={[<Header />, <Orders />]}></Route>
          <Route
            path="/payment"
            element={[
              <Header />,
              <Elements stripe={promise}>
                <Payment />
              </Elements>,
            ]}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
