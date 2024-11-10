import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { ShoppingCartOutlined, CreditCardOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const ProductCarousel = ({ title, heading, fetchProducts }) => {
  const [products, setProducts] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const itemsToShow = 3;
  const navigate = useNavigate();

  const fetchProductsData = async () => {
    const response = await fetchProducts();
    setProducts(response);
  };

  useEffect(() => {
    fetchProductsData();
  }, [fetchProducts]);

  const handleScrollLeft = () => {
    setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleScrollRight = () => {
    setScrollIndex((prevIndex) => Math.min(prevIndex + 1, Math.ceil(products.length / itemsToShow) - 1));
  };

  // Ẩn carousel nếu không có sản phẩm
  if (products.length === 0) {
    return null;
  }

  const handleAddToCart = (product) => {
    console.log("Add to Cart", product);
  };

  const handleBuyNow = (product) => {
    navigate(`/checkout/${product.id}`);
  };

  return (
    <div className="main-content">
      <h2>{title}</h2>
      <p className="heading">{heading}</p>
      <div className="product-carousel">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleScrollLeft} 
          disabled={scrollIndex === 0}
        />
        <div className="product-list" style={{ transform: `translateX(-${scrollIndex * (100 / itemsToShow)}%)` }}>
          {products.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg">
              <img src={product.imageUrls?.[0]} alt={product.name} className="w-full h-auto rounded-lg mb-4" />
              <div className="product-info">
                <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                <p className="font-semibold text-lg text-gray-600">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <Button 
          icon={<ArrowRightOutlined />} 
          onClick={handleScrollRight} 
          disabled={scrollIndex >= Math.ceil(products.length / itemsToShow) - 1}
        />
      </div>
    </div>
  );
};

export default ProductCarousel;
