import React, { useEffect, useState } from "react";
import { Table, Button, Breadcrumb, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getProducts, createProduct, updateProduct } from "../../../api/product";
import Create from "./create";
import Update from "./update";
import CreateCategory from "./category"; // Assuming you have a CreateCategory modal
import EditVariant from "./editVariant";

const { Title } = Typography;

const Product = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isCategoryCreateModalVisible, setIsCategoryCreateModalVisible] = useState(false); // For category modal
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null); // Store selected product ID for category modal
  const [selectedVariant, setSelectedVariant] = useState(null); // Store selected variant for edit
  const [isVariantEditModalVisible, setIsVariantEditModalVisible] = useState(false);

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

  const handleCategoryCreate = () => {
    // Logic to refresh categories or handle any updates after creation
    fetchProduct(); // Example of refreshing the product list
  };

  const handleVariantEdit = (variant) => {
    setSelectedVariant(variant);
    setIsVariantEditModalVisible(true);
  };

  const handleVariantEditCancel = () => {
    setIsVariantEditModalVisible(false);
    setSelectedVariant(null);
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "imageUrls",
      key: "imageUrls",
      render: (imageUrls) =>
        imageUrls?.length > 0 ? (
          <img src={imageUrls[0]} alt="Product" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="link" style={{ color: "#FFA500" }} icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="link"
            style={{ color: "red" }}
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  // Hàm để render bảng mở rộng cho variants của sản phẩm
  const expandedRowRender = (record) => {
    const variantColumns = [
      { title: "STT", render: (text, record, index) => index + 1, key: "index" },
      { title: "Size", dataIndex: "size", key: "size" },
      { title: "Color", dataIndex: "color", key: "color" },
      { title: "Quantity", dataIndex: "qty", key: "qty" },
      {
        title: "Actions",
        key: "actions",
        render: (text, variantRecord) => (
          <Button type="link" icon={<EditOutlined />} onClick={() => handleVariantEdit(variantRecord)}>
            Edit
          </Button>
        ),
      },
    ];

    return (
      <div>
        <div style={{ marginBottom: "16px" }}>
          <Button
            type="primary"
            onClick={() => {
              setSelectedProductId(record.id); // Set the product ID to pass to the modal
              setIsCategoryCreateModalVisible(true); // Show category create modal
            }}
          >
            Create Category
          </Button>
        </div>
        <Table columns={variantColumns} dataSource={record.variants} pagination={false} rowKey="id" />
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>
      <div className="w-full flex justify-between">
        <Title level={2}>Product List</Title>
        <Button type="primary" style={{ marginBottom: "20px" }} onClick={showCreateModal}>
          Create
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={products}
        pagination={true}
        loading={!products.length}
        rowKey="id"
        expandable={{ expandedRowRender }}
      />

      <Create isModalVisible={isCreateModalVisible} onCreate={handleCreate} onCancel={handleCreateCancel} />
      <Update
        isModalVisible={isUpdateModalVisible}
        onUpdate={handleUpdate}
        onCancel={handleUpdateCancel}
        product={selectedProduct}
      />
      <CreateCategory
        isModalVisible={isCategoryCreateModalVisible}
        onCreate={handleCategoryCreate}
        onCancel={() => setIsCategoryCreateModalVisible(false)} // Close category modal
        productId={selectedProductId} // Pass the selected product ID to the category modal
      />
      <EditVariant
        isModalVisible={isVariantEditModalVisible}
        onUpdate={() => fetchProduct()} // Refresh the products after editing a variant
        onCancel={handleVariantEditCancel}
        variant={selectedVariant}
      />
    </div>
  );
};

export default Product;
