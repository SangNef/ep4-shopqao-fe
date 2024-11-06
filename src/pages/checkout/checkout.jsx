import React, { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { getAddress } from "../../api/address";
import { createOrder } from "../../api/order";
import { Button, Typography, Modal, List, message, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { searchVoucher } from "../../api/voucher";

const { Title } = Typography;

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDetails, setVoucherDetails] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);

  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  const cart = JSON.parse(localStorage.getItem("cart"));
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchAddresses = async () => {
    try {
      const response = await getAddress(userInfo.id);
      setAddresses(response);
      if (response.length > 0) {
        setSelectedAddress(response[0]);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      if (selectedProduct) {
        const response = await getProductById(selectedProduct.productId);
        setProducts([response]);
      } else if (cart && cart.length > 0) {
        const productPromises = cart.map((item) => getProductById(item.productId));
        const productResponses = await Promise.all(productPromises);
        setProducts(productResponses);
      }
      setDiscountedPrice(products.length > 0 ? products[0].price : 0);
    } catch (error) {
      console.error("Failed to fetch products:", error);
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

        const discountAmount = (response.discount / 100) * products[0].price;
        const newPrice = products[0].price - discountAmount;
        setDiscountedPrice(newPrice);
      } else {
        message.error("Voucher not found or invalid.");
        setVoucherDetails(null);
        setDiscountedPrice(products[0].price);
      }
    } catch (error) {
      console.error("Failed to search voucher:", error);
      message.error("Failed to search voucher.");
    }
  };

  const handleSubmitOrder = async () => {
    if (!selectedAddress) {
      message.error("Please select a shipping address.");
      return;
    }
  
    // Construct orderDetails using cart items, or fallback to selectedProduct if cart is empty
    const orderDetails = (cart && cart.length > 0 ? cart : [selectedProduct]).map((item) => ({
      productVariant: { id: item.variantId }, // Use variantId from item (either from cart or selectedProduct)
      quantity: item.quantity, // Use quantity from item (either from cart or selectedProduct)
      price: discountedPrice, // Use discounted price
    }));
  
    const orderPayload = {
      status: 1,
      payment: paymentMethod,
      phone: selectedAddress.phone,
      address: { id: selectedAddress.id },
      orderDetails: orderDetails,
      voucher: voucherDetails ? { id: voucherDetails.id } : null,
    };
  
    try {
      await createOrder(orderPayload);
      localStorage.removeItem("selectedProduct");
      localStorage.removeItem("cart");
      message.success("Order created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to create order:", error);
      message.error("Failed to create order.");
    }
  };  

  const totalAmount = products.reduce((sum, product) => {
    const productAmount = product.price * 1; // Modify for actual quantity if needed
    return sum + productAmount;
  }, 0);

  const discountAmount = voucherDetails ? (voucherDetails.discount / 100) * totalAmount : 0;
  const finalTotalAmount = totalAmount - discountAmount;

  return (
    <div className="checkout-container max-w-[1280px] mx-auto p-4">
      <Title level={1}>Checkout</Title>
      <div className="flex gap-8">
        <div className="w-full">
          {addresses.length > 0 ? (
            <div className="mb-4 border border-gray-300 rounded p-4">
              <Title level={2}>Shipping Information</Title>
              <p>
                <strong>Address:</strong> {selectedAddress?.address}
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
          {selectedProduct ? (
            <div className="product-detail h-max border border-gray-300 rounded p-4 mb-4 flex">
              <img src={products[0].imageUrls?.[0]} alt={products[0].name} className="w-28 h-28 object-cover" />
              <div className="product-info">
                <Title level={2} className="!mb-1">
                  {products[0].name}
                </Title>
                <p className="text-lg font-bold">${products[0].price}</p>
                <p className="text-sm">
                  <strong>Size:</strong> {selectedProduct.size} - <strong>Color:</strong> {selectedProduct.color} -{" "}
                  <strong>QTY:</strong> {selectedProduct.quantity}
                </p>
              </div>
            </div>
          ) : (
            cart.map((item, index) => {
              const product = products.find((p) => p.id === item.productId); // Tìm sản phẩm từ products đã fetch
              return (
                product && (
                  <div className="product-detail h-max border border-gray-300 rounded p-4 mb-4 flex" key={index}>
                    <img src={product.imageUrls?.[0]} alt={product.name} className="w-28 h-28 object-cover" />
                    <div className="product-info">
                      <Title level={2} className="!mb-1">
                        {product.name}
                      </Title>
                      <p className="text-lg font-bold">${product.price}</p>
                      <p className="text-sm">
                        <strong>Size:</strong> {item.size} - <strong>Color:</strong> {item.color} -{" "}
                        <strong>QTY:</strong> {item.quantity}
                      </p>
                    </div>
                  </div>
                )
              );
            })
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
              <List.Item.Meta title={address.address} description={address.phone} />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default Checkout;
