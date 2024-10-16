import React, { useState } from "react";
import { Table, Button, Breadcrumb, Modal, Form, Input, InputNumber, Checkbox, Select } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const { Option } = Select;

const data = [
  {
    key: "1",
    name: "Product 1",
    description: "Description for Product 1",
    price: 100,
    qty: 10,
    status: true,
    images: [{ id: 1, image_url: "image1.jpg" }],
    sizes: [
      { id: 1, size: 38 },
      { id: 2, size: 40 },
    ],
    colors: [
      { id: 1, color: "Red" },
      { id: 2, color: "Blue" },
    ],
  },
  {
    key: "2",
    name: "Product 2",
    description: "Description for Product 2",
    price: 200,
    qty: 5,
    status: false,
    images: [{ id: 2, image_url: "image2.jpg" }],
    sizes: [
      { id: 3, size: 42 },
      { id: 4, size: 44 },
    ],
    colors: [
      { id: 3, color: "Green" },
      { id: 4, color: "Yellow" },
    ],
  },
];

const Product = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colorInput, setColorInput] = useState('');
  const [colors, setColors] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // reset form when modal is closed
  };

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("New product:", values);
        // Thêm sản phẩm mới vào danh sách hoặc gọi API ở đây
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleView = (key) => {
    const product = data.find(item => item.key === key);
    console.log('View product:', product);
    // Hiển thị chi tiết sản phẩm ở đây (có thể là một modal khác hoặc một trang khác)
  };

  const handleEdit = (key) => {
    const product = data.find(item => item.key === key);
    console.log('Edit product:', product);
    // Hiển thị modal với thông tin sản phẩm để chỉnh sửa
    // Bạn có thể thiết lập dữ liệu vào form ở đây
    setIsModalVisible(true);
    form.setFieldsValue(product);
  };

  const handleDelete = (key) => {
    console.log('Delete product with key:', key);
    // Thực hiện xóa sản phẩm ở đây
  };

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
    
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = null; // Clear input after adding
  };

  const handleSizeChange = (checkedValues) => {
    setSizes(checkedValues);
  };

  const handleAddColor = () => {
    if (colorInput) {
      setColors([...colors, colorInput]);
      setColorInput('');
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text}`,
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.key)}>
            View
          </Button>
          |
          <Button type="link" style={{ color: "#FFA500" }} icon={<EditOutlined />} onClick={() => handleEdit(record.key)}>
            Edit
          </Button>
          |
          <Button type="link" style={{ color: "red" }} icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Product List</h1>
      <Button type="primary" style={{ marginBottom: "20px" }} onClick={showModal}>
        Create
      </Button>
      <Table columns={columns} dataSource={data} pagination={true} />

      <Modal
        title="Create New Product"
        visible={isModalVisible}
        onOk={handleCreate}
        onCancel={handleCancel}
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

          {/* Images Section */}
          <Form.Item label="Product Images">
            <Input type="file" multiple accept="image/*" onChange={handleAddImages} />
            <div style={{ display: 'flex', marginTop: '10px' }}>
              {images.map((img, index) => (
                <img key={index} src={img} alt={`Product Image ${index}`} style={{ width: '50px', marginRight: '5px' }} />
              ))}
            </div>
          </Form.Item>

          {/* Sizes Section */}
          <Form.Item label="Product Sizes">
            <Checkbox.Group onChange={handleSizeChange}>
              <Checkbox value="S">S</Checkbox>
              <Checkbox value="M">M</Checkbox>
              <Checkbox value="L">L</Checkbox>
              <Checkbox value="XL">XL</Checkbox>
              <Checkbox value="XXL">XXL</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          {/* Colors Section */}
          <Form.Item label="Product Colors">
            <Input
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Add color"
            />
            <Button onClick={handleAddColor}>+</Button>
            <div>
              {colors.map((color, index) => (
                <div key={index}>{color}</div>
              ))}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
