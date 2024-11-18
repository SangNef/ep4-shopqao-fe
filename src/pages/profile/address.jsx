import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { getAddress } from "../../api/address";
import CreateAddress from "./create";

const ShippingAddress = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [address, setAddress] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchAddress = async () => {
    try {
      const response = await getAddress(user.id);
      setAddress(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddAddressClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAddressAdded = () => {
    fetchAddress(); // Refresh the address list
    handleModalClose(); // Close the modal
  };

  useEffect(() => {
    fetchAddress();

    document.title = "XShop - Shipping Address";
  }, []);

  // Define columns for Ant Design Table
  const columns = [
    {
      title: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      key: "address",
      render: (text, record) => (
        <span>
          {record.address}, {record.ward.name}, {record.ward.district.name}, {record.ward.district.province.name}
        </span>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-6">
      <div className="w-full flex justify-between mb-4">
        <h3 className="text-4xl font-semibold">Shipping Address</h3>
        <Button type="primary" onClick={handleAddAddressClick}>
          Add New Address
        </Button>
      </div>
      <Table dataSource={address} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
      <CreateAddress
        visible={isModalVisible}
        onClose={handleModalClose}
        userId={user.id}
        onAddressAdded={handleAddressAdded}
      />
    </div>
  );
};

export default ShippingAddress;
