import React, { useEffect, useState } from "react";
import { Table, Typography, Button, Modal, Breadcrumb } from "antd";
import { getVouchers } from "../../../api/voucher";
import CreateVoucher from "./create"; // Import the CreateVoucher component
import EditVoucher from "./edit"; // Import the EditVoucher component

const { Title } = Typography;

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage the modal visibility
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State for Edit Modal
  const [selectedVoucher, setSelectedVoucher] = useState(null); // State to store the selected voucher

  const fetchVouchers = async () => {
    try {
      const response = await getVouchers();
      console.log(response);
      setVouchers(response);
    } catch (error) {
      console.error("Failed to fetch vouchers:", error);
    }
  };

  useEffect(() => {
    fetchVouchers();

    document.title = "XShop - Vouchers";
  }, []);

  const handleCreateButtonClick = () => {
    setIsModalVisible(true); // Show the modal when the button is clicked
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Hide the modal
  };

  const handleEdit = (voucher) => {
    setSelectedVoucher(voucher); // Set the selected voucher for editing
    setIsEditModalVisible(true); // Open the Edit Modal
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false); // Hide the Edit Modal
    setSelectedVoucher(null); // Clear the selected voucher
  };

  // Define the columns for the Ant Design table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (text) => `${text}%`,
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="p-5">
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Vouchers</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-between">
        <Title level={2}>Voucher List</Title>
        <Button type="primary" onClick={handleCreateButtonClick}>
          Create Voucher
        </Button>
      </div>

      <Table
        dataSource={vouchers}
        columns={columns}
        rowKey="id" // Assuming each voucher has a unique ID
        pagination={false}
      />

      {/* Create Voucher Modal */}
      <Modal
        title="Create Voucher"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null} // We'll add the footer buttons in the CreateVoucher component
      >
        <CreateVoucher onClose={handleModalClose} onVoucherCreated={fetchVouchers} />
      </Modal>

      {/* Edit Voucher Modal */}
      <Modal
        title="Edit Voucher"
        visible={isEditModalVisible}
        onCancel={handleEditModalClose}
        footer={null} // We'll add the footer buttons in the EditVoucher component
      >
        {selectedVoucher && (
          <EditVoucher
            voucher={selectedVoucher}
            onClose={handleEditModalClose}
            onVoucherUpdated={fetchVouchers} // Function to re-fetch the vouchers after updating
          />
        )}
      </Modal>
    </div>
  );
};

export default Voucher;
