import React, { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { Table, Typography, InputNumber, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState([]);
  const navigate = useNavigate();

  // Fetch product details for each product ID in the cart
  const fetchProducts = async (cartItems) => {
    const productDetails = [];
    for (const item of cartItems) {
      try {
        const response = await getProductById(item.productId);
        productDetails.push(response);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
    setProducts(productDetails);
    setLoading(false);
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    fetchProducts(cartItems);
    const initialQuantities = cartItems.map((item) => item.quantity || 1);
    setQuantities(initialQuantities);

    document.title = "XShop - Cart";
  }, []);

  const handleQuantityChange = (index, value, maxQty) => {
    if (value > maxQty) return; // Prevent setting quantity higher than max
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = value;
      return newQuantities;
    });
  };

  const handleUpdateCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cartItems.map((item, index) => ({
      ...item,
      quantity: quantities[index] || 1,
    }));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Cart updated successfully!");
  };

  const handleRemoveItem = (index) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    const remainingProductIds = cartItems.map((item) => item.productId);
    fetchProducts(remainingProductIds);
    window.location.reload();
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

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
      render: (text, product, index) => {
        const cartItem = JSON.parse(localStorage.getItem("cart"))[index];
        const variant = product.variants.find((v) => v.id === cartItem.variantId);
        const maxQty = variant ? variant.qty : 1;

        return (
          <InputNumber
            min={1}
            max={maxQty}
            value={quantities[index] || 1}
            onChange={(value) => handleQuantityChange(index, value, maxQty)}
          />
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, product, index) => (
        <p className="text-lg font-semibold">${product.price * (quantities[index] || 1)}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, __, index) => (
        <Button danger onClick={() => handleRemoveItem(index)}>
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
        <>
          <Table dataSource={products} columns={columns} rowKey="id" pagination={false} />
          <div className="flex justify-end">
            <Button type="primary" onClick={handleUpdateCart}>
              Update Cart
            </Button>
            <Button onClick={handleCheckout} className="ml-2">
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
