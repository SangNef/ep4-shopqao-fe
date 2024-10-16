import React from "react";
import Header from "../components/admin/header";
import SideBar from "../components/admin/sidebar";
import "./layout.css"

const AdminLayout = ({ children }) => {
  return (
    <div className="main">
      <SideBar />
      <div className="content">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
