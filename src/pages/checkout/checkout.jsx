import React, { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { createOrder } from "../../api/order"; // Import the createOrder function
import { Radio, Input, Button, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Checkout = () => {
  const [product, setProduct] = useState({});
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Fetch the product information based on the product ID stored in local storage
  const fetchProduct = async () => {
    try {
      const response = await getProductById(selectedProduct.productId);
      const data = await response;
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      fetchProduct();
    }
  }, []);

  // Handle payment method change
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    // Construct the order data
    const orderData = {
      user: { id: userInfo.id }, // Assuming userInfo contains the user ID
      product: { id: selectedProduct.productId },
      size: selectedProduct.size,
      color: selectedProduct.color,
      qty: selectedProduct.quantity,
      price: product.price * selectedProduct.quantity, // Calculate total price based on quantity
      payment: paymentMethod === "cash" ? "CASH" : "PAY", // Map payment method to enum
      phone: values.phone, // Use the phone value from the form
      address: values.address, // Use the address value from the form
    };

    // Log all required information
    console.log("Order Data:", orderData);

    try {
      // Call the createOrder function
      const response = await createOrder(orderData);
      console.log("Order created successfully:", response);
      navigate("/"); // Redirect to home page after successful order
    } catch (error) {
      console.error("Failed to create order:", error);
      // Handle error (e.g., showing an error message)
    }
  };

  return (
    <div className="checkout-container">
      <Title level={1}>Checkout</Title>
      <div className="product-detail">
        <img src={product.imageUrl} alt={product.name} />
        <div className="product-info">
          <Title level={2}>{product.name}</Title>
          <p>${product.price}</p>
          <p>
            Size: {selectedProduct.size} - Color: {selectedProduct.color} - Qty: {selectedProduct.quantity}
          </p>
        </div>
      </div>
      <Form onFinish={handleSubmit}>
        <Title level={2}>Shipping Information</Title>
        <Form.Item label="Name">
          <Input
            name="name"
            value={userInfo ? userInfo.fullname : ""}
            disabled
          />
        </Form.Item>
        <Form.Item label="Address" name="address" required>
          <Input
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Phone" name="phone" required>
          <Input
            value={shippingInfo.phone}
            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Payment Method">
          <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
            <Radio value="cash">Cash</Radio>
            <Radio value="vnPay">VNPay</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Place Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Checkout;
