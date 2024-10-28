import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../api/product";
import { Radio, InputNumber, Button } from "antd";
import "./product.css";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null); // Set initial state to null
  const [selectedColor, setSelectedColor] = useState(null); // Set initial state to null
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response);
      // Set default size and color after product is loaded
      setSelectedSize(response.sizes[0]);
      setSelectedColor(response.colors[0]);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    if (product) {
      const productDetails = {
        productId: product.id,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
      };
      localStorage.setItem("selectedProduct", JSON.stringify(productDetails));
      // Optional: Navigate to a different page after buying
      navigate('/checkout');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-container">
      <div className="main-content">
        <div className="image">
          <img src={product.imageUrls?.[0]} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">Price: ${product.price}</p>

          <div className="sizes">
            <strong>Sizes:</strong>
            <ul>
              {product.sizes.map((size, index) => (
                <li key={index}>
                  <Radio
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                  >
                    {size}
                  </Radio>
                </li>
              ))}
            </ul>
          </div>

          <div className="colors">
            <strong>Colors:</strong>
            <ul>
              {product.colors.map((color, index) => (
                <li key={index}>
                  <Radio
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                  >
                    {color}
                  </Radio>
                </li>
              ))}
            </ul>
          </div>

          <div className="quantity">
            <strong>Quantity:</strong>
            <InputNumber
              min={1}
              value={quantity}
              onChange={setQuantity}
              style={{ marginLeft: "10px", width: "60px" }}
            />
          </div>

          <div className="action-buttons">
            <Button type="primary" className="add-to-cart">
              Add to Cart
            </Button>
            <Button type="danger" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <div className="description">
        <h3>Description:</h3>
        <p>{product.description}</p>
      </div>

      <div className="additional-info">
        <h3>Warranty Information:</h3>
        <ul>
          <li>1-year warranty on manufacturing defects.</li>
          <li>Coverage for parts and labor.</li>
          <li>Excludes accidental damage.</li>
          <li>Requires proof of purchase.</li>
        </ul>

        <h3>Shipping Information:</h3>
        <ul>
          <li>Free shipping on orders over $50.</li>
          <li>Standard delivery: 3-5 business days.</li>
          <li>Express delivery available for an additional fee.</li>
          <li>International shipping rates vary by location.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;
