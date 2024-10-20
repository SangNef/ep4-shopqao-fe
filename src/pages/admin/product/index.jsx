import React, { useEffect, useState } from "react";
import { Table, Button, Breadcrumb } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { getProducts, createProduct } from "../../../api/product";
import Create from './create'; // Import the Create component

const Product = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    const response = await getProducts();
    console.log(response);
    setProducts(response);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreate = async (productData) => {
    const response = await createProduct(productData);
    console.log("Product created:", response);
    await fetchProduct(); // Fetch products again to update the list
    setIsModalVisible(false);
  };

  const handleView = (id) => {
    console.log("View product with ID:", id);
  };

  const handleEdit = (id) => {
    console.log("Edit product with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete product with ID:", id);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text}`,
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <img src={imageUrl} alt="Product" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
      ),
    },
    {
      title: "Sizes",
      dataIndex: "sizes",
      key: "sizes",
      render: (sizes) => sizes.join(", "),
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "colors",
      render: (colors) => colors.join(", "),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            color: status ? "white" : "black",
            backgroundColor: status ? "green" : "red",
          }}
        >
          {status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.id)}>
            View
          </Button>
          |
          <Button type="link" style={{ color: "#FFA500" }} icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
          |
          <Button type="link" style={{ color: "red" }} icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Product List</h1>
      <Button type="primary" style={{ marginBottom: "20px" }} onClick={showModal}>
        Create
      </Button>
      <Table columns={columns} dataSource={products} pagination={true} loading={!products.length} rowKey="id" />
      
      <Create 
        isModalVisible={isModalVisible} 
        onCreate={handleCreate} 
        onCancel={handleCancel} 
      />
    </div>
  );
};

export default Product;
