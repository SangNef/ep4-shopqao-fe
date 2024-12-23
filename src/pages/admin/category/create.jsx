import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { createCategory } from "../../../api/category";

const Create = ({ isVisible, onClose, onCreate }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (values) => {
    setIsSubmitting(true);
    try {
      await createCategory(values); // API call to create the category
      message.success("Category created successfully!");
      onCreate(); // Refresh the category list
      form.resetFields(); // Reset the form
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to create category:", error);
      message.error("Failed to create category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Create Category"
      visible={isVisible}
      onCancel={onClose}
      footer={null} // Custom footer with buttons inside the form
    >
      <Form form={form} layout="vertical" onFinish={handleCreate}>
        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            { required: true, message: "Please enter a category name" },
            { max: 50, message: "Category name cannot exceed 50 characters" },
          ]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
        <div className="flex justify-end">
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default Create;
