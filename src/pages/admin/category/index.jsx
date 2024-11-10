import React, { useEffect, useState } from "react";
import { Table, Breadcrumb, Button, Modal } from "antd";
import { getCategories } from "../../../api/category";
import Create from "./create"; // Import Create component

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // To control modal visibility

  // Fetch categories from API
  const fetchCategories = async () => {
    const response = await getCategories(); // This should return the product variant data
    console.log(response);
    setCategories(response);
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  // Columns for the product variant table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: ["product", "name"], // Access nested product data
      key: "productName",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
    },
  ];

  // Open the Create Product Variant modal
  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-5">
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>
      <div className="w-full flex justify-between">
        <h1>Product Variant List</h1>

        {/* Create Button */}
        <Button type="primary" onClick={showCreateModal} style={{ marginBottom: "20px" }}>
          Create Product Variant
        </Button>
      </div>

      {/* Product Table */}
      <Table
        columns={columns}
        dataSource={categories} // Data comes from the categories state
        rowKey="id" // Ensure each row is uniquely identified
        pagination={false}
      />

      {/* Modal for Creating Product Variant */}
      <Modal title="Create Product Variant" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Create onClose={handleCancel} fetchCategories={fetchCategories} />
      </Modal>
    </div>
  );
};

export default Category;
