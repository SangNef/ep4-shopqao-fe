import React, { useEffect, useState } from "react";
import { Table, Typography, Button, Modal } from "antd";
import { getVouchers } from "../../../api/voucher";
import CreateVoucher from "./create"; // Import the CreateVoucher component

const { Title } = Typography;

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage the modal visibility

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
  }, []);

  const handleCreateButtonClick = () => {
    setIsModalVisible(true); // Show the modal when the button is clicked
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Hide the modal
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
      render: (text) => <span style={{ color: text ? "#28a745" : "#dc3545" }}>{text ? "Active" : "Inactive"}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record.id)}>
          Edit
        </Button>
      ),
    },
  ];

  const handleEdit = (id) => {
    // Implement the logic to handle editing the voucher
    console.log("Edit voucher with ID:", id);
  };

  return (
    <div style={{ margin: "24px", backgroundColor: "#f9f9f9", borderRadius: "8px", padding: "24px" }}>
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
    </div>
  );
};

export default Voucher;
