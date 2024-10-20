import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getOrders } from '../../../api/order';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Define the columns for the Ant Design table
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User',
      dataIndex: 'user.fullname', // assuming each order has a user object with an id property
      key: 'user.fullname',
      render: (text, record) => <span>{record.user.fullname}</span>,
    },
    {
      title: 'Product',
      dataIndex: 'product.id', // assuming each order has a product object with an id property
      key: 'product.id',
      render: (text, record) => <span>{record.product.name}</span>,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div>
      <h1>Order List</h1>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id" // Assuming each order has a unique ID
      />
    </div>
  );
};

export default Order;
