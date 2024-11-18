import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getProductById } from "../../api/product";
import { getAddress } from "../../api/address";
import { Button, Input, List, message, Modal, Typography } from "antd";
import { searchVoucher } from "../../api/voucher";
import { createOrder } from "../../api/order";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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

  const [paypalLoaded, setPaypalLoaded] = useState(false);

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
    document.title = "XShop - Checkout";
  }, []);

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

  const discountAmount = voucherDetails ? (voucherDetails.discount / 100) * (product.price * quantity) : 0;
  const finalTotalAmount = product.price * quantity - discountAmount;

  const handlePayPalSuccess = async (details) => {
    console.log("Payment completed successfully:", details);
    handleSubmitOrder(); // Call order creation after successful payment
  };

  const handleSubmitOrder = async () => {
    const orderDetail = {
      productVariant: { id: parseInt(variantId) },
      quantity: parseInt(quantity),
      price: product.price * quantity,
    };

    const orderPayload = {
      status: 1,
      payment: paymentMethod,
      phone: selectedAddress.phone,
      address: { id: selectedAddress.id },
      orderDetails: [orderDetail],
      voucher: voucherDetails ? { id: voucherDetails.id } : null,
      price: finalTotalAmount,
    };

    try {
      await createOrder(orderPayload);
      message.success("Order placed successfully!");
      navigate("/orders?success=true");
    } catch (error) {
      console.error("Failed to create order:", error);
      message.error("Failed to create order.");
    }
  };

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
          {paymentMethod === "CASH" && (
            <Button type="primary" onClick={handleSubmitOrder} style={{ marginTop: "20px" }}>
              Place Order
            </Button>
          )}
          {paymentMethod == "PAY" && (
            <PayPalScriptProvider
              options={{
                "client-id": "AbJhiq9DxgLJ3tSTj5A643WM8ipUDGNZCZgrdXyOAr7AbfrKC9WMUfnZKiOZPR5ZLuGVtd_2iGo6zuS8",
                "components": "buttons",
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
                  <strong>Size:</strong> {product.variants?.find((variant) => variant.id === parseInt(variantId))?.size}{" "}
                  - <strong>Color:</strong>{" "}
                  {product.variants?.find((variant) => variant.id === parseInt(variantId))?.color} -{" "}
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
          </div>

          <div className="border border-gray-300 rounded p-4">
            <Title level={2}>Order Summary</Title>
            <p className="text-lg font-bold">Subtotal: ${product.price * quantity}</p>
            {voucherDetails && (
              <p className="text-sm text-green-600">
                Discount: {voucherDetails.discount}% off = -${discountAmount.toFixed(2)}
              </p>
            )}
            <p className="text-lg font-bold">Total: ${finalTotalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <Modal title="Select Address" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <List
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
