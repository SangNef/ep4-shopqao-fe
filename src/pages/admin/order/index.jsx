import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getOrders } from '../../../api/order';
import { useNavigate } from 'react-router-dom';

const statusText = {
    0: 'Pending',
    1: 'Confirmed',
    2: 'Shipping',
    3: 'Delivered',
    4: 'Completed',
    5: 'Canceled'
};

const statusColors = {
    0: '#ffc107',
    1: '#17a2b8',
    2: '#007bff',
    3: '#28a745',
    4: '#fd7e14',
    5: '#dc3545'
};

const Order = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

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
            dataIndex: 'user.fullname',
            key: 'user.fullname',
            render: (text, record) => <span>{record.user.fullname}</span>,
        },
        {
            title: 'Product',
            dataIndex: 'product.id',
            key: 'product.id',
            render: (text, record) => <span>{record.product.name}</span>,
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <span style={{ color: statusColors[text], fontWeight: 'bold' }}>
                    {statusText[text]}
                </span>
            ),
        },
    ];

    return (
        <div>
            <h1>Order List</h1>
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
