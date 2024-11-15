import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../api/product";
import { Radio, InputNumber, Button, message, Input, Rate } from "antd";
import { createComment, getComments } from "../../api/comment";
import "./product.css";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [inStock, setInStock] = useState(0); // New state for in-stock quantity
  const [comments, setComments] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState(""); // State for text area
  const [selectedImage, setSelectedImage] = useState(""); // New state for selected image
  const [hasCommented, setHasCommented] = useState(false); // State to check if user has commented
  const [rating, setRating] = useState(0); // New state for rating
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response);

      if (response.variants && response.variants.length > 0) {
        setSelectedSize(response.variants[0].size);
        setSelectedColor(response.variants[0].color);
        setInStock(response.variants[0].qty); // Initialize in-stock with the first variant
      }

      // Set the first image as the default selected image
      setSelectedImage(response.imageUrls[0]);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const fetchComments = async () => {
    const response = await getComments(id);
    setComments(response);

    // Check if the user has already commented
    const userComment = response.find(comment => comment.user.id === user.id);
    setHasCommented(!!userComment); // Set hasCommented to true if the user has commented
  };

  const postComment = async (content) => {
    console.log("Posting comment:", content);
    const payload = {
      product: { id: product.id }, // Pass the product ID dynamically
      user: { id: user.id }, // Assuming the user ID is 2, you can replace this with actual user info
      content: content, // The content of the comment
      rating: rating, // Include the rating when posting the comment
    };

    // Assuming you have an API function `createComment` that posts the comment
    const response = await createComment(payload);
    if (response) {
      fetchComments(); // Fetch comments again to display the new comment
      setTextAreaValue(""); // Clear the text area after posting
      setRating(0); // Reset rating after posting
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchComments();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const selectedVariant = product.variants.find(
        (variant) => variant.size === selectedSize && variant.color === selectedColor
      );

      if (selectedVariant) {
        const cartItem = {
          productId: product.id,
          variantId: selectedVariant.id,
          size: selectedSize,
          color: selectedColor,
          quantity: quantity,
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingCartItemIndex = cart.findIndex((item) => item.variantId === selectedVariant.id);

        if (existingCartItemIndex > -1) {
          cart[existingCartItemIndex].quantity += quantity;
        } else {
          cart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        message.success("Product added to cart!");
        window.location.reload();
      }
    }
  };

  const handleBuyNow = () => {
    if (product) {
      const selectedVariant = product.variants.find(
        (variant) => variant.size === selectedSize && variant.color === selectedColor
      );

      navigate(`/checkout/${product.id}/?variantId=${selectedVariant.id}&quantity=${quantity}`);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedColor(null); // Reset color when size changes
    updateInStock(size, null);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    updateInStock(selectedSize, color);
  };

  const updateInStock = (size, color) => {
    const variant = product?.variants.find((variant) => variant.size === size && variant.color === color);
    setInStock(variant ? variant.qty : 0);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Update the selected image when a thumbnail is clicked
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const uniqueSizes = [...new Set(product.variants.map((variant) => variant.size))];
  const availableColors = product.variants
    .filter((variant) => variant.size === selectedSize)
    .map((variant) => variant.color);
  const uniqueColors = [...new Set(availableColors)];

  return (
    <div className="product-container max-w-4xl mx-auto p-4">
      <div className="main-content flex flex-col lg:flex-row">
        <div className="image w-full lg:w-1/2">
          <img src={selectedImage} alt={product.name} className="w-full h-auto rounded-lg" />
        </div>
        <div className="product-info w-full p-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          {product.totalRatings > 0 && (
            <div className="flex items-center gap-4 w-full mb-4">
              <p>{product.averageRating.toFixed(1)}</p>
              <Rate disabled value={product.averageRating} /> 
              <p>| {product.totalRatings} Ratings</p>
            </div>
          )}
          <p className="text-xl text-green-600">Price: ${product.price}</p>

          <div className="sizes my-4">
            <strong className="block text-lg">Sizes:</strong>
            <ul className="list-disc list-inside">
              {uniqueSizes.map((size, index) => (
                <li key={index}>
                  <Radio value={size} checked={selectedSize === size} onChange={() => handleSizeChange(size)}>
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
                  <Radio value={color} checked={selectedColor === color} onChange={() => handleColorChange(color)}>
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
              max={inStock}
              value={quantity}
              onChange={setQuantity}
              style={{ marginLeft: "10px", width: "60px" }}
            />
            <p className="text-sm text-gray-500 mt-1">In stock: {inStock}</p>
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
            className="w-32 h-32 object-cover rounded-lg border border-gray-200 cursor-pointer"
            onClick={() => handleImageClick(url)} // Add click event to update main image
          />
        ))}
      </div>

      <div className="description my-4">
        <h3 className="text-lg font-semibold">Description:</h3>
        <p>{product.description}</p>
      </div>

      <div className="comments-section my-4">
        <h3 className="text-lg font-semibold">Comments:</h3>
        {!hasCommented && (
          <div className="comment-form my-4">
            <Rate value={rating} onChange={setRating} className="my-2" />
            <Input.TextArea
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
              rows={4}
              placeholder="Leave a comment"
            />
            <Button
              type="primary"
              className="mt-2"
              onClick={() => {
                if (textAreaValue.trim()) {
                  postComment(textAreaValue);
                } else {
                  message.error("Please enter a comment.");
                }
              }}
            >
              Submit Comment
            </Button>
          </div>
        )}

        <div className="comment-list my-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment py-2 border-b">
                <p>
                  <strong>{comment.user.username}</strong>: {comment.content}
                  <span className="ml-2 text-yellow-500">Rating: {comment.rating} stars</span>
                </p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
