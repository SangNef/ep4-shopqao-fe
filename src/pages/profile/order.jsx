import React, { useEffect, useState } from "react";
import { Button, Table } from "antd"; // Import the Table component from Ant Design
import { cancelOrder, getOrdersByUser, returnOrder, updateOrder } from "../../api/order";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [showBanner, setShowBanner] = useState(false); // State to manage banner visibility
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const fetchOrders = async () => {
    const response = await getOrdersByUser(user.id);
    setOrders(response);
  };

  useEffect(() => {
    fetchOrders();

    document.title = "XShop - User Orders";

    // Check if the URL has the success=true parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setShowBanner(true); // Show the banner if success=true is present
    }
  }, []);

  const handleCancelOrder = async (orderId) => {
    // Call the cancelOrder API function
    await cancelOrder(orderId);
    fetchOrders();
  };

  const handleUpdateOrder = async (orderId) => {
    // Call the updateOrder API function to update the order status to Delivered
    await updateOrder(orderId);
    fetchOrders();
  };

  const handleReturnOrder = async (orderId) => {
    // Call the returnOrder API function to request a return for the order
    await returnOrder(orderId);
    fetchOrders();
  }

  // Define the columns for the Ant Design table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>${text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        switch (status) {
          case 1:
            return "Pending";
          case 2:
            return "Confirmed";
          case 3:
            return "Shipping";
          case 4:
            return "Delivered";
          case 5:
            return "Completed";
          case 6:
            return "Pending Cancel";
          case 7:
            return "Cancelled";
          case 8:
            return "Return Requested";
          case 9:
            return "Returned";
          default:
            return "Unknown";
        }
      },
    },
    {
      title: "Payment Method",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Order Details",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => (
        <ul>
          {orderDetails.map((detail, index) => (
            <li key={index}>
              {detail.quantity} x {detail.product.name} - ${detail.price}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          {record.status === 1 && (
            <Button onClick={() => handleCancelOrder(record.id)} color="danger" variant="solid">
              Cancel
            </Button>
          )}
          {(record.status === 5 || record.status === 4) && (
            <Button color="primary" variant="outlined" onClick={() => handleReturnOrder(record.id)}>
              Return
            </Button>
          )}
          {record.status === 3 && (
            <Button color="primary" variant="outlined" onClick={() => handleUpdateOrder(record.id)}>
              Received
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="max-w-full mx-auto">
      {showBanner && (
        <div className="bg-green-500 text-white text-center p-4 mb-4">
          Thanks for your order! Your order is being processed.
        </div>
      )}
      <div className="max-w-7xl mx-auto my-8">
        <h2 className="text-2xl font-semibold">User Orders</h2>
        <Table
          columns={columns}
          dataSource={orders} // Set the orders as the data source for the table
          rowKey="id" // Ensure each row has a unique key
        />
      </div>
    </div>
  );
};

export default UserOrder;
