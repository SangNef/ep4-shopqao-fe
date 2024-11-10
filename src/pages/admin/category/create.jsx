import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, message, Select } from "antd"; // Import Select component
import { createProductVariant } from "../../../api/category";
import { getProducts } from "../../../api/product";

const Create = ({ onClose, fetchCategories }) => {
  const [form] = Form.useForm();  // Form instance for Ant Design form
  const [loading, setLoading] = useState(false); // To control the loading state of the button
  const [products, setProducts] = useState([]); // To store the list of products

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Call API to create a new product variant
      const response = await createProductVariant(values);
      if (response) {
        message.success("Product variant created successfully!");
        fetchCategories(); // Refresh the list of product variants
        onClose(); // Close the modal
      } else {
        message.error("Failed to create product variant.");
      }
    } catch (error) {
      message.error("Error creating product variant.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    // Call the API to get the list of products
    const response = await getProducts();
    setProducts(response);
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      {/* Size Select Input */}
      <Form.Item
        label="Select Product"
        name="productId"
        rules={[{ required: true, message: "Please select a product!" }]}
      >
        <Select placeholder="Select a product">
          {products.map((product) => (
            <Select.Option key={product.id} value={product.id}>
              {product.name} - {product.price.toLocaleString()} VND
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Size"
        name="size"
        rules={[{ required: true, message: "Please select the size!" }]}
      >
        <Select placeholder="Select size">
          <Select.Option value="S">S</Select.Option>
          <Select.Option value="M">M</Select.Option>
          <Select.Option value="L">L</Select.Option>
          <Select.Option value="XL">XL</Select.Option>
          <Select.Option value="XXL">XXL</Select.Option>
        </Select>
      </Form.Item>

      {/* Color Input */}
      <Form.Item
        label="Color"
        name="color"
        rules={[{ required: true, message: "Please input the color!" }]}
      >
        <Input />
      </Form.Item>

      {/* Quantity Input */}
      <Form.Item
        label="Quantity"
        name="qty"
        rules={[{ required: true, message: "Please input the quantity!" }]}
      >
        <InputNumber min={1} className="w-full" />
      </Form.Item>

      {/* Product Select Input */}
      
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Create;
