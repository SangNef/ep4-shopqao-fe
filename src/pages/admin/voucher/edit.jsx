import React, { useState, useEffect } from "react";
import { Form, Input, Button, InputNumber, DatePicker, message } from "antd";
import { updateVoucher } from "../../../api/voucher";
import dayjs from "dayjs";

const EditVoucher = ({ voucher, onClose, onVoucherUpdated }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Populate the form with the existing voucher data, including formatting expirationDate
    const formattedVoucher = {
      ...voucher,
      expirationDate: voucher.expirationDate ? dayjs(voucher.expirationDate) : null,
    };
    form.setFieldsValue(formattedVoucher);
  }, [voucher, form]);

  const handleSubmit = async (values) => {
    try {
      // Format expirationDate for API
      const formattedValues = {
        ...values,
        expirationDate: values.expirationDate
          ? values.expirationDate.toISOString()
          : null,
      };

      // Call the update API to save the changes
      await updateVoucher(voucher.id, formattedValues);
      message.success("Voucher updated successfully!");
      onVoucherUpdated(); // Fetch updated voucher list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to update voucher:", error);
      message.error("Failed to update voucher. Please try again.");
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label="Code"
        name="code"
        rules={[{ required: true, message: "Please enter the voucher code" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Discount (%)"
        name="discount"
        rules={[{ required: true, message: "Please enter the discount amount" }]}
      >
        <InputNumber min={0} className="w-full" />
      </Form.Item>
      <Form.Item
        label="Quantity"
        name="qty"
        rules={[{ required: true, message: "Please enter the voucher quantity" }]}
      >
        <InputNumber min={0} className="w-full" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label="Expiration Date"
        name="expirationDate"
        rules={[{ required: true, message: "Please select the expiration date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Max Discount"
        name="maxDiscount"
        rules={[{ required: true, message: "Please enter the maximum discount" }]}
      >
        <InputNumber min={0} className="w-full" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Update Voucher
      </Button>
    </Form>
  );
};

export default EditVoucher;
