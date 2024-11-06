import React, { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { Table, Typography, InputNumber, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState([]); // State to track quantities based on index
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch product details for each product ID in the cart
  const fetchProducts = async (productIds) => {
    const productDetails = [];
    for (const id of productIds) {
      try {
        const response = await getProductById(id);
        productDetails.push(response); // Collect the product details
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
    setProducts(productDetails); // Update state with fetched product details
    setLoading(false); // Set loading to false after fetching
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const productIds = cartItems.map((item) => item.productId); // Extract product IDs
    fetchProducts(productIds); // Fetch product details

    // Initialize quantities based on cart items (by index)
    const initialQuantities = cartItems.map((item) => item.quantity || 1); // Default to 1 if no quantity is specified
    setQuantities(initialQuantities);
  }, []);

  const handleQuantityChange = (index, value) => {
    // Ensure the quantity is a valid number
    if (value < 1) return; // Prevent setting quantity less than 1
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = value; // Update quantity for the specific index
      return newQuantities;
    });
  };

  const handleUpdateCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Update quantities based on user input
    const updatedCart = cartItems.map((item, index) => ({
      productId: item.productId,
      quantity: quantities[index] || 1, // Update with the new quantity
    }));

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Cart updated successfully!");
  };

  const handleRemoveItem = (index) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    // Remove the item at the specified index
    cartItems.splice(index, 1);

    // Update localStorage and state
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // Re-fetch the products after removal
    const remainingProductIds = cartItems.map((item) => item.productId);
    fetchProducts(remainingProductIds);
    window.location.reload(); // Reload the page to reflect the changes
  };

  const handleCheckout = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    // Navigate to checkout page
    navigate("/checkout");
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>; // Centered loading indicator
  }

  // Define columns for the Ant Design table
  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      render: (text, product) => (
        <div className="flex gap-6">
          <img src={product.imageUrls[0]} alt={product.name} className="w-20 h-20 object-cover" />
          <p className="text-lg font-semibold">{product.name}</p>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text, product, index) => (
        <InputNumber
          min={1}
          value={quantities[index] || 1} // Get quantity based on index
          onChange={(value) => handleQuantityChange(index, value)}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, product, index) => (
        <p className="text-lg font-semibold">${(product.price * (quantities[index] || 1))}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, __, index) => (
        <Button color="danger" variant="solid" onClick={() => handleRemoveItem(index)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10">
      <Title level={2}>Your Cart</Title>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          pagination={false} // Disable pagination for simplicity
        />
      )}
      <div className="flex justify-end">
        <Button type="primary" onClick={handleUpdateCart}>
          Update Cart
        </Button>
        <Button color="default" variant="outlined" onClick={handleCheckout} className="ml-2">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
