import React from "react";
import "./Home.css";
import ProductCard from "./ProductCard";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
        className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Unrec/TallHero_3000X1200_Unrec._CB593464763_.jpg"
          alt=""
        />
      </div>
      <div className="home_row">
        <ProductCard 
        id = {1} 
        title = "Dell Alienware x16"
        price = {230000}
        rating = {3}
        image = "https://m.media-amazon.com/images/I/41r9nHGgmML._AC_UY327_FMwebp_QL65_.jpg"
        about = "Gaming Laptop, Intel Core i9 13900HK/32GB/2TB SSD/NVIDIA RTX 4090 16GB GDDR6/ 16''(40.64Cms)"
        />
        <ProductCard
        id = {2}
        title = "Apple iPhone 14 Pro Max (128 GB) - Deep Purple"
        image = "https://m.media-amazon.com/images/I/71yzJoE7WlL._AC_UY327_FMwebp_QL65_.jpg"
        about = ""
        price={150000}
        rating={5}
        />
      </div>
      <div className="home_row">
        <ProductCard
        id = {3}
        title="FUNDAY FASHION"
        image="https://m.media-amazon.com/images/I/71V0TFm3MsL._AC_UL600_FMwebp_QL65_.jpg"
        about = "Full Sleeve Blue Solid Women's Denim Jacket. 50+ baught in past month"
        rating={4}
        price={2499}
        />
        <ProductCard
        id = {4}
        title="LERIYA FASHION"
        image="https://m.media-amazon.com/images/I/713EWcF36KL._AC_UL600_FMwebp_QL65_.jpg"
        about = "Western Dresses for Women | Short A-Line Dress for Girls"
        price={1999}
        rating={3}
        />
        <ProductCard
        id = {5}
        title="FASHIMA"
        image="https://m.media-amazon.com/images/I/61aI-HctCnL._AC_UL600_FMwebp_QL65_.jpg"
        rating={4}
        price={1599}
        about=" Heels Sandals for Women and Girl, Synthetic Leather Sandals Bellies type Sandal"
        />
      </div>
      <div className="home_row">
        <ProductCard
        id = {6}
        title="PHILIPS Brilliance"
        image="https://m.media-amazon.com/images/I/61CNZJSH-FL._AC_UY327_FMwebp_QL65_.jpg"
        about="499P9H1/94 49-inch Curved SuperWide Dual QHD LCD Display with Pop-Up Webcam with Windows Hello"
        price={120000}
        rating={5}
        />
      </div>
    </div>
  );
}

export default Home;
