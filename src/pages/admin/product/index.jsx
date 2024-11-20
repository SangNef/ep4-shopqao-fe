import React, { useEffect, useState } from "react";
import { Table, Button, Breadcrumb, Typography, Modal, Input, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getProducts, createProduct, updateProduct, deleteProduct, deleteProductVariant } from "../../../api/product";
import Create from "./create";
import Update from "./update";
import CreateCategory from "./category"; // Assuming you have a CreateCategory modal
import EditVariant from "./editVariant";
import { getCategories } from "../../../api/category";

const { Title } = Typography;
const { Option } = Select;

const Product = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isCategoryCreateModalVisible, setIsCategoryCreateModalVisible] = useState(false); // For category modal
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null); // Store selected product ID for category modal
  const [selectedVariant, setSelectedVariant] = useState(null); // Store selected variant for edit
  const [isVariantEditModalVisible, setIsVariantEditModalVisible] = useState(false);

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [isVariantConfirmModalVisible, setIsVariantConfirmModalVisible] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState(null);
  const [searchParams, setSearchParams] = useState({ name: "", gender: "", category: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [categories, setCategories] = useState([]);

  const fetchProduct = async (page = 1) => {
    const response = await getProducts({ ...searchParams, page: page - 1, size: 10 });
    console.log(response);
    setProducts(response.content); // Set the products
    setTotalPages(response.totalPages); // Set the total pages
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProduct(currentPage);
    fetchCategories();
  }, [searchParams, currentPage]);

  useEffect(() => {
    document.title = "Products - Admin";
  }, []);

  const handleSearchChange = (key, value) => {
    setSearchParams((prev) => ({ ...prev, [key]: value })); // Cập nhật searchParams khi input thay đổi
  };

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

  const showConfirmDeleteModal = (product) => {
    setProductToDelete(product);
    setIsConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await handleDeleteProduct(productToDelete.id);
      setIsConfirmModalVisible(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteProduct = async (id) => {
    const response = await deleteProduct(id);
    console.log("Product deleted:", response);
    await fetchProduct();
  };

  const handleDeleteProductVariantConfirm = (variant) => {
    setVariantToDelete(variant);
    setIsVariantConfirmModalVisible(true);
  };

  const handleConfirmDeleteVariant = async () => {
    if (variantToDelete) {
      await handleDeleteProductVariant(variantToDelete.id);
      setIsVariantConfirmModalVisible(false);
      setVariantToDelete(null);
    }
  };

  const handleDeleteProductVariant = async (variantId) => {
    const response = await deleteProductVariant(variantId);
    console.log("Variant deleted:", response);
    await fetchProduct();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page when user navigates
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category?.name,
    },
    {
      title: "Stock", // New stock column
      key: "stock",
      render: (text, record) => {
        const totalStock = record.variants?.reduce((sum, variant) => sum + variant.qty, 0); // Sum up the quantity from all variants
        return totalStock || 0; // Display the total stock or 0 if no variants
      },
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
            onClick={() => showConfirmDeleteModal(record)}
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
          <>
            <Button type="link" icon={<EditOutlined />} onClick={() => handleVariantEdit(variantRecord)}>
              Edit
            </Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              style={{ color: "red" }}
              onClick={() => handleDeleteProductVariantConfirm(variantRecord)}
            >
              Delete
            </Button>
          </>
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
      <div style={{ display: "flex", gap: "10px" }}>
        <Input
          placeholder="Search by name"
          value={searchParams.name}
          onChange={(e) => handleSearchChange("name", e.target.value)}
          className="w-[200px]"
        />
        <Select
          placeholder="Select gender"
          value={searchParams.gender}
          onChange={(value) => handleSearchChange("gender", value)}
          allowClear
          className="w-[200px]"
        >
          <Option value="man">Man</Option>
          <Option value="women">Women</Option>
          <Option value="kid">Kid</Option>
          <Option value="unisex">Unisex</Option>
        </Select>
        <Select
          placeholder="Select category"
          value={searchParams.category}
          onChange={(value) => handleSearchChange("category", value)}
          allowClear
          className="w-[200px]"
        >
          {categories.map((category) => (
            <Option key={category.id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={products}
        pagination={{
          current: currentPage,
          total: totalPages * 10, // total items across all pages
          pageSize: 10,
          onChange: handlePageChange,
        }}
        rowKey="id"
        expandable={{ expandedRowRender }}
      />

      <Create
        isModalVisible={isCreateModalVisible}
        onCreate={handleCreate}
        onCancel={handleCreateCancel}
        categories={categories}
      />
      <Update
        isModalVisible={isUpdateModalVisible}
        onUpdate={handleUpdate}
        onCancel={handleUpdateCancel}
        product={selectedProduct}
        categories={categories}
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
      <Modal
        title="Confirm Delete"
        visible={isConfirmModalVisible}
        onOk={handleConfirmDelete}
        onCancel={() => setIsConfirmModalVisible(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
      <Modal
        title="Confirm Delete Variant"
        visible={isVariantConfirmModalVisible}
        onOk={handleConfirmDeleteVariant}
        onCancel={() => setIsVariantConfirmModalVisible(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this variant?</p>
      </Modal>
    </div>
  );
};

export default Product;
