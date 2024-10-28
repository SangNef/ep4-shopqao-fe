import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cancelOrder, getOrderById, updateOrder } from '../../../api/order';
import { Card, Col, Row, Button, Typography } from 'antd';

const { Title, Text } = Typography;

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

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});

    const fetchOrder = async () => {
        try {
            const response = await getOrderById(id);
            setOrder(response);
        } catch (error) {
            console.error('Failed to fetch order:', error);
        }
    };

    const handleUpdateStatus = async () => {
        await updateOrder(id);
        fetchOrder();
    };

    const handleCancelOrder = async () => {
        await cancelOrder(id);
        fetchOrder();
    }

    useEffect(() => {
        fetchOrder();
    }, [id]);

    if (!order.id) return <div>Loading...</div>;

    return (
        <div style={{ margin: '24px', padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <Title level={1}>Order Detail</Title>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Product Information" style={{ border: 'none', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <Text strong>Name:</Text> <Text>{order.product.name}</Text><br /><br />
                        <Text strong>Price:</Text> <Text>{order.product.price.toLocaleString()} VND</Text><br /><br />
                        <Text strong>Quantity:</Text> <Text>{order.qty}</Text><br /><br />
                        <Text strong>Total Price:</Text> <Text>{order.price.toLocaleString()} VND</Text>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                            {order.product.imageUrls.map((image, index) => (
                                <img key={index} src={image} alt="Product" style={{ width: '96px', height: '96px', borderRadius: '4px' }} />
                            ))}
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Shipping Information" style={{ border: 'none', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <Text strong>Name:</Text> <Text>{order.user.fullname}</Text><br /><br />
                        <Text strong>Email:</Text> <Text>{order.user.email}</Text><br /><br />
                        <Text strong>Phone:</Text> <Text>{order.phone}</Text><br /><br />
                        <Text strong>Address:</Text> <Text>{order.address}</Text><br /><br />
                        <Text strong>Ward:</Text> <Text>{order.ward.name}</Text><br /><br />
                        <Text strong>District:</Text> <Text>{order.ward.district.name}</Text><br /><br />
                        <Text strong>Province:</Text> <Text>{order.ward.district.province.name}</Text><br /><br />
                        <Text strong>Payment Method:</Text> <Text>{order.payment}</Text><br /><br />
                        <Text strong>Status:</Text>
                        <Text style={{ color: statusColors[order.status], marginLeft: '8px', fontWeight: 'bold' }}>
                            {statusText[order.status]}
                        </Text>
                        <br />
                        {/* Uncomment buttons if needed */}
                        {order.status < 4 && (
                            <Button type="primary" onClick={handleUpdateStatus} style={{ marginTop: '12px' }}>
                                Update Status
                            </Button>
                        )}
                        {order.status === 0 && (
                            <Button color="danger" variant="outlined" danger onClick={handleCancelOrder} style={{ marginTop: '12px', marginLeft: '8px' }}>
                                Cancel Order
                            </Button>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrderDetail;
