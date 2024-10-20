import React from "react";
import "./home.css";
import { getManProducts, getWomanProducts, getKidProducts, getUnisexProducts } from "../../api/product";
import ProductCarousel from "./carousel";

const Home = () => {
  return (
    <div className="home-container">
      <div className="banner">
        <div className="item-1">
          <img src="https://themewagon.github.io/hexashop/assets/images/left-banner-image.jpg" alt="" />
          <h2>We are XShop</h2>
        </div>
        <div className="item-2">
          <img src="https://themewagon.github.io/hexashop/assets/images/baner-right-image-01.jpg" alt="" />
          <h2>Women</h2>
          <p>Best Clothes For Women</p>
        </div>
        <div className="item-2">
          <img src="https://themewagon.github.io/hexashop/assets/images/baner-right-image-02.jpg" alt="" />
          <h2>Men</h2>
          <p>Best Clothes For Men</p>
        </div>
        <div className="item-2">
          <img src="https://themewagon.github.io/hexashop/assets/images/baner-right-image-03.jpg" alt="" />
          <h2>Kids</h2>
          <p>Best Clothes For Kids</p>
        </div>
        <div className="item-2">
          <img src="https://themewagon.github.io/hexashop/assets/images/baner-right-image-04.jpg" alt="" />
          <h2>Accessories</h2>
          <p>Best Trend Accessories</p>
        </div>
      </div>
      {/* Carousels */}
      <ProductCarousel title="Men's Latest" heading="Details to details is what makes Hexashop different from the other themes." fetchProducts={getManProducts} />
      <ProductCarousel title="Women's Latest" heading="Details to details is what makes Hexashop different from the other themes." fetchProducts={getWomanProducts} />
      <ProductCarousel title="Kid's Latest" heading="Details to details is what makes Hexashop different from the other themes." fetchProducts={getKidProducts} />
      <ProductCarousel title="Unisex Latest" heading="Details to details is what makes Hexashop different from the other themes." fetchProducts={getUnisexProducts} />
    </div>
  );
};

export default Home;
