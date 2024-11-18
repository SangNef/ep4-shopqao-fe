import React, { useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import { createProductVariant } from "../../../api/variant";

const CreateCategory = ({ isModalVisible, onCreate, onCancel, productId }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = form.getFieldsValue(); // Get form data
    const payload = {
      size: values.size,
      color: values.color,
      qty: values.qty,
      productId: productId, // Use the passed productId to link the variant
    };

    const response = await createProductVariant(payload);

    if (response) {
      message.success("Product variant created successfully!");
      onCreate(); // Ensure onCreate is called correctly here
      onCancel(); // Close the modal
    } else {
      message.error("Failed to create product variant.");
    }
  };

  return (
    <Modal title="Create Category" visible={isModalVisible} onOk={handleOk} onCancel={onCancel}>
      <Form form={form} layout="vertical" name="create_category_form">
        <Form.Item name="size" label="Size" rules={[{ required: true, message: "Please select the size!" }]}>
          <Select placeholder="Select size">
            <Select.Option value="S">S</Select.Option>
            <Select.Option value="M">M</Select.Option>
            <Select.Option value="L">L</Select.Option>
            <Select.Option value="XL">XL</Select.Option>
            <Select.Option value="XXL">XXL</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="color" label="Color" rules={[{ required: true, message: "Please input the color!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="qty" label="Quantity" rules={[{ required: true, message: "Please input the quantity!" }]}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCategory;
