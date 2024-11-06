import React, { useEffect, useState } from "react";
import { Table, Button, Breadcrumb } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getProducts, createProduct, updateProduct } from "../../../api/product"; 
import Create from './create'; 
import Update from './update'; 

const Product = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProduct = async () => {
    const response = await getProducts();
    console.log(response);
    setProducts(response);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
  };

  const handleCreate = async (productData) => {
    const response = await createProduct(productData);
    console.log("Product created:", response);
    await fetchProduct();
    setIsCreateModalVisible(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
    setSelectedProduct(null);
  };

  const handleUpdate = async (productData) => {
    const response = await updateProduct(selectedProduct.id, productData);
    console.log("Product updated:", response);
    await fetchProduct();
    setIsUpdateModalVisible(false);
    setSelectedProduct(null);
  };

  const handleDelete = (id) => {
    console.log("Delete product with ID:", id);
    // Implement the delete functionality here
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
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "variants",
      key: "quantity",
      render: (variants) => variants.reduce((acc, variant) => acc + variant.qty, 0), // Total quantity from variants
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "imageUrls",
      key: "imageUrls",
      render: (imageUrls) => (
        imageUrls?.length > 0 ? (
          <img src={imageUrls[0]} alt="Product" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
        ) : (
          <span>No Image</span>
        )
      ),
    },
    {
      title: "Sizes",
      dataIndex: "variants",
      key: "sizes",
      render: (variants) => variants.map(v => v.size).join(", "), // Collect sizes from variants
    },
    {
      title: "Colors",
      dataIndex: "variants",
      key: "colors",
      render: (variants) => variants.map(v => v.color).join(", "), // Collect colors from variants
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
          <Button type="link" style={{ color: "#FFA500" }} icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
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
      <Button type="primary" style={{ marginBottom: "20px" }} onClick={showCreateModal}>
        Create
      </Button>
      <Table columns={columns} dataSource={products} pagination={true} loading={!products.length} rowKey="id" />
      
      <Create 
        isModalVisible={isCreateModalVisible} 
        onCreate={handleCreate} 
        onCancel={handleCreateCancel} 
      />
      <Update 
        isModalVisible={isUpdateModalVisible} 
        onUpdate={handleUpdate} 
        onCancel={handleUpdateCancel} 
        product={selectedProduct} 
      />
    </div>
  );
};

export default Product;
