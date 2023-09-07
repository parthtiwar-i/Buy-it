import React, { useState } from "react";
import logo from "./logo.ico";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "../firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className={`header ${isOpen ? "open" : ""}`}>
      <Link to={"/"}>
        <img className="header__logo" src={logo} />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className={`header__nav`}>
        <Link to={!user && "/Login"}>
          <div className="header__options">
            <span className="nav_line_one" onClick={handleAuth}>
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="nav_line_two">
              {user ? "sign Out" : "sign In"}
            </span>
          </div>
        </Link>

        <Link to={user ? "/orders" : "/Login"}>
          <div className="header__options">
            <span className="nav_line_one">Returns</span>
            <span className="nav_line_two">& Orders</span>
          </div>
        </Link>

        <div className="header__options">
          <span className="nav_line_one">your</span>
          <span className="nav_line_two">Prime</span>
        </div>
        <Link to={"/Checkout"}>
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="nav_line_one header-basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
      <div className="hamburger__icon" onClick={toggleNavbar}>
        <div className={`bar ${isOpen ? "animate" : ""}`}></div>
        <div className={`bar ${isOpen ? "animate" : ""}`}></div>
        <div className={`bar ${isOpen ? "animate" : ""}`}></div>
      </div>
    </div>
  );
}

export default Header;
