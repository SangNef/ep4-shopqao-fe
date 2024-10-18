import React, { useEffect, useState } from "react";
import { Table, Button, Breadcrumb, Modal, Form, Input, InputNumber, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { getProducts, createProduct } from "../../api/product";

const Product = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [sizes, setSizes] = useState([]);
  const [colorInput, setColorInput] = useState('');
  const [colors, setColors] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    const response = await getProducts();
    console.log(response);
    setProducts(response);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSizes([]); // Clear sizes on cancel
    setColors([]); // Clear colors on cancel
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      console.log("New product:", { ...values, sizes, colors });

      const productData = {
        ...values,
        sizes,
        colors,
      };

      // Call the API to create a new product
      const response = await createProduct(productData);
      console.log("Product created:", response);

      await fetchProduct(); // Fetch products again to update the list
      setIsModalVisible(false);
      form.resetFields();
      setSizes([]);
      setColors([]);
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  const handleView = (id) => {
    console.log("View product with ID:", id);
    // Add logic for viewing product details
  };

  const handleEdit = (id) => {
    console.log("Edit product with ID:", id);
    // Add logic for editing product details
  };

  const handleDelete = (id) => {
    console.log("Delete product with ID:", id);
    // Add logic for deleting the product
  };

  const handleSizeChange = (selectedSizes) => {
    setSizes(selectedSizes);
  };

  const handleAddColor = () => {
    if (colorInput) {
      setColors((prevColors) => [...prevColors, colorInput]);
      setColorInput(''); // Clear the input after adding
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
      render: (status) => (
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            color: status ? "white" : "black",
            backgroundColor: status ? "green" : "red",
          }}
        >
          {status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.id)}>
            View
          </Button>
          |
          <Button type="link" style={{ color: "#FFA500" }} icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
          |
          <Button type="link" style={{ color: "red" }} icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
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
      <Table columns={columns} dataSource={products} pagination={true} loading={!products.length} />

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

          {/* Remove Images Section Temporarily */}
          {/* 
          <Form.Item label="Product Images">
            <Input type="file" multiple accept="image/*" onChange={handleAddImages} />
            <div style={{ display: 'flex', marginTop: '10px' }}>
              {images.map((img, index) => (
                <img key={index} src={img} alt={`Product Image ${index}`} style={{ width: '50px', marginRight: '5px', border: '1px solid #ddd', borderRadius: '4px' }} />
              ))}
            </div>
          </Form.Item>
          */}

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
