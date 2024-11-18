import React, { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../../../api/category";
import { Breadcrumb, Button, message, Modal, Table, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Create from "./create";
import Edit from "./edit";

const { Title } = Typography;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setSelectedCategory(null);
    setIsEditModalVisible(false);
  };

  const showConfirmDeleteModal = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.id); // Call your API to delete the category
      setIsDeleteModalVisible(false);
      fetchCategories(); // Refresh category list
      message.success("Category deleted successfully!");
    } catch (error) {
      console.error("Failed to delete category:", error);
      message.error("Failed to delete category. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setCategoryToDelete(null);
    setIsDeleteModalVisible(false);
  };

  const columns = [
    {
      title: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "50%",
    },
    {
      title: "Action",
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
  return (
    <div className="p-5">
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Categories</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-between w-full">
        <Title level={2}>Categories List</Title>
        <Button type="primary" onClick={showCreateModal}>
          Create Category
        </Button>
      </div>
      <Table dataSource={categories} columns={columns} rowKey="id" pagination={false} />
      <Create isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} onCreate={fetchCategories} />
      <Edit
        isVisible={isEditModalVisible}
        onClose={closeEditModal}
        category={selectedCategory}
        onCategoryUpdated={fetchCategories}
      />
      <Modal
        title="Confirm Deletion"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={closeDeleteModal}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete the category "{categoryToDelete?.name}"?</p>
      </Modal>
    </div>
  );
};

export default Category;
