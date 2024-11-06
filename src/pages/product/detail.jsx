import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../api/product";
import { Radio, InputNumber, Button, message } from "antd";
import "./product.css";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response);

      if (response.variants && response.variants.length > 0) {
        setSelectedSize(response.variants[0].size);
        setSelectedColor(response.variants[0].color);
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const selectedVariant = product.variants.find(
        (variant) => variant.size === selectedSize && variant.color === selectedColor
      );

      if (selectedVariant) {
        const cartItem = {
          productId: product.id,
          variantId: selectedVariant.id, // Include variant ID
          size: selectedSize,              // Include selected size
          color: selectedColor,            // Include selected color
          quantity: quantity,              // Include quantity
        };

        // Get existing cart items from local storage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        // Check if the item is already in the cart
        const existingCartItemIndex = cart.findIndex(
          (item) => item.variantId === selectedVariant.id // Compare by variant ID
        );

        if (existingCartItemIndex > -1) {
          // If item already exists, update the quantity
          cart[existingCartItemIndex].quantity += quantity;
        } else {
          // If not, add the new cart item
          cart.push(cartItem);
        }

        // Update local storage with the new cart
        localStorage.setItem("cart", JSON.stringify(cart));
        message.success("Product added to cart!");
        window.location.reload(); // Refresh the page to update the cart icon
      }
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // Find the selected variant based on the selected size and color
      const selectedVariant = product.variants.find(
        (variant) => variant.size === selectedSize && variant.color === selectedColor
      );

      if (selectedVariant) {
        const productDetails = {
          productId: product.id,
          variantId: selectedVariant.id, // Store the variant ID
          size: selectedSize,              // Store the selected size
          color: selectedColor,            // Store the selected color
          quantity: quantity,              // Store the quantity
        };
        localStorage.setItem("selectedProduct", JSON.stringify(productDetails));
        navigate("/checkout");
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const uniqueSizes = [...new Set(product.variants.map((variant) => variant.size))];
  const uniqueColors = [...new Set(product.variants.map((variant) => variant.color))];

  return (
    <div className="product-container max-w-4xl mx-auto p-4">
      <div className="main-content flex flex-col lg:flex-row">
        <div className="image w-full lg:w-1/2">
          <img src={product.imageUrls?.[0]} alt={product.name} className="w-full h-auto rounded-lg" />
        </div>
        <div className="product-info w-full lg:w-1/2 p-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-xl text-green-600">Price: ${product.price}</p>

          <div className="sizes my-4">
            <strong className="block text-lg">Sizes:</strong>
            <ul className="list-disc list-inside">
              {uniqueSizes.map((size, index) => (
                <li key={index}>
                  <Radio value={size} checked={selectedSize === size} onChange={() => setSelectedSize(size)}>
                    {size}
                  </Radio>
                </li>
              ))}
            </ul>
          </div>

          <div className="colors my-4">
            <strong className="block text-lg">Colors:</strong>
            <ul className="list-disc list-inside">
              {uniqueColors.map((color, index) => (
                <li key={index}>
                  <Radio value={color} checked={selectedColor === color} onChange={() => setSelectedColor(color)}>
                    {color}
                  </Radio>
                </li>
              ))}
            </ul>
          </div>

          <div className="quantity my-4">
            <strong className="block text-lg">Quantity:</strong>
            <InputNumber
              min={1}
              value={quantity}
              onChange={setQuantity}
              style={{ marginLeft: "10px", width: "60px" }}
            />
          </div>

          <div className="action-buttons my-4">
            <Button type="primary" className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button type="danger" className="buy-now ml-2" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto space-x-2">
        {product.imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Additional image ${index + 1}`}
            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
          />
        ))}
      </div>

      <div className="description my-4">
        <h3 className="text-lg font-semibold">Description:</h3>
        <p>{product.description}</p>
      </div>

      <div className="additional-info my-4">
        <h3 className="text-lg font-semibold">Warranty Information:</h3>
        <ul className="list-disc list-inside">
          <li>1-year warranty on manufacturing defects.</li>
          <li>Coverage for parts and labor.</li>
          <li>Excludes accidental damage.</li>
          <li>Requires proof of purchase.</li>
        </ul>

        <h3 className="text-lg font-semibold">Shipping Information:</h3>
        <ul className="list-disc list-inside">
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
