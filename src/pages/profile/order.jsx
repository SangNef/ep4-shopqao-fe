import React, { useEffect, useState } from 'react';
import { Table } from 'antd'; // Import the Table component from Ant Design
import { getOrdersByUser } from '../../api/order';

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const fetchOrders = async () => {
    const response = await getOrdersByUser(user.id);
    setOrders(response);
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>${text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        switch (status) {
          case 1:
            return 'Pending';
          case 2:
            return 'Confirmed';
          case 3:
            return 'Shipping';
          case 4:
            return 'Delivered';
          case 5:
            return 'Completed';
          case 6:
            return 'Canceled';
        }
      },
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: 'Order Details',
      dataIndex: 'orderDetails',
      key: 'orderDetails',
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
  ];

  return (
    <div className='max-w-7xl mx-auto my-8'>
      <h2 className='text-2xl font-semibold'>User Orders</h2>
      <Table
        columns={columns}
        dataSource={orders} // Set the orders as the data source for the table
        rowKey="id" // Ensure each row has a unique key
      />
    </div>
  );
};

export default UserOrder;
