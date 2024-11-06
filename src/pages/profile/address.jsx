import React, { useEffect, useState } from "react";
import { getAddress, addAddress } from "../../api/address"; // Make sure to adjust your imports
import { Button, List, Typography } from "antd";
import CreateAddress from "./create"; // Import the CreateAddress component

const { Title } = Typography;

const ShippingAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const fetchAddresses = async () => {
    try {
      const response = await getAddress(userInfo.id);
      setAddresses(response);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddNewAddress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddressAdded = () => {
    fetchAddresses(); // Refresh the addresses list after adding a new address
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Title level={2} className="text-3xl font-bold">
          Shipping Addresses
        </Title>
        <Button type="primary" onClick={handleAddNewAddress}>
          + Add new
        </Button>
      </div>
      {addresses.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={addresses}
          renderItem={(address) => (
            <List.Item className="border rounded-lg shadow-lg mb-4 !p-4">
              <List.Item.Meta
                title={<span className="text-2xl font-bold">{address.address}</span>}
                description={
                  <>
                    <div className="text-lg">
                      <strong>Address:</strong> {address.ward.name} - {address.ward.district.name} -{" "}
                      {address.ward.district.province.name}
                    </div>
                    <div className="text-lg">
                      <strong>Phone:</strong> {address.phone}
                    </div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <p>No addresses found.</p>
      )}
      <CreateAddress
        visible={isModalVisible}
        onClose={handleCloseModal}
        userId={userInfo.id} // Pass the user ID to the modal
        onAddressAdded={handleAddressAdded} // Callback to refresh addresses
      />
    </div>
  );
};

export default ShippingAddress;
