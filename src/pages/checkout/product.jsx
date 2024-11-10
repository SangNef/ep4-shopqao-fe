import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getProductById } from "../../api/product";
import { getAddress } from "../../api/address";
import { Button, Input, List, message, Modal, Typography } from "antd";
import { searchVoucher } from "../../api/voucher";
import { createOrder } from "../../api/order";

const { Title } = Typography;

const CheckoutProduct = () => {
  const [product, setProduct] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDetails, setVoucherDetails] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const variantId = searchParams.get("variantId");
  const quantity = searchParams.get("quantity");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await getAddress(user.id);
      setAddresses(response);
      if (response.length > 0) {
        setSelectedAddress(response[0]);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchAddresses();
  }, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsModalVisible(false);
  };

  const handleSearchVoucher = async () => {
    if (!voucherCode) {
      message.error("Please enter a voucher code.");
      return;
    }

    try {
      const response = await searchVoucher(voucherCode);
      if (response) {
        setVoucherDetails(response);
        message.success("Voucher applied successfully!");

        const discountAmount = (response.discount / 100) * product.price;
        const newPrice = product.price - discountAmount;
        setDiscountedPrice(newPrice);
      } else {
        message.error("Voucher not found or invalid.");
        setVoucherDetails(null);
        setDiscountedPrice(product.price);
      }
    } catch (error) {
      console.error("Failed to search voucher:", error);
      message.error("Failed to search voucher.");
    }
  };

  const discountAmount = voucherDetails ? (voucherDetails.discount / 100) * (product.price) : 0;
  const finalTotalAmount = product.price - discountAmount;

  const handleSubmitOrder = async () => {
    const orderDetail = {
      productVariant: { id: parseInt(variantId) },
      quantity: parseInt(quantity),
      price: discountedPrice,
    };

    const orderPayload = {
      status: 1,
      payment: paymentMethod,
      phone: selectedAddress.phone,
      address: { id: selectedAddress.id },
      orderDetails: [orderDetail],
      voucher: voucherDetails ? { id: voucherDetails.id } : null,
    }

    try {
      await createOrder(orderPayload);
      message.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Failed to create order:", error);
      message.error("Failed to create order.");
    }
  }

  return (
    <div className="checkout-container max-w-[1280px] mx-auto p-4">
      <Title level={1}>Checkout</Title>
      <div className="flex gap-8">
        <div className="w-full">
          {addresses.length > 0 ? (
            <div className="mb-4 border border-gray-300 rounded p-4">
              <Title level={2}>Shipping Information</Title>
              <p>
                <strong>Address:</strong> {selectedAddress?.address} - {selectedAddress?.ward?.name} -{" "}
                {selectedAddress?.ward?.district?.name} - {selectedAddress?.ward?.district?.province?.name}
              </p>
              <p>
                <strong>Phone:</strong> {selectedAddress?.phone}
              </p>
              <Button type="primary" onClick={handleOpenModal}>
                Change
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-4">
              <p>No address available.</p>
              <Button type="primary" onClick={handleOpenModal}>
                Add Address
              </Button>
            </div>
          )}

          <div className="w-full border border-gray-300 rounded p-4 mb-4">
            <Title level={2}>Payment Information</Title>
            <div className="flex items-center gap-4 mb-2">
              <input
                type="radio"
                id="cash"
                name="payment"
                value="CASH"
                checked={paymentMethod === "CASH"}
                onChange={() => setPaymentMethod("CASH")}
                className="mr-2"
              />
              <label htmlFor="cash">Cash on Delivery</label>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <input
                type="radio"
                id="paypal"
                name="payment"
                value="PAY"
                checked={paymentMethod === "PAY"}
                onChange={() => setPaymentMethod("PAY")}
                className="mr-2"
              />
              <label htmlFor="paypal">Paypal</label>
            </div>
          </div>
          <Button type="primary" onClick={handleSubmitOrder}>
            Submit Order
          </Button>
        </div>

        <div className="w-[500px]">
          {product && (
            <div className="product-detail h-max border border-gray-300 rounded p-4 mb-4 flex">
              <img src={product.imageUrls?.[0]} alt={product.name} className="w-28 h-28 object-cover" />
              <div className="product-info">
                <Title level={2} className="!mb-1">
                  {product.name}
                </Title>
                <p className="text-lg font-bold">${product.price}</p>
                <p className="text-sm">
                  <strong>Size:</strong> {product.variants?.find(variant => variant.id === parseInt(variantId))?.size} -{" "}
                  <strong>Color:</strong> {product.variants?.find(variant => variant.id === parseInt(variantId))?.color} -{" "}
                  <strong>QTY:</strong> {quantity}
                </p>
              </div>
            </div>
          )}
          <div className="border border-gray-300 rounded p-4 mb-4">
            <Title level={3}>Voucher</Title>
            <Input
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              placeholder="Enter voucher code"
              className="mb-2"
            />
            <Button type="primary" onClick={handleSearchVoucher}>
              Apply Voucher
            </Button>
            {voucherDetails && (
              <div className="voucher-details mt-2">
                <p>Voucher Applied: {voucherDetails.code}</p>
                <p>Discount: {voucherDetails.discount}%</p>
              </div>
            )}
          </div>
          <div className="flex justify-between mb-4">
            <p>Total:</p>
            <p>${finalTotalAmount}</p>
          </div>
        </div>
      </div>
      <Modal title="Select Address" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <List
          itemLayout="horizontal"
          dataSource={addresses}
          renderItem={(address) => (
            <List.Item onClick={() => handleAddressSelect(address)}>
              <List.Item.Meta
                title={`${address.address} - ${address.ward?.name} - ${address.ward?.district?.name} - ${address.ward?.district?.province?.name}`}
                description={address.phone}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default CheckoutProduct;
