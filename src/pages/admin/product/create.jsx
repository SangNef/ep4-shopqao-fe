import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Checkbox, Button, Select } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons'; // Import the Close icon
import axios from 'axios';

const { Option } = Select;

const Create = ({ isModalVisible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [sizes, setSizes] = useState([]);
  const [colorInput, setColorInput] = useState('');
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]); // Handle multiple images
  const [imageUrls, setImageUrls] = useState([]); // Store URLs for uploaded images

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const productData = {
        ...values,
        sizes,
        colors,
        imageUrls, // Use the array of image URLs
      };
      onCreate(productData);
      form.resetFields();
      setSizes([]);
      setColors([]);
      setImages([]);
      setImageUrls([]);
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  const handleSizeChange = (selectedSizes) => {
    setSizes(selectedSizes);
  };

  const handleAddColor = () => {
    if (colorInput) {
      setColors((prevColors) => [...prevColors, colorInput]);
      setColorInput('');
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files); // Get all selected files
    const newImages = [];

    for (const file of files) {
      const url = await uploadImage(file);
      newImages.push(url); // Push each uploaded URL to the array
    }

    setImages((prevImages) => [...prevImages, ...files]); // Update images state
    setImageUrls((prevUrls) => [...prevUrls, ...newImages]); // Update image URLs state
  };

  const uploadImage = async (file) => {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dx2o9ki2g/image/upload";
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_uploads');

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url; // Return the secure URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return '';
    }
  };

  const removeImage = (index) => {
    setImageUrls((prevUrls) => prevUrls.filter((_, idx) => idx !== index)); // Remove the image URL
    setImages((prevImages) => prevImages.filter((_, idx) => idx !== index)); // Remove the corresponding image file
  };

  return (
    <Modal
      title="Create New Product"
      visible={isModalVisible}
      onOk={handleCreate}
      onCancel={onCancel}
      okText="Create"
      cancelText="Cancel"
      style={{ overflowY: 'auto', maxHeight: '80vh' }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="Enter product price" />
        </Form.Item>

        <Form.Item
          name="qty"
          label="Quantity"
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="Enter product quantity" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the product description!' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select a gender!' }]}>
          <Select placeholder="Select gender">
            <Option value="man">Man</Option>
            <Option value="women">Women</Option>
            <Option value="unisex">Unisex</Option>
            <Option value="kid">Kid</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          valuePropName="checked"
        >
          <Checkbox>Active</Checkbox>
        </Form.Item>

        <Form.Item label="Product Sizes">
          <Checkbox.Group onChange={handleSizeChange}>
            <Checkbox value="S">S</Checkbox>
            <Checkbox value="M">M</Checkbox>
            <Checkbox value="L">L</Checkbox>
            <Checkbox value="XL">XL</Checkbox>
            <Checkbox value="XXL">XXL</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="Product Colors">
          <Input
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            placeholder="Add color"
          />
          <Button onClick={handleAddColor} type="primary">+</Button>
          <div style={{ marginTop: '8px' }}>
            {colors.map((color, index) => (
              <div key={index}>{color}</div>
            ))}
          </div>
        </Form.Item>

        <Form.Item label="Product Images">
          <Input type="file" accept="image/*" multiple onChange={handleImageChange} /> {/* Allow multiple uploads */}
          <div style={{ marginTop: '10px' }}>
            {imageUrls.map((url, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <img src={url} alt={`Product ${index}`} style={{ width: '100px', marginRight: '10px' }} />
                <CloseCircleOutlined onClick={() => removeImage(index)} style={{ cursor: 'pointer', color: 'red' }} />
              </div>
            ))}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Create;
