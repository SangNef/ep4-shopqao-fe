import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { updateProductVariant } from "../../../api/category";

const EditVariant = ({ isModalVisible, onCancel, onUpdate, variant }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (variant) {
      form.setFieldsValue({
        size: variant.size,
        color: variant.color,
        qty: variant.qty,
      });
    }
  }, [variant, form]);

  const handleFinish = async (values) => {
    const payload = {
      size: values.size,
      color: values.color,
      qty: values.qty,
    };

    const response = await updateProductVariant(variant.id, payload);

    if (response) {
      message.success("Product variant updated successfully!");
      onUpdate();
      onCancel();
    } else {
      message.error("Failed to update product variant.");
    }
  };

  return (
    <Modal
      title="Edit Variant"
      visible={isModalVisible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            form.resetFields();
            onCancel();
          }}
        >
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Update
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Size" name="size" rules={[{ required: true, message: "Please enter the size" }]}>
          <Input placeholder="Enter size" />
        </Form.Item>

        <Form.Item label="Color" name="color" rules={[{ required: true, message: "Please enter the color" }]}>
          <Input placeholder="Enter color" />
        </Form.Item>

        <Form.Item label="Quantity" name="qty" rules={[{ required: true, message: "Please enter the quantity" }]}>
          <Input type="number" placeholder="Enter quantity" min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditVariant;
