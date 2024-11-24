import React, { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { getAddress } from "../../api/address";
import { createOrder } from "../../api/order";
import { Button, Typography, Modal, List, message, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { searchVoucher } from "../../api/voucher";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import CreateAddress from "../profile/create";

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
  const [isCreateAddressModalVisible, setIsCreateAddressModalVisible] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  const cart = JSON.parse(localStorage.getItem("cart"));
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleOpenCreateAddressModal = () => {
    setIsCreateAddressModalVisible(true);
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      await fetchAddresses();
    };
    fetchData();

    document.title = "XShop - Checkout";
  }, []);

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
      if (cart && cart.length > 0) {
        const productPromises = cart.map((item) => getProductById(item.productId));
        const productResponses = await Promise.all(productPromises);
        setProducts(productResponses);
      }
      setDiscountedPrice(products.length > 0 ? products[0].price : 0);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const loadPaypalScript = () => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AbJhiq9DxgLJ3tSTj5A643WM8ipUDGNZCZgrdXyOAr7AbfrKC9WMUfnZKiOZPR5ZLuGVtd_2iGo6zuS8"; // Use your actual client ID here
    script.async = true;
    script.onload = () => setPaypalLoaded(true);
    script.onerror = () => console.error("Failed to load PayPal script");
    document.body.appendChild(script);
  };
  useEffect(() => {
    loadPaypalScript();

    // Clean up script if the component unmounts
    return () => {
      const script = document.querySelector(
        'script[src="https://www.paypal.com/sdk/js?client-id=AbJhiq9DxgLJ3tSTj5A643WM8ipUDGNZCZgrdXyOAr7AbfrKC9WMUfnZKiOZPR5ZLuGVtd_2iGo6zuS8"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []); // Ensure that this is run only once when the component mounts

  if (!paypalLoaded) {
    return <div>Loading PayPal...</div>; // This is fine as conditional rendering, but don't use hooks conditionally.
  }

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsModalVisible(false);
  };

  const handleAddressAdded = () => {
    fetchAddresses();
    setIsCreateAddressModalVisible(false);
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

        const discountValue = (response.discount / 100) * products[0].price;
        const discountAmount = Math.min(discountValue, response.maxDiscount);
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

  const handlePayPalSuccess = async (details) => {
    console.log("Payment completed successfully:", details);
    handleSubmitOrder(); // Call order creation after successful payment
  };

  const handleSubmitOrder = async () => {
    if (!selectedAddress) {
      message.error("Please select a shipping address.");
      return;
    }

    // Construct orderDetails using cart items, or fallback to selectedProduct if cart is empty
    const orderDetails = (cart && cart.length > 0 && cart).map((item) => {
      // Find the product corresponding to the item in the cart
      const product = products.find((product) => product.id === item.productId);

      // Calculate the price based on the product price and quantity
      const itemPrice = product ? product.price * item.quantity : 0;

      return {
        productVariant: { id: item.variantId }, // Variant ID
        quantity: item.quantity, // Quantity
        price: itemPrice, // Price based on the product price and quantity
      };
    });

    const orderPayload = {
      status: 1,
      payment: paymentMethod,
      phone: selectedAddress.phone,
      address: { id: selectedAddress.id },
      orderDetails: orderDetails,
      voucher: voucherDetails ? { id: voucherDetails.id } : null,
      price: finalTotalAmount,
    };

    try {
      const response = await createOrder(orderPayload);
      localStorage.removeItem("selectedProduct");
      localStorage.removeItem("cart");
      message.success("Order created successfully!");
      navigate(`/thank-for-order/${response.id}`);
    } catch (error) {
      console.error("Failed to create order:", error);
      message.error("Failed to create order.");
    }
  };

  const totalAmount = cart.reduce((sum, item) => {
    const product = products.find((product) => product.id === item.productId);
    if (product) {
      return sum + product.price * item.quantity;
    }
    return sum;
  }, 0);

  const discountValue = voucherDetails ? (voucherDetails.discount / 100) * totalAmount : 0;
  const discountAmount = Math.min(discountValue, voucherDetails?.maxDiscount);
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
              <Button type="primary" onClick={handleOpenCreateAddressModal}>
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
          {paymentMethod === "PAY" && (
            <PayPalScriptProvider
              deferLoading={false}
              options={{
                "client-id": "AbJhiq9DxgLJ3tSTj5A643WM8ipUDGNZCZgrdXyOAr7AbfrKC9WMUfnZKiOZPR5ZLuGVtd_2iGo6zuS8",
                components: "buttons",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: finalTotalAmount.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(handlePayPalSuccess);
                }}
                onError={(err) => {
                  console.error(err);
                  message.error("Payment failed.");
                }}
              />
            </PayPalScriptProvider>
          )}
          {paymentMethod === "CASH" && (
            <Button type="primary" onClick={handleSubmitOrder} style={{ marginTop: "20px" }}>
              Place Order
            </Button>
          )}
        </div>

        <div className="w-[500px]">
          {cart.map((item, index) => {
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
                      <strong>Size:</strong> {item.size} - <strong>Color:</strong> {item.color} - <strong>QTY:</strong>{" "}
                      {item.quantity}
                    </p>
                  </div>
                </div>
              )
            );
          })}
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
                <p>Discount: {voucherDetails.discount}% (max {voucherDetails.maxDiscount})</p>
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
      <CreateAddress
        visible={isCreateAddressModalVisible}
        onClose={() => setIsCreateAddressModalVisible(false)}
        userId={userInfo.id}
        onAddressAdded={handleAddressAdded}
      />
    </div>
  );
};

export default Checkout;
