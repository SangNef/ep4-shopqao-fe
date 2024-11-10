import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Checkbox, Button, Select, Table } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const Create = ({ isModalVisible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // Image upload handler
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    for (const file of files) {
      const url = await uploadImage(file);
      newImages.push(url);
    }

    setImages((prevImages) => [...prevImages, ...files]);
    setImageUrls((prevUrls) => [...prevUrls, ...newImages]);
  };

  // Upload image function
  const uploadImage = async (file) => {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dx2o9ki2g/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_uploads");

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  // Remove image function
  const removeImage = (index) => {
    setImageUrls((prevUrls) => prevUrls.filter((_, idx) => idx !== index));
    setImages((prevImages) => prevImages.filter((_, idx) => idx !== index));
  };

  // Final form submission
  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const productData = {
        ...values,
        imageUrls, // Include uploaded image URLs
      };
      onCreate(productData);
      form.resetFields();
      setImages([]);
      setImageUrls([]);
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };


  return (
    <Modal
      title="Create New Product"
      visible={isModalVisible}
      onOk={handleCreate}
      onCancel={onCancel}
      okText="Create"
      cancelText="Cancel"
      width={800}
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please input the product name!" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please input the price!" }]}>
          <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter product price" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter description" />
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please select the gender!" }]}>
          <Select placeholder="Select gender">
            <Option value="man">Man</Option>
            <Option value="women">Woman</Option>
            <Option value="kid">Kid</Option>
            <Option value="unisex">Unisex</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Product Images">
          <Input type="file" accept="image/*" multiple onChange={handleImageChange} />
          <div style={{ display: "flex", marginTop: "10px", gap: "10px", overflowX: "auto" }}>
            {imageUrls.map((url, index) => (
              <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                  src={url}
                  alt={`Product ${index}`}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <CloseCircleOutlined
                  onClick={() => removeImage(index)}
                  style={{ cursor: "pointer", color: "red", marginTop: "5px" }}
                />
              </div>
            ))}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Create;
