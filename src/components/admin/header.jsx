import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, BellOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const userMenu = (
  <Menu>
    <Menu.Item key="1" icon={<SettingOutlined />}>
      Settings
    </Menu.Item>
    <Menu.Item key="2" icon={<LogoutOutlined />}>
      Logout
    </Menu.Item>
  </Menu>
);

const Header = () => {
  return (
    <AntHeader style={{ padding: '0 20px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Logo hoặc tên hệ thống */}
      <div className="logo" style={{ fontWeight: 'bold', fontSize: '18px' }}>
        Admin Dashboard
      </div>

      {/* Menu phía bên phải */}
      <Space size="large">
        {/* Thông báo */}
        <BellOutlined style={{ fontSize: '20px' }} />

        {/* Avatar người dùng với Dropdown */}
        <Dropdown overlay={userMenu} trigger={['click']}>
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Avatar icon={<UserOutlined />} />
            <span style={{ marginLeft: '10px' }}>Admin</span>
          </div>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;
