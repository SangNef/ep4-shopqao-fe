import React, { useState, useEffect } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { updateVoucher } from "../../../api/voucher";

const EditVoucher = ({ voucher, onClose, onVoucherUpdated }) => {
  console.log(voucher);
  const [form] = Form.useForm();
  const [updatedVoucher, setUpdatedVoucher] = useState(voucher);

  useEffect(() => {
    setUpdatedVoucher(voucher); // Set the voucher data when the modal is opened
    form.setFieldsValue(voucher); // Populate the form with the existing voucher data
  }, [voucher]);

  const handleSubmit = async (values) => {
    try {
      // Call the update API to save the changes
      await updateVoucher(voucher.id, values);
      onVoucherUpdated(); // Fetch updated voucher list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to update voucher:", error);
    }
  };

  return (
    <Form form={form} initialValues={updatedVoucher} onFinish={handleSubmit} layout="vertical">
      <Form.Item label="Code" name="code" rules={[{ required: true, message: "Please enter the voucher code" }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Discount (%)"
        name="discount"
        rules={[{ required: true, message: "Please enter the discount amount" }]}
      >
        <InputNumber min={0} className="w-full" />
      </Form.Item>
      <Form.Item label="Quantity" name="qty" rules={[{ required: true, message: "Please enter the voucher quantity" }]}>
        <InputNumber min={0} className="w-full" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Update Voucher
      </Button>
    </Form>
  );
};

export default EditVoucher;
