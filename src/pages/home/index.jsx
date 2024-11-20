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
          <img
            src="https://themewagon.github.io/hexashop/assets/images/left-banner-image.jpg"
            alt=""
            className="group-hover:scale-110 duration-150 ease-in-out"
          />
          <h2>We are XShop</h2>
        </Link>
        <Link to="/women-product" className="item-2 group overflow-hidden">
          <img
            src="https://themewagon.github.io/hexashop/assets/images/baner-right-image-01.jpg"
            alt=""
            className="group-hover:scale-110 duration-150 ease-in-out"
          />
          <h2>Women</h2>
          <p>Best Clothes For Women</p>
        </Link>
        <Link to="/man-product" className="item-2 group overflow-hidden">
          <img
            src="https://themewagon.github.io/hexashop/assets/images/baner-right-image-02.jpg"
            alt=""
            className="group-hover:scale-110 duration-150 ease-in-out"
          />
          <h2>Men</h2>
          <p>Best Clothes For Men</p>
        </Link>
        <Link to="/kids-product" className="item-2 group overflow-hidden">
          <img
            src="https://themewagon.github.io/hexashop/assets/images/baner-right-image-03.jpg"
            alt=""
            className="group-hover:scale-110 duration-150 ease-in-out"
          />
          <h2>Kids</h2>
          <p>Best Clothes For Kids</p>
        </Link>
        <Link to="/unisex-product" className="item-2 group overflow-hidden">
          <img
            src="https://themewagon.github.io/hexashop/assets/images/baner-right-image-04.jpg"
            alt=""
            className="group-hover:scale-110 duration-150 ease-in-out"
          />
          <h2>Unisex</h2>
          <p>Best Trend Unisex</p>
        </Link>
      </div>

      {/* Carousels */}
      <ProductCarousel
        title="Men's Latest"
        heading="Details to details is what makes Hexashop different from the other themes."
        fetchProducts={getManProducts}
      />
      <ProductCarousel
        title="Women's Latest"
        heading="Details to details is what makes Hexashop different from the other themes."
        fetchProducts={getWomanProducts}
      />
      <ProductCarousel
        title="Kid's Latest"
        heading="Details to details is what makes Hexashop different from the other themes."
        fetchProducts={getKidProducts}
      />
      <ProductCarousel
        title="Unisex Latest"
        heading="Details to details is what makes Hexashop different from the other themes."
        fetchProducts={getUnisexProducts}
      />

      <div className="max-w-[1120px] mx-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0969490732964!2d105.77971427584129!3d21.02880648777588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b32b842a37%3A0xe91a56573e7f9a11!2zOGEgVMO0biBUaOG6pXQgVGh1eeG6v3QsIE3hu7kgxJDDrG5oLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSAxMDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1732111922443!5m2!1svi!2s"
          width={1120}
          height={450}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

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
