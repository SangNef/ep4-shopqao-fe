import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { updateCategory } from "../../../api/category";

const Edit = ({ isVisible, onClose, category, onCategoryUpdated }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate the form with the selected category's data
  React.useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
      });
    }
  }, [category, form]);

  const handleUpdate = async (values) => {
    setIsSubmitting(true);
    try {
      await updateCategory(category.id, values); // Call the updateCategory API with ID and new values
      message.success("Category updated successfully!");
      onCategoryUpdated(); // Refresh category list
      onClose(); // Close modal
    } catch (error) {
      console.error("Failed to update category:", error);
      message.error("Failed to update category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Edit Category"
      visible={isVisible}
      onCancel={onClose}
      footer={null} // Custom footer handled by the form
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
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
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default Edit;
