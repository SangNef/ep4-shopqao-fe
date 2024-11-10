// src/components/product/update.js
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Checkbox, Button, Select } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons'; // Import the Close icon
import axios from 'axios';
import { updateProduct } from '../../../api/product'; // Import the updateProduct API function

const { Option } = Select;

const Update = ({ isModalVisible, onUpdate, onCancel, product }) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]); // Handle multiple images
  const [imageUrls, setImageUrls] = useState([]); // Store URLs for uploaded images

  useEffect(() => {
    if (product) {
      // Populate the form with the selected product's data
      form.setFieldsValue({
        name: product.name,
        price: product.price,
        description: product.description,
        gender: product.gender,
        status: product.status,
      });
      setImageUrls(product.imageUrls || []);
    }
  }, [product, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const productData = {
        ...values,
        imageUrls, // Use the array of image URLs
      };
      await updateProduct(product.id, productData); // Call the update API
      onUpdate(); // Call the onUpdate function to refresh the product list
      form.resetFields();
      setImages([]);
      setImageUrls([]);
    } catch (info) {
      console.log("Validate Failed:", info);
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
      title="Update Product"
      visible={isModalVisible}
      onOk={handleUpdate}
      onCancel={onCancel}
      okText="Update"
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

        <Form.Item label="Product Images">
          <Input type="file" accept="image/*" multiple onChange={handleImageChange} /> {/* Allow multiple uploads */}
          <div style={{ marginTop: '10px' }} className='flex gap-4'>
            {imageUrls.map((url, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: 10 }} className='relative'>
                <img src={url} alt={`Product ${index}`} style={{ width: '100px', marginRight: '10px' }} />
                <CloseCircleOutlined onClick={() => removeImage(index)} style={{ cursor: 'pointer', color: 'red' }} className='absolute right-3 top-3' />
              </div>
            ))}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Update;
