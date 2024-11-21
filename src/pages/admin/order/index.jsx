import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Typography, Select } from "antd";
import { getOrders } from "../../../api/order";
import { useNavigate } from "react-router-dom";

const statusText = {
  1: "Pending",
  2: "Confirmed",
  3: "Shipping",
  4: "Delivered",
  5: "Completed",
  6: "Pending Cancel",
  7: "Cancelled",
};

const statusColors = {
  1: "#ffc107",
  2: "#17a2b8",
  3: "#007bff",
  4: "#28a745",
  5: "#fd7e14",
  6: "#6c757d",
  7: "#dc3545",
};

const { Title } = Typography;

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const navigate = useNavigate();

  // Fetch orders based on selected status
  const fetchOrders = async (status = null) => {
    try {
      const response = await getOrders(status); // Pass selected status to the API
      setOrders(response);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch all orders initially
    document.title = "XShop - Orders";
  }, []);

  // Handle status change
  const handleStatusChange = (value) => {
    setSelectedStatus(value); // Set selected status
    fetchOrders(value); // Fetch orders based on selected status
  };

  // Define the columns for the Ant Design table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User",
      dataIndex: "user.fullname",
      key: "user.fullname",
      render: (text, record) => <span>{record.user.fullname}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text}`,
    },
    {
      title: "Payment Method",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <span style={{ color: statusColors[text], fontWeight: "bold" }}>{statusText[text]}</span>,
    },
  ];

  return (
    <div className="p-5">
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>
      <Title level={2}>Order List</Title>

      {/* Add the Select dropdown for filtering orders by status */}
      <Select
        defaultValue={selectedStatus}
        style={{ width: 200, marginBottom: 20 }}
        onChange={handleStatusChange}
        allowClear
        placeholder="Filter by status"
      >
        <Select.Option value={1}>Pending</Select.Option>
        <Select.Option value={2}>Confirmed</Select.Option>
        <Select.Option value={3}>Shipping</Select.Option>
        <Select.Option value={4}>Delivered</Select.Option>
        <Select.Option value={5}>Completed</Select.Option>
        <Select.Option value={6}>Pending Cancel</Select.Option>
        <Select.Option value={7}>Cancelled</Select.Option>
      </Select>

      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id" // Assuming each order has a unique ID
        onRow={(record) => ({
          onClick: () => {
            navigate(`/admin/order/${record.id}`); // Navigate to the Order Detail page
          },
        })}
      />
    </div>
  );
};

export default Order;
