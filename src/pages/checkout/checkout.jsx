import React, { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { createOrder, getProvinces, getDistricts, getWards } from "../../api/order"; // Import the necessary API functions
import { Radio, Input, Button, Form, Typography, Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const Checkout = () => {
  const [product, setProduct] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]); // State for districts
  const [wards, setWards] = useState([]); // State for wards
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Fetch the product information based on the product ID stored in local storage
  const fetchProduct = async () => {
    try {
      const response = await getProductById(selectedProduct.productId);
      setProduct(response);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await getProvinces();
      setProvinces(response);
    } catch (error) {
      console.error("Failed to fetch provinces:", error);
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await getDistricts(provinceId);
      setDistricts(response);
    } catch (error) {
      console.error("Failed to fetch districts:", error);
    }
  };

  const fetchWards = async (districtId) => {
    try {
      const response = await getWards(districtId);
      setWards(response);
    } catch (error) {
      console.error("Failed to fetch wards:", error);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
    }
  }, [selectedProduct]);
  
  useEffect(() => {
    fetchProduct();
    fetchProvinces();
  }, []);

  // Handle payment method change
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const orderData = {
      user: { id: userInfo.id },
      product: { id: selectedProduct.productId },
      size: selectedProduct.size,
      color: selectedProduct.color,
      qty: selectedProduct.quantity,
      price: product.price * selectedProduct.quantity,
      payment: paymentMethod === "cash" ? "CASH" : "PAY",
      phone: values.phone,
      address: values.address,
      ward: { id: shippingInfo.ward },
    };

    console.log("Order Data:", orderData);

    try {
      const response = await createOrder(orderData);
      console.log("Order created successfully:", response);
      navigate("/"); // Redirect to home page after successful order
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <div className="checkout-container">
      <Title level={1}>Checkout</Title>
      <div className="product-detail">
        <img src={product.imageUrls?.[0]} alt={product.name} />
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
          <Input name="name" value={userInfo ? userInfo.fullname : ""} disabled />
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
        <Form.Item label="Province" name="province" required>
          <Select
            onChange={(value) => {
              setShippingInfo({ ...shippingInfo, province: value });
              fetchDistricts(value); // Fetch districts when province changes
            }}
          >
            {provinces.map((province) => (
              <Option key={province.id} value={province.id}>
                {province.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="District" name="district" required>
          <Select
            onChange={(value) => {
              setShippingInfo({ ...shippingInfo, district: value });
              fetchWards(value); // Fetch wards when district changes
            }}
          >
            {districts.map((district) => (
              <Option key={district.id} value={district.id}>
                {district.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Ward" name="ward" required>
          <Select onChange={(value) => setShippingInfo({ ...shippingInfo, ward: value })}>
            {wards.map((ward) => (
              <Option key={ward.id} value={ward.id}>
                {ward.name}
              </Option>
            ))}
          </Select>
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
