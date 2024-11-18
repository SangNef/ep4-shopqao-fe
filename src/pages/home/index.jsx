import React, { useEffect, useState } from "react";
import "./home.css";
import { getManProducts, getWomanProducts, getKidProducts, getUnisexProducts } from "../../api/product";
import ProductCarousel from "./carousel";
import { subscribing } from "../../api/auth";
import { Link } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubscribe = async () => {
    const response = await subscribing({ email, name });
    if (response) {
      alert("Subscribed successfully");
    }
  };

  useEffect(() => {
    document.title = "XShop - Home";
  }, []);

  return (
    <div className="home-container">
      <div className="banner">
        <Link to="/all-product" className="item-1 group overflow-hidden">
          <img src="https://themewagon.github.io/hexashop/assets/images/left-banner-image.jpg" alt="" className="group-hover:scale-110 duration-150 ease-in-out" />
          <h2>We are XShop</h2>
        </Link>
        <Link to="/women-product" className="item-2 group overflow-hidden">
          <img src="https://themewagon.github.io/hexashop/assets/images/baner-right-image-01.jpg" alt="" className="group-hover:scale-110 duration-150 ease-in-out" />
          <h2>Women</h2>
          <p>Best Clothes For Women</p>
        </Link>
        <Link to="/man-product" className="item-2 group overflow-hidden">
          <img src="https://themewagon.github.io/hexashop/assets/images/baner-right-image-02.jpg" alt="" className="group-hover:scale-110 duration-150 ease-in-out" />
          <h2>Men</h2>
          <p>Best Clothes For Men</p>
        </Link>
        <Link to="/kids-product" className="item-2 group overflow-hidden">
          <img src="https://themewagon.github.io/hexashop/assets/images/baner-right-image-03.jpg" alt="" className="group-hover:scale-110 duration-150 ease-in-out" />
          <h2>Kids</h2>
          <p>Best Clothes For Kids</p>
        </Link>
        <Link to="/unisex-product" className="item-2 group overflow-hidden">
          <img src="https://themewagon.github.io/hexashop/assets/images/baner-right-image-04.jpg" alt="" className="group-hover:scale-110 duration-150 ease-in-out" />
          <h2>Unisex</h2>
          <p>Best Trend Unisex</p>
        </Link>
      </div>

      {/* Carousels */}
      <ProductCarousel title="Men's Latest" heading="Details to details is what makes Hexashop different from the other themes." fetchProducts={getManProducts} />
      <ProductCarousel title="Women's Latest" heading="Details to details is what makes Hexashop different from the other themes." fetchProducts={getWomanProducts} />
      <ProductCarousel title="Kid's Latest" heading="Details to details is what makes Hexashop different from the other themes." fetchProducts={getKidProducts} />
      <ProductCarousel title="Unisex Latest" heading="Details to details is what makes Hexashop different from the other themes." fetchProducts={getUnisexProducts} />

      {/* Subscription Section */}
      <div className="max-w-[1120px] mx-auto mt-16 px-4 text-center">
        <h3 className="text-xl font-semibold">By Subscribing To Our Newsletter You Can Get 30% Off</h3>
        <p className="mb-6 text-gray-600">Details to details is what makes Hexashop different from the other themes.</p>
        
        <div className="flex justify-center items-center space-x-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-xs p-3 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-xs p-3 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSubscribe}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
