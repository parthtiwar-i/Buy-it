import React, { useState } from "react";
import "./login.css";
import logo from "./logo.ico";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth ,email, password)
    .then(auth => {
        console.log(auth);
        if(auth){
            navigate("/");
        }
    })
    .catch(err =>{
        alert(err.message);
    })
  };

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth,email, password)
    .then(auth =>{
        console.log(auth);
        if(auth){
            navigate("/");
        }
    })
    .catch(err => {
        alert(err.message);
    })
  };

  return (
    <div className="login">
      <Link to={"/"}>
        <img className="login_logo" src={logo} alt="" />
      </Link>
      <div className="login_container">
        <h1 className="signin_heading">Sign In</h1>
        <form className="signIn_form" action="">
          <p className="email">Email or mobile number</p>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p className="password">Password</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="signIn_button" type="submit" onClick={signIn}>
            Sign In
          </button>
        </form>
        <small className="Alert">
          By continuing, you agree to Buy-it's Conditions of Use and Privacy
          Notice.
        </small>
      </div>

      <small className="line_wrapper">New to Buy-it</small>
      <button className="create_account_button" onClick={register}>
        Create your Buy-it Account
      </button>

      <div className="bottom_line"></div>
    </div>
  );
}

export default Login;
