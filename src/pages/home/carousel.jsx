import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const ProductCarousel = ({ title, heading, fetchProducts }) => {
  const [products, setProducts] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const itemsToShow = 3; // Số sản phẩm hiển thị cùng lúc
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
    setScrollIndex((prevIndex) => Math.min(prevIndex + 1, products.length - itemsToShow));
  };

  // Ẩn carousel nếu không có sản phẩm
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="main-content py-8">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="heading text-gray-600 mb-4">{heading}</p>
      <div className="flex items-center space-x-4">
        {/* Nút cuộn trái */}
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleScrollLeft}
          disabled={scrollIndex === 0}
        />

        {/* Danh sách sản phẩm với khả năng cuộn */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-4 transition-transform duration-300"
            style={{ transform: `translateX(-${scrollIndex * (100 / itemsToShow)}%)` }}
          >
            {products.map((product) => (
              <Link
                to={`/product-detail/${product.id}`}
                key={product.id}
                className="w-1/3 flex-shrink-0 border border-gray-300 rounded-lg p-4 bg-white shadow-lg"
              >
                <img
                  src={product.imageUrls?.[0]}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-lg mb-4"
                />
                <div className="product-info">
                  <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                  <p className="font-semibold text-lg text-gray-600">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Nút cuộn phải */}
        <Button
          icon={<ArrowRightOutlined />}
          onClick={handleScrollRight}
          disabled={scrollIndex >= products.length - itemsToShow}
        />
      </div>
    </div>
  );
};

export default ProductCarousel;
