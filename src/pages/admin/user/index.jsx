import { Breadcrumb, Typography, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../api/auth';

const { Title } = Typography;

const Customer = () => {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await getUsers();
            setCustomers(response);
        } catch (error) {
            console.error("Failed to fetch customers:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Define columns for the table
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Fullname',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => status ? 'Active' : 'Inactive',
        },
    ];

    return (
        <div className='p-5'>
            <Breadcrumb style={{ marginBottom: "20px" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Customers</Breadcrumb.Item>
            </Breadcrumb>
            <Title level={2}>Customers List</Title>
            
            <Table 
                dataSource={customers} 
                columns={columns} 
                rowKey="id"  // Use the "id" field as the unique key for each row
            />
        </div>
    );
};

export default Customer;
