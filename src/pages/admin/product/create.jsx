import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Checkbox, Button } from "antd";
import axios from 'axios';

const Create = ({ isModalVisible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [sizes, setSizes] = useState([]);
  const [colorInput, setColorInput] = useState('');
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState(null); // State to hold the image file
  const [imageUrl, setImageUrl] = useState(''); // State to hold the uploaded image URL

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const productData = {
        ...values,
        sizes,
        colors,
        imageUrl, // Add the image URL to the product data
      };
      onCreate(productData); // Gọi hàm tạo sản phẩm với dữ liệu
      form.resetFields();
      setSizes([]); // Reset kích thước
      setColors([]); // Reset màu sắc
      setImage(null); // Reset hình ảnh
      setImageUrl(''); // Reset URL hình ảnh
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  const handleSizeChange = (selectedSizes) => {
    setSizes(selectedSizes); // Cập nhật kích thước đã chọn
  };

  const handleAddColor = () => {
    if (colorInput) {
      setColors((prevColors) => [...prevColors, colorInput]); // Thêm màu vào danh sách
      setColorInput(''); // Xóa input sau khi thêm
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Lưu trữ file hình ảnh
      const url = await uploadImage(file); // Tải hình ảnh lên và lấy URL
      setImageUrl(url); // Đặt URL hình ảnh đã tải lên
    }
  };

  // Function to upload image to Cloudinary
  const uploadImage = async (file) => {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dx2o9ki2g/image/upload";
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_uploads'); // Sử dụng tên preset mới đã tạo
  
    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url; // Return the secure URL from the response
    } catch (error) {
      console.error("Error uploading image:", error);
      return ''; // Trả về chuỗi rỗng nếu có lỗi
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

        <Form.Item label="Product Image">
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {imageUrl && (
            <div style={{ marginTop: 10 }}>
              <img src={imageUrl} alt="Product" style={{ width: '100px', marginTop: '10px' }} />
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Create;
