import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { acpCancelOrder, cancelOrder, getOrderById, updateOrder } from '../../../api/order';
import { Card, Col, Row, Button, Typography, Divider } from 'antd';
import { getProductById } from '../../../api/product';

const { Title, Text } = Typography;

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

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [productDetails, setProductDetails] = useState({});

    const fetchOrder = async () => {
        try {
            const response = await getOrderById(id);
            setOrder(response);
            fetchProducts(response.orderDetails.map(detail => detail.productVariant.id));
        } catch (error) {
            console.error('Failed to fetch order:', error);
        }
    };

    const fetchProducts = async (productVariants) => {
        try {
            const productsData = {};
            for (let variant of productVariants) {
                const productId = variant.productId;  // Lấy productId từ productVariant
                if (productId) {
                    const product = await getProductById(productId);  // Gọi API để lấy sản phẩm theo productId
                    productsData[productId] = product;  // Lưu thông tin sản phẩm theo productId
                }
            }
            setProductDetails(productsData);  // Lưu thông tin sản phẩm vào state
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const handleUpdateStatus = async () => {
        await updateOrder(id);
        fetchOrder();
    };

    const handleCancelOrder = async () => {
        await cancelOrder(id);
        fetchOrder();
    };

    const handleAcpCancelOrder = async () => {
        await acpCancelOrder(id);
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
                        {order.orderDetails?.map((detail, index) => (
                            <div key={index} style={{ marginBottom: '16px' }}>
                                <Text strong>Product Name:</Text> <Text>{detail.productVariant.productName}</Text><br />
                                <Text strong>Size:</Text> <Text>{detail.productVariant.size}</Text><br />
                                <Text strong>Color:</Text> <Text>{detail.productVariant.color}</Text><br />
                                <Text strong>Quantity:</Text> <Text>{detail.quantity}</Text><br />
                                <Text strong>Price:</Text> <Text>${detail.price}</Text><br />
                                <Divider />
                            </div>
                        ))}
                        <Text strong>Total Order Price:</Text> <Text>${order.price}</Text>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Shipping Information" style={{ border: 'none', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <Text strong>Name:</Text> <Text>{order.address?.user?.fullname}</Text><br />
                        <Text strong>Email:</Text> <Text>{order.address?.user?.email}</Text><br />
                        <Text strong>Phone:</Text> <Text>{order.phone}</Text><br />
                        <Text strong>Address:</Text> <Text>{order.address?.address}</Text><br />
                        <Text strong>Ward:</Text> <Text>{order.address?.ward?.name}</Text><br />
                        <Text strong>District:</Text> <Text>{order.address?.ward?.district?.name}</Text><br />
                        <Text strong>Province:</Text> <Text>{order.address?.ward?.district?.province?.name}</Text><br />
                        <Text strong>Payment Method:</Text> <Text>{order.payment}</Text><br />
                        <Text strong>Status:</Text>
                        <Text style={{ color: statusColors[order.status], marginLeft: '8px', fontWeight: 'bold' }}>
                            {statusText[order.status]}
                        </Text>
                        <br />
                        {order.status < 4 || order.status === 6 && (
                            <Button type="primary" onClick={handleUpdateStatus} style={{ marginTop: '12px' }}>
                                Update Status
                            </Button>
                        )}
                        {order.status === 0 && (
                            <Button danger onClick={handleCancelOrder} style={{ marginTop: '12px', marginLeft: '8px' }}>
                                Cancel Order
                            </Button>
                        )}
                        {order.status === 6 && (
                            <Button color="primary" variant="outlined" onClick={handleAcpCancelOrder} style={{ marginTop: '12px', marginLeft: '8px' }}>
                                Accept Cancel
                            </Button>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrderDetail;
