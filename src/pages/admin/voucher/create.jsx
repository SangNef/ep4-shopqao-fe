import React from "react";
import { Form, Input, Button, Typography, DatePicker, message } from "antd";
import { createVoucher } from "../../../api/voucher";

const { Title } = Typography;

const CreateVoucher = ({ onClose, onVoucherCreated }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Convert expirationDate to a format compatible with the API
      const formattedValues = {
        ...values,
        expirationDate: values.expirationDate
          ? values.expirationDate.toISOString()
          : null,
      };

      await createVoucher(formattedValues);
      message.success("Voucher created successfully!");
      form.resetFields();
      onVoucherCreated(); // Refresh the vouchers list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to create voucher:", error);
      message.error("Failed to create voucher. Please try again.");
    }
  };

  return (
    <div>
      <Title level={4}>Create New Voucher</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Code"
          name="code"
          rules={[{ required: true, message: "Please input the voucher code!" }]}
        >
          <Input placeholder="Enter voucher code" />
        </Form.Item>
        <Form.Item
          label="Discount"
          name="discount"
          rules={[{ required: true, message: "Please input the discount amount!" }]}
        >
          <Input type="number" placeholder="Enter discount amount" />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="qty"
          rules={[{ required: true, message: "Please input the quantity!" }]}
        >
          <Input type="number" placeholder="Enter quantity" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          label="Expiration Date"
          name="expirationDate"
          rules={[{ required: true, message: "Please select an expiration date!" }]}
        >
          <DatePicker style={{ width: "100%" }} placeholder="Select expiration date" />
        </Form.Item>
        <Form.Item
          label="Max Discount"
          name="maxDiscount"
          rules={[{ required: true, message: "Please input the maximum discount!" }]}
        >
          <Input type="number" placeholder="Enter maximum discount" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Voucher
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateVoucher;
