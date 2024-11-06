// CreateAddress.jsx
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { addAddress } from "../../api/address"; // Adjust the import based on your API structure
import { getProvinces, getDistricts, getWards } from "../../api/order"; // Ensure this API has the correct structure

const { Option } = Select;

const CreateAddress = ({ visible, onClose, userId, onAddressAdded }) => {
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  
  // State to manage selected values
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null); // State for selected ward

  const fetchProvinces = async () => {
    const response = await getProvinces();
    setProvinces(response);
  };

  const fetchDistricts = async (provinceId) => {
    const response = await getDistricts(provinceId);
    setDistricts(response);
  };

  const fetchWards = async (districtId) => {
    const response = await getWards(districtId);
    setWards(response);
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict(null); // Reset district and ward when province changes
    setWards([]); // Reset wards as well
    fetchDistricts(value); // Fetch districts based on selected province
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedWard(null); // Reset ward when district changes
    fetchWards(value); // Fetch wards based on selected district
  };

  const handleWardChange = (value) => {
    setSelectedWard(value); // Update selected ward
  };

  const handleSubmit = async (values) => {
    try {
      await addAddress({
        ward: { id: selectedWard }, // Include selected ward ID
        user: { id: userId }, // Include user ID
        phone: values.phone, // Include phone number from form
        address: values.address, // Include address from form
      });
      form.resetFields();
      setSelectedProvince(null); // Reset selection
      setSelectedDistrict(null);
      setSelectedWard(null);
      onAddressAdded(); // Fetch addresses again to update the list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  return (
    <Modal title="Add New Address" visible={visible} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please input your address!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Please input your phone number!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="province"
          label="Province"
          rules={[{ required: true, message: "Please select your province!" }]}
        >
          <Select onChange={handleProvinceChange} placeholder="Select Province">
            {provinces.map((province) => (
              <Option key={province.id} value={province.id}>
                {province.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="district"
          label="District"
          rules={[{ required: true, message: "Please select your district!" }]}
        >
          <Select
            onChange={handleDistrictChange}
            placeholder="Select District"
            disabled={!selectedProvince}
          >
            {districts.map((district) => (
              <Option key={district.id} value={district.id}>
                {district.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="ward"
          label="Ward"
          rules={[{ required: true, message: "Please select your ward!" }]}
        >
          <Select onChange={handleWardChange} placeholder="Select Ward" disabled={!selectedDistrict}>
            {wards.map((ward) => (
              <Option key={ward.id} value={ward.id}>
                {ward.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Address
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAddress;
