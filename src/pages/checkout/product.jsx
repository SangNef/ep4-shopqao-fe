import React, { useEffect, useState } from 'react';
import { getProductById } from '../../api/product';
import { useParams } from 'react-router-dom';
import { Input, Button, Radio, Form, message } from 'antd';
import './checkout.css';

const CheckoutProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  
  const [form] = Form.useForm();

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handlePlaceOrder = () => {
    form
      .validateFields()
      .then((values) => {
        message.success('Order placed successfully!');
        console.log('Order Details:', {
          ...values,
          product,
          paymentMethod,
        });
      })
      .catch((error) => {
        message.error('Please complete all required fields.');
      });
  };

  if (!product) {
    return <div>Loading...</div>; // Hiển thị loading khi dữ liệu chưa tải
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Thông tin sản phẩm */}
      <div className="checkout-product-details">
        <img src={product.imageUrls?.[0]} alt={product.name} className="product-image" />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="price">Price: ${product.price}</p>
        </div>
      </div>

      {/* Form nhập thông tin giao hàng */}
      <Form form={form} layout="vertical" className="shipping-info">
        <h3>Shipping Information</h3>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Shipping Address"
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input.TextArea placeholder="Enter your address" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
      </Form>

      {/* Phương thức thanh toán */}
      <div className="payment-method">
        <h3>Payment Method</h3>
        <Radio.Group
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Radio value="credit_card">Credit Card</Radio>
          <Radio value="paypal">PayPal</Radio>
          <Radio value="bank_transfer">Bank Transfer</Radio>
        </Radio.Group>
      </div>

      {/* Nút đặt hàng */}
      <div className="checkout-actions">
        <Button type="primary" size="large" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
